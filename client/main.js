import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import Log from '../imports/pages/log.jsx';
 
Meteor.startup(() => {
  render(<Log/>, document.getElementById('render-target'));
});