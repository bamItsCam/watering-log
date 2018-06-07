import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import App from '/imports/App.jsx';
import Log from '/imports/pages/log.jsx';
import Calendar from '/imports/pages/calendar.jsx';

FlowRouter.route('/', {
  name: 'Log',
  action(){
    mount(App, {
  		content: <Log />
		});
	}
})

FlowRouter.route('/calendar', {
  name: 'Calendar',
  action(){
    mount(App, {
  		content: <Calendar />
		});
	}
})