var Deco_Calendar = {

	tempEventsData: function () {
		var data = [
			{
				eventName: 'EBA Education Workshop: Інфографіка. Візуальний спосіб передачі даних у презентації',
				color    : 'blue',
				eventTime: '10:00 - 15:00',
				eventLink: '#1',
				eventDate: '09 01 2017'
			},
			{
				eventName: 'EBA Школа Маркетингу 2017',
				color    : 'blue',
				eventTime: '14:00 - 15:00',
				eventLink: '#2',
				eventDate: '09 04 2017'
			},
			{
				eventName: 'Зустріч Платформи Coaching Kids',
				color    : 'blue',
				eventTime: '17:30 - 19:30',
				eventLink: '#3',
				eventDate: '09 08 2017'
			},
			{
				eventName: 'Dinner w/ Marketing',
				color    : 'blue',
				eventTime: '11:00 - 12:00',
				eventLink: '#4',
				eventDate: '09 11 2017'
			},

			{
				eventName: 'Game vs Portalnd',
				color    : 'blue',
				eventTime: '13:00 - 14:00',
				eventLink: '#5',
				eventDate: '09 13 2017'
			},
			{
				eventName: 'Game vs Houston',
				color    : 'blue',
				eventTime: '14:30 - 17:30',
				eventLink: '#6',
				eventDate: '09 02 2017'
			},
			{
				eventName: 'Game vs Denver',
				color    : 'blue',
				eventTime: '18:00 - 18:30',
				eventLink: '#7',
				eventDate: '09 02 2017'
			},
			{
				eventName: 'Game vs San Degio',
				color    : 'blue',
				eventTime: '13:00 - 15:00',
				eventLink: '#8',
				eventDate: '09 11 2017'
			},

			{
				eventName: 'School Play',
				color    : 'blue',
				eventTime: '13:30 - 14:30',
				eventLink: '#9',
				eventDate: '09 09 2017'
			},
			{
				eventName: 'Parent/Teacher Conference',
				color    : 'blue',
				eventTime: '14:00 - 19:00',
				eventLink: '#10',
				eventDate: '09 22 2017'
			},
			{
				eventName: 'Pick up from Soccer Practice',
				color    : 'blue',
				eventTime: '19:00 - 20:00',
				eventLink: '#11',
				eventDate: '21 02 2017'
			},
			{
				eventName: 'Ice Cream Night',
				color    : 'blue',
				eventTime: '21:30 - 22:30',
				eventLink: '#12',
				eventDate: '09 25 2017'
			},

			{
				eventName: 'Free Tamale Night',
				color    : 'blue',
				eventTime: '10:00 - 12:00',
				eventLink: '#13',
				eventDate: '09 18 2017'
			},
			{
				eventName: 'Bowling Team',
				color    : 'blue',
				eventTime: '12:00 - 13:00',
				eventLink: '#14',
				eventDate: '09 16 2017'
			},
			{
				eventName: 'Teach Kids to Code',
				color    : 'blue',
				eventTime: '11:30 - 12:30',
				eventLink: '#15',
				eventDate: '09 11 2017'
			},
			{
				eventName: 'Startup Weekend',
				color    : 'blue',
				eventTime: '11:00 - 13:00',
				eventLink: '#16',
				eventDate: '09 10 2017'
			}
		];

		return data;
	},

	init: function () {

		try {
			var calendarHolder = jQuery('#calendar');
			if (calendarHolder.length > 0) {
				var calendarEvents = calendarHolder.attr('data-events');
				//if (calendarEvents.length > 0) {
				try {
					var data = [];
					if (typeof(calendarEvents) != 'undefined' && calendarEvents.length > 0) {
						data = jQuery.parseJSON(calendarEvents);
					}
					new Calendar('#calendar', data);
				} catch (e) {
					console.log(e);
				}
				//}
			}
		} catch (e) {
			console.log(e);
		}

	}

};

jQuery(document).ready(function () {
	Deco_Calendar.init();
});