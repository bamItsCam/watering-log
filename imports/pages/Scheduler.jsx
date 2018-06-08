import React, { Component } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'


BigCalendar.momentLocalizer(moment);

class Scheduler extends Component {
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

export default Scheduler;