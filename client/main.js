import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import 'bulma/css/bulma.css';
import 'bulma-accordion/dist/bulma-accordion.min.css';

import Log from '../imports/pages/Log.jsx';
import Scheduler from '../imports/pages/Scheduler.jsx';
 
Meteor.startup(() => {
  render(<Scheduler/>, document.getElementById('render-target'));
});