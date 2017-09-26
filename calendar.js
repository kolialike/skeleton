// <div class="calendar-events">
//     <div id="calendar" data-events="{{ events_data }}"></div>
//     <div id="events"></div>
// </div>


jQuery(document).ready(function () {
    jQuery(document).on('click', '#calendar .day', function (event) {
        jQuery("#calendar .day").each(function (index, el) {
            jQuery(el).removeClass("active")
        });
        jQuery(this).addClass("active")
    });
});
!function () {

    var today = moment();
    moment.locale('uk');
    // moment.locale('en');

    function Calendar(selector, events) {
        this.el = document.querySelector(selector);
        this.events = events;
        this.current = moment().date(1);
        if (jQuery(".calendar-items").length > 0) {
            this.todayBlock();
            this.draw();
        }
        ;
        var current = document.querySelector('.today');


        if (current) {
            var self = this;
            window.setTimeout(function () {
                self.openDay(current);
            }, 500);
        }
    }

    Calendar.prototype.draw = function () {
        // this.todayBlock();
        this.drawHeader();
        this.drawMonth();
        this.drawLegend();
        // jQuery(".calendar-header .left").trigger('click');
        // jQuery(".calendar-header .right").trigger('click');
    }

    Calendar.prototype.todayBlock = function () {
        var self = this;
        if (!this.todayBlockheader) {
            //Create the todayBlockheader elements
            this.todayBlockheader = createElement('div', 'calendar-today-block');
            // this.todayBlockheader.className = 'calendar-today-block';
            this.todayBlockCont = createElement('div', 'calendar-today-block-container');

            var todayDayNumber = createElement('div', 'today-number calendar-today-block-l');

            this.todayBlockR = createElement('div', 'calendar-today-block-r');

            var todayDayWord = createElement('div', 'today-word');

            var todayMonthNumber = createElement('div', 'today-month');

            var todayYear = createElement('div', 'today-year');

            // Append the Elements
            this.todayBlockCont.appendChild(todayDayNumber);
            this.todayBlockR.appendChild(todayDayWord);
            this.todayBlockR.appendChild(todayMonthNumber);
            this.todayBlockR.appendChild(todayYear);
            this.el.appendChild(this.todayBlockheader);
        }

        this.todayBlockheader.appendChild(this.todayBlockCont);
        this.todayBlockCont.appendChild(this.todayBlockR);
        todayDayNumber.innerHTML = moment().format('DD');
        todayDayWord.innerHTML = moment().format('dddd');
        todayMonthNumber.innerHTML = this.current.format('MM');
        todayYear.innerHTML = this.current.format('YY');
    }
    Calendar.prototype.drawHeader = function () {
        var self = this;
        if (!this.header) {
            //Create the header elements
            this.header = createElement('div', 'calendar-header');
            this.header.className = 'calendar-header';

            this.title = createElement('h1');

            var right = createElement('div', 'right');
            right.addEventListener('click', function () {
                self.nextMonth();
            });

            var left = createElement('div', 'left');
            left.addEventListener('click', function () {
                self.prevMonth();
            });

            //Append the Elements
            this.header.appendChild(this.title);
            this.header.appendChild(right);
            this.header.appendChild(left);
            this.el.appendChild(this.header);
        }

        this.title.innerHTML = this.current.format('MMMM YYYY');
    }

    Calendar.prototype.drawMonth = function () {
        var self = this;

        this.events.forEach(function (ev) {
            if (ev.eventDate.length > 0) {
                // var a = new Date(2011, 9, 16);
                ev.date = moment(Date.parse(ev.eventDate));
            }
        });
        // this.events.forEach(function(ev) {
        //     ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
        // });


        if (this.month) {
            this.oldMonth = this.month;
            this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
            this.oldMonth.addEventListener('webkitAnimationEnd', function () {
                self.oldMonth.parentNode.removeChild(self.oldMonth);
                self.month = createElement('div', 'month');
                self.backFill();
                self.currentMonth();
                self.fowardFill();
                self.el.appendChild(self.month);
                window.setTimeout(function () {
                    self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
                }, 16);
            });
        } else {
            this.month = createElement('div', 'month');
            this.el.appendChild(this.month);
            this.backFill();
            this.currentMonth();
            this.fowardFill();
            this.month.className = 'month new';
        }
    }

    Calendar.prototype.backFill = function () {
        var clone = this.current.clone();
        var dayOfWeek = clone.day();

        if (!dayOfWeek) {
            return;
        }

        clone.subtract('days', dayOfWeek);

        for (var i = dayOfWeek - 1; i > 0; i--) {
            this.drawDay(clone.add('days', 1));
        }
    }

    Calendar.prototype.fowardFill = function () {
        var clone = this.current.clone().add('months', 1).subtract('days', 1);
        var dayOfWeek = clone.day();

        if (dayOfWeek === 7) {
            return;
        }

        for (var i = dayOfWeek; i < 7; i++) {
            this.drawDay(clone.add('days', 1));
        }
    }

    Calendar.prototype.currentMonth = function () {
        var clone = this.current.clone();
        while (clone.month() === this.current.month()) {
            this.drawDay(clone);
            clone.add('days', 1);
        }
    }

    Calendar.prototype.getWeek = function (day) {
        // jQuery(".calendar-header .right").trigger('click');
        if (!this.week || day.day() === 1) {
            this.week = createElement('div', 'week');
            this.month.appendChild(this.week);
        }
    }

    Calendar.prototype.drawDay = function (day) {
        var self = this;
        // console.log(self);
        this.getWeek(day);

        //Outer Day
        var outer = createElement('div', this.getDayClass(day));
        outer.addEventListener('click', function () {
            self.openDay(this);
        });

        //Day Name
        var name = createElement('div', 'day-name', day.format('ddd'));

        //Day Number
        var number = createElement('div', 'day-number', day.format('DD'));


        //Events
        var events = createElement('div', 'day-events');
        this.drawEvents(day, events);

        outer.appendChild(name);
        outer.appendChild(number);
        outer.appendChild(events);
        this.week.appendChild(outer);
    }

    Calendar.prototype.drawEvents = function (day, element) {
        if (day.month() === this.current.month()) {
            var todaysEvents = this.events.reduce(function (memo, ev) {
                if (ev.date.isSame(day, 'day')) {
                    memo.push(ev);
                }
                return memo;
            }, []);

            todaysEvents.forEach(function (ev) {
                var evSpan = createElement('span', ev.color);
                element.appendChild(evSpan);
            });
        }
    }

    Calendar.prototype.getDayClass = function (day) {
        classes = ['day'];
        if (day.month() !== this.current.month()) {
            classes.push('other');
        } else if (today.isSame(day, 'day')) {
            classes.push('active today');
        }
        return classes.join(' ');
    }

    Calendar.prototype.openDay = function (el) {
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

            jQuery("#events").html("");
            details = createElement('div', 'details in');
            //Create the Details Container

            //Create the arrow
            var arrow = createElement('div', 'arrow');

            //Create the event wrapper

            details.appendChild(arrow);
            this.el.nextElementSibling.appendChild(details);
            // this.el.parentElement.appendChild(details);
            // this.el.appendChild(details);
            // this.el.appendChild(this.todayBlockheader);
        }

        var todaysEvents = this.events.reduce(function (memo, ev) {
            if (ev.date.isSame(day, 'day')) {
                memo.push(ev);
            }
            return memo;
        }, []);

        this.renderEvents(todaysEvents, details);

        arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + 'px';
    }

    Calendar.prototype.renderEvents = function (events, ele) {
        //Remove any events in the current details element
        var currentWrapper = ele.querySelector('.events');
        var wrapper = createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

        events.forEach(function (ev) {
            var a = createElement('a', 'event');
            var square = createElement('div', 'event-category ' + ev.color);
            var time = createElement('div', 'event-time', ev.eventTime);
            var title = createElement('div', 'title', ev.eventName);
            a.setAttribute("href", ev.eventLink);

            a.appendChild(square);
            a.appendChild(title);
            a.insertBefore(time, title);
            wrapper.appendChild(a);
        });

        if (!events.length) {
            var div = createElement('div', 'event empty');
            var span = createElement('span', '', calendar_js_args.noEvents);

            div.appendChild(span);
            wrapper.appendChild(div);
        }

        if (currentWrapper) {
            currentWrapper.className = 'events out';
            currentWrapper.addEventListener('webkitAnimationEnd', function () {
                currentWrapper.parentNode.removeChild(currentWrapper);
                ele.appendChild(wrapper);
            });
            currentWrapper.addEventListener('oanimationend', function () {
                currentWrapper.parentNode.removeChild(currentWrapper);
                ele.appendChild(wrapper);
            });
            currentWrapper.addEventListener('msAnimationEnd', function () {
                currentWrapper.parentNode.removeChild(currentWrapper);
                ele.appendChild(wrapper);
            });
            currentWrapper.addEventListener('animationend', function () {
                currentWrapper.parentNode.removeChild(currentWrapper);
                ele.appendChild(wrapper);
            });
        } else {
            ele.appendChild(wrapper);
        }
    }

    Calendar.prototype.drawLegend = function () {
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
    }

    Calendar.prototype.nextMonth = function () {
        this.current.add('months', 1);
        this.next = true;
        this.draw();
    }

    Calendar.prototype.prevMonth = function () {
        this.current.subtract('months', 1);
        this.next = false;
        this.draw();
    }

    window.Calendar = Calendar;

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
}();

/*!function() {
 var data = [
 { eventName: 'EBA Education Workshop: Інфографіка. Візуальний спосіб передачі даних у презентації', color: 'blue', eventTime: '10:00 - 15:00', eventLink: '#1'},
 { eventName: 'EBA Школа Маркетингу 2017', color: 'blue', eventTime: '14:00 - 15:00', eventLink: '#2'},
 { eventName: 'Зустріч Платформи Coaching Kids', color: 'blue', eventTime: '17:30 - 19:30', eventLink: '#3'},
 { eventName: 'Dinner w/ Marketing', color: 'blue', eventTime: '11:00 - 12:00', eventLink: '#4'},

 { eventName: 'Game vs Portalnd', color: 'blue', eventTime: '13:00 - 14:00', eventLink: '#5'},
 { eventName: 'Game vs Houston', color: 'blue', eventTime: '14:30 - 17:30', eventLink: '#6'},
 { eventName: 'Game vs Denver', color: 'blue', eventTime: '18:00 - 18:30', eventLink: '#7'},
 { eventName: 'Game vs San Degio', color: 'blue', eventTime: '13:00 - 15:00', eventLink: '#8'},

 { eventName: 'School Play', color: 'blue', eventTime: '13:30 - 14:30', eventLink: '#9'},
 { eventName: 'Parent/Teacher Conference', color: 'blue', eventTime: '14:00 - 19:00', eventLink: '#10'},
 { eventName: 'Pick up from Soccer Practice', color: 'blue', eventTime: '19:00 - 20:00', eventLink: '#11'},
 { eventName: 'Ice Cream Night', color: 'blue', eventTime: '21:30 - 22:30', eventLink: '#12'},

 { eventName: 'Free Tamale Night', color: 'blue', eventTime: '10:00 - 12:00', eventLink: '#13'},
 { eventName: 'Bowling Team', color: 'blue', eventTime: '12:00 - 13:00', eventLink: '#14'},
 { eventName: 'Teach Kids to Code', color: 'blue', eventTime: '11:30 - 12:30', eventLink: '#15'},
 { eventName: 'Startup Weekend', color: 'blue', eventTime: '11:00 - 13:00', eventLink: '#16'}
 ];
 // var data = [
 //         { eventName: 'Lunch Meeting w/ Mark', calendar: 'Work', color: 'orange' },
 //         { eventName: 'Interview - Jr. Web Developer', calendar: 'Work', color: 'orange' },
 //         { eventName: 'Demo New App to the Board', calendar: 'Work', color: 'orange' },
 //         { eventName: 'Dinner w/ Marketing', calendar: 'Work', color: 'orange' },
 //
 //         { eventName: 'Game vs Portalnd', calendar: 'Sports', color: 'blue' },
 //         { eventName: 'Game vs Houston', calendar: 'Sports', color: 'blue' },
 //         { eventName: 'Game vs Denver', calendar: 'Sports', color: 'blue' },
 //         { eventName: 'Game vs San Degio', calendar: 'Sports', color: 'blue' },
 //
 //         { eventName: 'School Play', calendar: 'Kids', color: 'yellow' },
 //         { eventName: 'Parent/Teacher Conference', calendar: 'Kids', color: 'yellow' },
 //         { eventName: 'Pick up from Soccer Practice', calendar: 'Kids', color: 'yellow' },
 //         { eventName: 'Ice Cream Night', calendar: 'Kids', color: 'yellow' },
 //
 //         { eventName: 'Free Tamale Night', calendar: 'Other', color: 'green' },
 //         { eventName: 'Bowling Team', calendar: 'Other', color: 'green' },
 //         { eventName: 'Teach Kids to Code', calendar: 'Other', color: 'green' },
 //         { eventName: 'Startup Weekend', calendar: 'Other', color: 'green' }
 //     ];



 function addDate(ev) {

 }

 var calendar = new Calendar('#calendar', data);

 }();*/
