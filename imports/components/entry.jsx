import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { logEntriesDB } from '../api/logEntries.jsx'
import { withTracker } from 'meteor/react-meteor-data';

class Entry extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<article ref={this.props.id} className="accordion">
		    <div className="accordion-header">
		      <p>{this.props.entry.author} @ {this.props.entry.date} in the {this.props.entry.time}</p>
		      <a className="button is-info is-outlined" onClick={this.toggleExpandedNotes}>
						<span className="icon is-small">
							<i className="fas fa-angle-down"></i>
						</span>
					</a>
		      <a className="button is-danger is-outlined" onClick={this.deleteEntry}>
						<span className="icon is-small">
							<i className="fas fa-times"></i>
						</span>
					</a>
		    </div>
		    <div className="accordion-body">
		      <div className="accordion-content">
		      	{this.props.entry.notes}
		      </div>
		    </div>
		  </article>
		)
	}

	deleteEntry = () => {
		Meteor.call('logEntries.deleteEntry', this.props.entry._id);
	}

	toggleExpandedNotes = () => {
		var accordionObj = ReactDOM.findDOMNode(this.refs[this.props.id]);
		if(accordionObj.classList.contains('is-active')) {
			//it must be expanded, therefore minimize it
			accordionObj.classList.remove('is-active');
		}
		else {
			accordionObj.classList.add('is-active');
		}
	}
}

export default withTracker(() => {
	Meteor.subscribe('logEntries');
	return {}
})(Entry)