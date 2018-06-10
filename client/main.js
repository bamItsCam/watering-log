import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bulma/css/bulma.css';
import 'bulma-accordion/dist/bulma-accordion.min.css';

import App from '../imports/routing/App.jsx';
 
Meteor.startup(() => {
  render(<BrowserRouter><App /></BrowserRouter>,
  		document.getElementById('render-target'))});