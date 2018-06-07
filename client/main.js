import 'bulma/css/bulma.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import App from '/imports/App.jsx';
 
Meteor.startup(() => {
  render(<App/>, document.getElementById('root'));
});