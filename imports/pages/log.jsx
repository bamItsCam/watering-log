import React, { Component } from 'react';
import Entry from '../components/entry.jsx';
import { logEntriesDB } from '../api/logEntries.jsx'
import { withTracker } from 'meteor/react-meteor-data';

class Log extends Component {
	render() {
		return (
			<div>
				<div className="field">
					<a className="button is-success" onClick={this.addNewBlankEntry.bind(this)}>
						<span className="icon is-small">
							<i className="fas fa-plus"></i>
						</span>
					</a>
				</div>
				<div>
					{this.renderLog()}
				</div>
			</div>
		);
	}

	renderLog() {
		return this.props.logEntries.map((entry) => (
			<Entry key={entry._id} entry={entry} />
		));
	}

	addNewBlankEntry() {
		Meteor.call('logEntries.addNewBlankEntry');
	}
}

export default withTracker(() => {
	Meteor.subscribe('logEntries');
	return {
		logEntries: logEntriesDB.find({}, { sort: { createdAt: -1 } }).fetch(),

	}
})(Log);