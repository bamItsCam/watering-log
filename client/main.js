import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import 'bulma/css/bulma.css';
import 'bulma-accordion/dist/bulma-accordion.min.css';

import Log from '../imports/pages/Log.jsx';

Meteor.startup(() => {
  render(<Log/>, document.getElementById('render-target'));
});