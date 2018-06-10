import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Log from '../pages/log.jsx'
import Scheduler from '../pages/Scheduler.jsx'

const App = () => (
	<div>
		<main>
    	<Switch>
      	<Route exact path='/' component={Log}/>
      	<Route path='/scheduler' component={Scheduler}/>
    	</Switch>
  	</main>
  </div>
)

export default App