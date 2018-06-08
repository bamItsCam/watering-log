import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { logEntriesDB } from '../api/logEntries.jsx'
import { withTracker } from 'meteor/react-meteor-data';

import moment from 'moment';
import Calendar from 'react-calendar';

import Entry from '../components/Entry.jsx';

class Log extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formClass: "modal",
			formMoment: moment(new Date()),
			dateDisplayClass: "no-display",
			amOrPm: "PM",
		}
	}

	render() {
		return (
			<div>
				{this.renderForm()}
				<div className="field">
					<a className="button is-success" onClick={this.displayForm}>
						<span className="icon is-small">
							<i className="fas fa-plus"></i>
						</span>
					</a>
				</div>
				<div className="accordions">
				  {this.renderAccordionLog()}
				</div>
			</div>
		);
	}

	renderAccordionLog() {
		return this.props.logEntries.map((entry) => (
			<Entry key={entry._id} id={entry._id} entry={entry} />
		));
	}

	displayForm = () => {
		// mark the modal form class with the 'is-active' class to display it
		this.setState({"formClass":"modal is-active"})
	}

	exitForm = () => {
		this.setState({"formClass":"modal"})
		this.clearForm()
	}

	clearForm = () => {
		ReactDOM.findDOMNode(this.refs.logEntryForm).reset();
	}

	addEntry = () => {
		const author = ReactDOM.findDOMNode(this.refs.formAuthor).value.trim();
		const notes = ReactDOM.findDOMNode(this.refs.formNotes).value.trim();
		const date = this.state.formMoment.locale("en").format("MMM DD, YYYY");
		const time = this.state.amOrPm;
		Meteor.call('logEntries.addEntry', author, notes, date, time);
		this.exitForm();
	}

	onDateChange = (date) => {
		this.setState({"formMoment": moment(date)});
		this.noDisplayDate();
	}

	toggleDisplayDate = () => {
		if (this.state.dateDisplayClass == "no-display") {
			this.displayDate();
		}
		else {
			this.noDisplayDate();
		}
	}

	displayDate = () => this.setState({"dateDisplayClass": "display"});

	noDisplayDate = () => this.setState({"dateDisplayClass": "no-display"});

	handleAmPmDropdown = (event) => {
		console.log(event.target);
		this.setState({"amOrPm": event.target.value});
	}

	renderForm() {
		return (
			<div className={this.state.formClass}>
				<div className="modal-background"></div>
				<div className="modal-card">
					<header className="modal-card-head">
						<p className="modal-card-title">New Log Entry</p>
						<button className="delete" aria-label="close" onClick={this.exitForm}></button>
					</header>
					<section className="modal-card-body">
						<form ref="logEntryForm">
							<div className="field is-horizontal">
								<div className="field-body">
									<div className="field">
										<div className="control has-icons-left">
											<span className="icon is-small is-left">
									      <i className="fas fa-calendar"></i>
									    </span>
											<input className="input" type="text" onClick={this.toggleDisplayDate} onChange={this.onDateChange} value={this.state.formMoment.locale("en").format("MMM DD, YYYY")}/>
											<DatePicker
												className={this.state.dateDisplayClass}
												calendarType="US"
												onChange={this.onDateChange}
												value={this.state.formMoment.toDate()}
											/>
										</div>
									</div>
									<div className="field">
									  <div className="control has-icons-left">
									  	<span className="icon is-small is-left">
									      <i className="fas fa-clock"></i>
									    </span>
									    <div className="select">
									      <select
									      	value={this.state.amOrPm}
									      	onChange={this.handleAmPmDropdown}
									      >
									        <option value="AM">AM</option>
									        <option value="PM">PM</option>
									      </select>
									    </div>
									  </div>
									</div>
									<div className="field">
									  <div className="control has-icons-left is-expanded">
									  	<span className="icon is-small is-left">
									      <i className="fas fa-user"></i>
									    </span>
									    <input ref="formAuthor" className="input" type="text" placeholder="Author"/>
									  </div>
									</div>
								</div>
							</div>
							<div className="field">
							  <div className="control">
							    <textarea id="formNotes" ref="formNotes" className="textarea" placeholder="Notes"></textarea>
							  </div>
							</div>
						</form>
					</section>
					<footer className="modal-card-foot">
			      <button className="button is-success" onClick={this.addEntry}>Save changes</button>
			      <button className="button" onClick={this.exitForm}>Cancel</button>
			    </footer>
				</div>
				
			</div>
		)
	}
}

export default withTracker(() => {
	Meteor.subscribe('logEntries');
	return {
		logEntries: logEntriesDB.find({}, { sort: { createdAt: -1 } }).fetch(),
	}
})(Log);