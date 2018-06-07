import 'bulma/css/bulma.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
<<<<<<< HEAD

import 'bulma/css/bulma.css';
import 'bulma-accordion/dist/bulma-accordion.min.css';

import Log from '../imports/pages/Log.jsx';

=======
 
import App from '/imports/App.jsx';
 
>>>>>>> origin/master
Meteor.startup(() => {
  render(<App/>, document.getElementById('root'));
});