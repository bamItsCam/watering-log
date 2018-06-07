import React, { Component } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
	render() {
		return (
			<div>
				<BigCalendar
					events={[]}
					step={15}
					timeslots={2}
					defaultView="week"
					defaultDate={new Date()}
				/>
			</div>
		);
	}
}

export default Calendar;