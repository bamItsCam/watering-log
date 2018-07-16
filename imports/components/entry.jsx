import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { logEntriesDB } from '../api/logEntries.jsx'

import moment from 'moment';
import { withTracker } from 'meteor/react-meteor-data';

class Entry extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expandOrMinimizeClass: "fas fa-angle-down",
			deletionModalClass: "modal",
		}
	}
	render() {
		return (
			<div>
				{this.renderDeletionModal()}
				<article ref={this.props.id} className="accordion is-info">
				    <div className="accordion-header">
						<p><b>{this.props.entry.author}</b> on {this.displayDate()} in the {this.props.entry.time}</p>
						<div>
							<a className="button adjacent-buttons is-light is-outlined" onClick={this.toggleExpandedNotes}>
								<p>Show Notes</p>
								<span className="icon is-small">
									<i className={this.state.expandOrMinimizeClass}></i>
								</span>
							</a>
							<a className="button adjacent-buttons is-danger is-outlined" onClick={this.displayDeleteWarning}>
								<span className="icon is-small">
									<i className="fas fa-times"></i>
								</span>
							</a>
						</div>
				    </div>
				    <div className="accordion-body">
				      	<div className="accordion-content">
				      		{this.props.entry.notes}
				      	</div>
				    </div>
			  	</article>
			</div>
		)
	}

	displayDate() {
		return moment(this.props.entry.date).format("MMM DD, YYYY")
	}

	displayDeleteWarning = () => {
		this.setState({"deletionModalClass":"modal is-active"})
	}

	exitDeleteWarning = () => {
		this.setState({"deletionModalClass": "modal"})
	}

	deleteEntry = () => {
		Meteor.call('logEntries.deleteEntry', this.props.entry._id);
	}

	toggleExpandedNotes = () => {
		var accordionObj = ReactDOM.findDOMNode(this.refs[this.props.id]);
		if(accordionObj.classList.contains('is-active')) {
			//it must be expanded, therefore minimize it
			accordionObj.classList.remove('is-active');
			this.setState({"expandOrMinimizeClass":"fas fa-angle-down"})
		}
		else {
			accordionObj.classList.add('is-active');
			this.setState({"expandOrMinimizeClass":"fas fa-angle-up"})
		}
	}

	renderDeletionModal() {
		return (
			<div className={this.state.deletionModalClass}>
				<div className="modal-background"></div>
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title">Removing a Log Entry</p>
						<button className="delete" aria-label="close" onClick={this.exitDeleteWarning}></button>
					</header>
					<section className="modal-card-body">
						<div>Are you sure you want to delete the entry of {this.props.entry.author} watering on {this.displayDate()}?</div>
					</section>
					<footer className="modal-card-foot">
			      <button className="button is-danger" onClick={this.deleteEntry}>Delete</button>
			      <button className="button is-info is-outlined" onClick={this.exitDeleteWarning}>Cancel</button>
			    </footer>
				</div>
			</div>
		)
	}
}

export default withTracker(() => {
	Meteor.subscribe('logEntries');
	return {}
})(Entry)