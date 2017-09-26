!function () {

	var today = moment();
	moment.locale('uk');

	function CalendarBig(selector, events) {
		this.el = document.querySelector(selector);
		this.events = events;
		this.current = moment().date(1);
		this.draw();
		var current = document.querySelector('.today');
		if (current) {
			var self = this;
			window.setTimeout(function () {
				self.openDay(current);
			}, 500);
		}
	}

	CalendarBig.prototype.draw = function () {

		//Create Header
		this.drawHeader();

		//Draw Month
		this.drawMonth();

		//this.drawLegend();
	};

	CalendarBig.prototype.drawHeader = function () {
		var self = this;
		if (!this.header) {
			//Create the header elements
			this.header = createElement('div', 'big-calendar-events-top');
			this.header.className = 'big-calendar-events-top';

			this.title = createElement('div', 'nav-mounth');

			var right = createElement('div', 'big-calendar-arrow big-calendar-arrow-r icon icon-arrowhead-right');
			right.addEventListener('click', function () {
				self.nextMonth();
				self.initCalendarPage();
			});

			var left = createElement('div', 'big-calendar-arrow big-calendar-arrow-l icon icon-arrowhead-right');
			left.addEventListener('click', function () {
				self.prevMonth();
				self.initCalendarPage();
			});

			this.monthName = createElement('div', 'mounth');

			this.title.appendChild(left);
			this.title.appendChild(this.monthName);
			this.title.appendChild(right);

			this.weekDaysNames = createElement('div', 'days-of-the-week');

			for (var i = 0; i < big_calendar_args.weekdays.length; i++) {
				var weekday = createElement('div', 'day-name', big_calendar_args.weekdays[i]);
				self.weekDaysNames.appendChild(weekday);
			}

			//Append the Elements
			this.header.appendChild(this.title);
			this.header.appendChild(this.weekDaysNames);
			this.el.appendChild(this.header);
		}

		this.monthName.innerHTML = this.current.format('MMMM YYYY');
	};

	CalendarBig.prototype.drawMonth = function () {
		var self = this;

		this.events.forEach(function (ev) {
			if (ev.eventDate.length > 0) {
				ev.date = moment(Date.parse(ev.eventDate));
			}
		});


		if (this.month) {
			this.oldMonth = this.month;
			this.oldMonth.className = 'big-calendar-events-bottom ' + (self.next ? 'next' : 'prev');
			//this.oldMonth.addEventListener('webkitAnimationEnd', function () {
			self.oldMonth.parentNode.removeChild(self.oldMonth);
			self.month = createElement('div', 'big-calendar-events-bottom');
			self.backFill();
			self.currentMonth();
			self.fowardFill();
			self.el.appendChild(self.month);
			window.setTimeout(function () {
				self.month.className = 'big-calendar-events-bottom ' + (self.next ? 'next' : 'prev');
			}, 16);
			//});
		} else {
			this.month = createElement('div', 'big-calendar-events-bottom');
			this.el.appendChild(this.month);
			this.backFill();
			this.currentMonth();
			this.fowardFill();
			this.month.className = 'big-calendar-events-bottom';
		}
	};

	CalendarBig.prototype.backFill = function () {
		var clone = this.current.clone();
		var dayOfWeek = clone.day();

		if (!dayOfWeek) {
			return;
		}

		clone.subtract(dayOfWeek + 1, 'days');

		for (var i = dayOfWeek; i > 0; i--) {
			this.drawDay(clone.add(1, 'days'));
		}
	};

	CalendarBig.prototype.fowardFill = function () {
		var clone = this.current.clone().add(1, 'months').subtract(1, 'days');
		var dayOfWeek = clone.day();

		if (dayOfWeek === 6) {
			return;
		}

		for (var i = dayOfWeek; i < 6; i++) {
			this.drawDay(clone.add(1, 'days'));
		}
	};

	CalendarBig.prototype.currentMonth = function () {
		var clone = this.current.clone();

		while (clone.month() === this.current.month()) {
			this.drawDay(clone);
			clone.add(1, 'days');
		}
	};

	CalendarBig.prototype.getWeek = function (day) {
		if (!this.week || day.day() === 0) {
			this.week = createElement('div', 'week');
			this.month.appendChild(this.week);
		}
	};

	CalendarBig.prototype.drawDay = function (day) {
		var self = this;
		this.getWeek(day);

		//Outer Day
		var outer = createElement('div', this.getDayClass(day));
		outer.addEventListener('click', function () {
			self.openDay(this);
		});

		var dayBlock = createElement('div', 'day-content');

		//Day Name
		var name = createElement('div', 'day-name', day.format('ddd'));

		//Day Number
		var number = createElement('div', 'day-number', day.format('DD'));
		var allEvents = createElement('div', 'all-event all-event-js icon icon-arrow-right');

		//Events
		var events = createElement('div', 'events');
		this.drawEvents(day, events);

		dayBlock.appendChild(name);
		dayBlock.appendChild(number);
		dayBlock.appendChild(events);
		dayBlock.appendChild(allEvents);
		outer.appendChild(dayBlock);
		this.week.appendChild(outer);
	};

	CalendarBig.prototype.drawEvents = function (day, element) {
		if (day.month() === this.current.month()) {
			var todaysEvents = this.events.reduce(function (memo, ev) {
				if (ev.date.isSame(day, 'day')) {
					memo.push(ev);
				}
				return memo;
			}, []);

			todaysEvents.forEach(function (ev) {
				var evLink = createElement('a', 'event');
				var eventHref = document.createAttribute('href');
				eventHref.value = ev.eventLink;
				evLink.setAttributeNode(eventHref);
				var evCat = createElement('div', 'event-category', ev.eventCategory);
				var evTime = createElement('div', 'event-time', ev.eventTime);
				var evTitle = createElement('div', 'event-title', ev.eventName);
				evLink.appendChild(evCat);
				evLink.appendChild(evTime);
				evLink.appendChild(evTitle);
				element.appendChild(evLink);
			});
		}
	};

	CalendarBig.prototype.getDayClass = function (day) {
		classes = ['day'];
		if (day.month() !== this.current.month()) {
			classes.push('day-other-month');
		} else if (today.isSame(day, 'day')) {
			classes.push('today');
		}
		return classes.join(' ');
	};

	CalendarBig.prototype.openDay = function (el) {
		var details, arrow;
		var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
		var day = this.current.clone().date(dayNumber);

		var currentOpened = document.querySelector('.details');

		//Check to see if there is an open detais box on the current row
		if (currentOpened && currentOpened.parentNode === el.parentNode) {
			details = currentOpened;
			arrow = document.querySelector('.arrow');
		} else {
			//Close the open events on differnt week row
			//currentOpened && currentOpened.parentNode.removeChild(currentOpened);
			if (currentOpened) {
				currentOpened.addEventListener('webkitAnimationEnd', function () {
					currentOpened.parentNode.removeChild(currentOpened);
				});
				currentOpened.addEventListener('oanimationend', function () {
					currentOpened.parentNode.removeChild(currentOpened);
				});
				currentOpened.addEventListener('msAnimationEnd', function () {
					currentOpened.parentNode.removeChild(currentOpened);
				});
				currentOpened.addEventListener('animationend', function () {
					currentOpened.parentNode.removeChild(currentOpened);
				});
				currentOpened.className = 'details out';
			}

			//Create the Details Container
			//details = createElement('div', 'details in');

			//Create the arrow
			//var arrow = createElement('div', 'arrow');

			//Create the event wrapper

			//details.appendChild(arrow);
			//el.parentNode.appendChild(details);
		}

		var todaysEvents = this.events.reduce(function (memo, ev) {
			if (ev.date.isSame(day, 'day')) {
				memo.push(ev);
			}
			return memo;
		}, []);

		this.renderEvents(todaysEvents);
	};

	CalendarBig.prototype.renderEvents = function (events) {
		events.forEach(function (ev) {
			var div = createElement('div', 'event');
			var square = createElement('div', 'event-category ' + ev.color);
			var span = createElement('span', '', ev.eventName);

			div.appendChild(square);
			div.appendChild(span);
		});

		if (!events.length) {
			var div = createElement('div', 'event empty');
			var span = createElement('span', '', 'No Events');

			div.appendChild(span);
		}
	};

	CalendarBig.prototype.drawLegend = function () {
		var legend = createElement('div', 'legend');
		var calendars = this.events.map(function (e) {
			return e.calendar + '|' + e.color;
		}).reduce(function (memo, e) {
			if (memo.indexOf(e) === -1) {
				memo.push(e);
			}
			return memo;
		}, []).forEach(function (e) {
			var parts = e.split('|');
			var entry = createElement('span', 'entry ' + parts[1], parts[0]);
			legend.appendChild(entry);
		});
		this.el.appendChild(legend);
	};

	CalendarBig.prototype.nextMonth = function () {
		this.current.add(1, 'months');
		this.next = true;
		this.draw();
	};

	CalendarBig.prototype.prevMonth = function () {
		this.current.subtract(1, 'months');
		this.next = false;
		this.draw();
	};

	CalendarBig.prototype.checkUnCkeckSingle = function (block) {
		if (block.prop('checked') == true) {
			block.parents(".calendar-filter-label-item").find('input').each(function (index, el) {
				jQuery(el).prop('checked', false);
			});
			block.prop('checked', true);
		}
	};
	CalendarBig.prototype.checkUnCkeckMultiple = function (block) {
		if (block.prop('checked') == true && block.parents(".calendar-filter-label-item").find('input.all-category-js').length > 0) {
			block.parents("div").find('input.all-category-js').each(function (index, el) {
				jQuery(el).prop('checked', false);
			});
			block.prop('checked', true);
		}
	};

	CalendarBig.prototype.addFilterValue = function (value, newValue) {

		if (value.length > 0) {
			value = value.split(',');
		} else {
			value = [];
		}
		if (jQuery.inArray(newValue, value) == -1) {
			value.push(newValue);
		}
		value = value.join(',');

		return value;
	};

	CalendarBig.prototype.removeFilterValue = function (value, newValue) {

		if (value.length > 0) {
			value = value.split(',');
			var deletedElementIndex = value.indexOf(newValue);
			if (deletedElementIndex > -1) {
				value.splice(deletedElementIndex, 1);
			}
		}

		return value;
	};

	CalendarBig.prototype.getFilteredEvents = function (cityFilter, categoriesFilter, subcategoriesFilter) {

		var self = this;
		var calendarSection = jQuery('#js__calendar-filter-container');
		calendarSection.css('opacity', 0.3);

		jQuery.ajax({
			type   : "GET",
			url    : big_calendar_args.ajaxurl,
			data   : {
				action       : 'deco_get_filtered_events',
				city         : cityFilter,
				categories   : categoriesFilter,
				subcategories: subcategoriesFilter
			},
			success: function (response) {
				console.log(response);
				if (response.success === true && response.data.calendar_data.length > 0) {
					try {
						self.events = jQuery.parseJSON(response.data.calendar_data);
						self.draw();
						initlengthLabel();
						initShowButtonAllEvents();
					} catch (e) {
						console.log(e);
					}
				}
				calendarSection.removeAttr('style');


				var calendar = jQuery('.calendar-filter-container');

				var category = calendar.find('.calendar-filter-category');
				var subcategory = calendar.find('.calendar-filter-subcategory-wrap');

				if(jQuery('.calendar-filter-container input:checked').attr('data-child-categories') || subcategory.find('.active-item').length || jQuery('.calendar-filter-container input:checked').length > 1){
					subcategory.addClass('active');
				} else {
					subcategory.removeClass('active');
				}

				subcategory.find('.active-item').removeClass('active-item');
				if(category.find('input[data-parent-category-id="all"]').is(':checked')){
					subcategory.addClass('active');
					subcategory.find('label').addClass('active-item');
				}

				category.find('input:checked').each(function(){

					var dataCategory = jQuery(this).data('child-categories');
					var dataSubcategory = jQuery(this).data('child-category-id');

					var dataCategorySlice = dataCategory.split(',');

					dataCategorySlice.forEach(function(el) {
						   subcategory.find('input[data-child-category-id="'+el+'"]').closest('label').addClass('active-item');
					});
				});

				if(subcategory.find('.active-item').length > 6){
					subcategory.find('.arrow-more-js').show();
				} else {
					subcategory.find('.arrow-more-js').hide();
				}

			},
			error  : function (e) {
				calendarSection.removeAttr('style');
				console.log(e);
			}
		});

	};

	CalendarBig.prototype.initCalendarPage = function () {
		var self = this;
		var moreButton = jQuery('.js__subcategories-block .arrow-more-js');
		var citiesFilterInput = jQuery('.js__calendar-filter-city');
		var categoriesFilterInput = jQuery('.js__calendar-filter-category');
		var subcategoriesFilterInput = jQuery('.js__calendar-filter-subcategory');
		jQuery(".calendar-filter-city-js input").on('change', function (event) {
			self.checkUnCkeckSingle(jQuery(this));
			var elementCheckedUnchecked = jQuery(this).prop('checked');
			if (elementCheckedUnchecked) {
				var cityID = jQuery(this).attr('data-city-id');
				if (cityID.length > 0) {
					citiesFilterInput.val(cityID);
				}
			} else {
				citiesFilterInput.val('');
			}
			self.getFilteredEvents(citiesFilterInput.val(), categoriesFilterInput.val(), subcategoriesFilterInput.val());
		});
		jQuery(".calendar-filter-label-js .all-category-js").on('change', function (event) {
			self.checkUnCkeckSingle(jQuery(this));
			jQuery('.js__subcategories-block label').each(function () {
					jQuery(this).show();
				}
			);
			categoriesFilterInput.val('');
			subcategoriesFilterInput.val('');
			self.getFilteredEvents(citiesFilterInput.val(), categoriesFilterInput.val(), subcategoriesFilterInput.val());
		});
		jQuery(".calendar-filter-label-js input:not(.all-category-js)").on('change', function (event) {
			self.checkUnCkeckMultiple(jQuery(this));
			var elementCheckedUnchecked = jQuery(this).prop('checked');
			if (jQuery(this).hasClass('js__parent-category-input')) {
				var selectedCategory = jQuery(this).attr('data-parent-category-id');
				if (selectedCategory.length > 0) {
					var categoryFilterValue = '';
					if (elementCheckedUnchecked == true) {
						categoryFilterValue = self.addFilterValue(categoriesFilterInput.val(), selectedCategory);
					} else {
						categoryFilterValue = self.removeFilterValue(categoriesFilterInput.val(), selectedCategory)
					}
					categoriesFilterInput.val(categoryFilterValue);
				}
			} else {
				var selectedSubcategory = jQuery(this).attr('data-child-category-id');
				if (selectedSubcategory.length > 0) {
					var subcategoryFilterValue = '';
					if (elementCheckedUnchecked == true) {
						subcategoryFilterValue = self.addFilterValue(subcategoriesFilterInput.val(), selectedSubcategory);
					} else {
						subcategoryFilterValue = self.removeFilterValue(subcategoriesFilterInput.val(), selectedSubcategory);
					}
					subcategoriesFilterInput.val(subcategoryFilterValue);
				}
			}
			self.getFilteredEvents(citiesFilterInput.val(), categoriesFilterInput.val(), subcategoriesFilterInput.val());
		});

		initlengthLabel();

		jQuery(window).resize(function () {
			initlengthLabel();
			initShowButtonAllEvents();
		});

		// console.log(jQuery(".big-calendar-events-container-js .day-content").height());
		initShowButtonAllEvents();


		jQuery(".all-event-js").on('click', function (event) {
			jQuery(this).parents(".day").toggleClass("hover");
		});


	};

	window.CalendarBig = CalendarBig;

	function createElement(tagName, className, innerText) {
		var ele = document.createElement(tagName);
		if (className) {
			ele.className = className;
		}
		if (innerText) {
			ele.innderText = ele.textContent = innerText;
		}
		return ele;
	}

	function initlengthLabel() {
		var lengthLabelInRow;
		if (jQuery(window).width() >= 1024) {
			lengthLabelInRow = 6;
		} else if (jQuery(window).width() >= 768 && jQuery(window).width() <= 1023) {
			lengthLabelInRow = 5;
		} else if (jQuery(window).width() <= 767 && jQuery(window).width() >= 500) {
			lengthLabelInRow = 4;
		} else if (jQuery(window).width() <= 499 && jQuery(window).width() >= 300) {
			lengthLabelInRow = 2;
		}
		jQuery(".calendar-filter-label-js .calendar-filter-label-item").each(function (index, el) {
			if (jQuery(this).find("label").length > lengthLabelInRow) {
				jQuery(this).find(".arrow-more-js").show();
			} else {
				jQuery(this).find(".arrow-more-js").hide();
			}
		});
	}

	function initShowButtonAllEvents() {
		jQuery(".big-calendar-events-container-js .day").each(function (index, el) {
			if (jQuery(this).find(".events-js").height() > 180 && jQuery(window).width() <= 760) {
				jQuery(this).find(".day-content").addClass("show-button");
				jQuery(this).find(".all-event-js").show();
			} else {
				jQuery(this).find(".all-event-js").hide();
				jQuery(this).removeClass("hover");
				jQuery(this).find(".day-content").removeClass("show-button");
			}

		});
	}
}();

jQuery(document).ready(function () {
	try {
		var calendarHolderBig = jQuery('#calendar-large');
		if (calendarHolderBig.length > 0) {
			var calendarEvents = calendarHolderBig.attr('data-events');
			//if (calendarEvents.length > 0) {
			try {
				var data = '';
				if (typeof(calendarEvents) != 'undefined' && calendarEvents.length > 0) {
					var data = jQuery.parseJSON(calendarEvents);
				}
				var calendarBig = new CalendarBig('#calendar-large', data);
				calendarBig.initCalendarPage();

				jQuery(".arrow-more-js").each(function () {
					jQuery(this).on('click', function (e) {
						e.preventDefault();
						console.log('123');
						jQuery(this).parent().toggleClass("open")
					})
				});
			} catch (e) {
				console.log(e);
			}
			//}
		}
	} catch (e) {
		console.log(e);
	}
});
