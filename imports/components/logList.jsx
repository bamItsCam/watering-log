import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { logEntriesDB } from '../api/logEntries.jsx'
import { withTracker } from 'meteor/react-meteor-data';

import Entry from '../components/entry.jsx';
import NewEntryModal from '../components/newEntryModal.jsx';

class LogList extends Component {
	constructor(props) {
		super(props);
		this.logHandle = undefined;
	}

	render() {
		return (
			<div>
				<NewEntryModal/>
				<div className="accordions">
				  {this.renderAccordionLog()}
				</div>
			</div>
		);
	}

	renderAccordionLog() {
		if ( this.props.isLoading ) {
			return (
				<span className="icon is-large loader">
			    	<i className="fas fa-spinner"></i>
			    </span>
			)
		}
		else {
			return this.props.logEntries.map((entry) => (
				<Entry key={entry._id} id={entry._id} entry={entry} />
			));
		}
	}
}

LogList.propTypes = {
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	entriesTotal: PropTypes.number.isRequired,
};

export default withTracker((props) => {
	var skipAmount = (props.currentPage - 1) * props.pageSize
	LogList.logHandle = Meteor.subscribe('paginatedEntries', props.pageSize, skipAmount);
	//TODO: wati for sub to be ready: https://codebrahma.com/reactive-subscriptions-in-meteor/

	var entriesToReturn = [];
	var clientDbLimit = props.pageSize

	if (props.currentPage * props.pageSize >= props.entriesTotal) {
		// are we now on the last page? if so, limit the db query to whatever amount is left
		// since we can't force meteor to wait until the new subscription is ready, this
		// is the best we've got atm
		clientDbLimit = props.entriesTotal - (props.currentPage - 1) * props.pageSize
	}

	var isSubReady = LogList.logHandle.ready()

	if(isSubReady) {
		entriesToReturn = logEntriesDB.find({}, {
			sort: { 
				date: -1,
				createdAt: -1,
			},
			limit: clientDbLimit,
			reactive: false
		}).fetch()
	}
	else {

	}

	return {
		isLoading: ! isSubReady,
		logEntries: entriesToReturn,
	}
})(LogList);