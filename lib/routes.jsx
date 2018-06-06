import React from 'react'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { mount } from 'react-mounter'

import App from '../imports/App.jsx'
import Log from '../imports/pages/log.jsx'

FlowRouter.route('/', {
  name: 'Log',
  action(){
    mount( App, {
      content: <Log />
    })
  }
})