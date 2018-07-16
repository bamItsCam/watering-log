import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment';
import Calendar from 'react-calendar';

class NewEntryModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formClass: "modal",
			formMoment: moment(new Date()),
			calendarClass: "no-display",
			amOrPm: "PM",
		}
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
		const date = this.state.formMoment.valueOf();
		const time = this.state.amOrPm;
		Meteor.call('logEntries.addEntry', author, notes, date, time);
		this.exitForm();
	}

	onDateChange = (date) => {
		this.setState({"formMoment": moment(date)});
		this.noDisplayCalendar();
	}

	toggleCalendarDisplay = () => {
		if (this.state.calendarClass == "no-display") {
			this.displayCalendar();
		}
		else {
			this.noDisplayCalendar();
		}
	}

	displayCalendar = () => this.setState({"calendarClass": "display"});

	noDisplayCalendar = () => this.setState({"calendarClass": "no-display"});

	handleAmPmDropdown = (event) => {
		this.setState({"amOrPm": event.target.value});
	}

	render() {
		return (
			<div>
				<div className="field">
					<a className="button is-success" onClick={this.displayForm}>
						<span className="icon is-small">
							<i className="fas fa-plus"></i>
						</span>
					</a>
				</div>
				<div className={this.state.formClass}>
					<div className="modal-background"></div>
					<div className="modal-card">
						<header className="modal-card-head">
							<p className="modal-card-title">New Log Entry</p>
							<button className="delete" aria-label="close" onClick={this.exitForm}></button>
						</header>
						<section className="modal-card-body tall-modal">
							<form ref="logEntryForm">
								<div className="field is-horizontal">
									<div className="field-body">
										<div className="field">
											<div className="control has-icons-left">
												<span className="icon is-small is-left">
										      <i className="fas fa-calendar"></i>
										    </span>
												<input className="input" type="text" onClick={this.toggleCalendarDisplay} onChange={this.onDateChange} value={this.state.formMoment.locale("en").format("MMM DD, YYYY")}/>
												<Calendar
													className={this.state.calendarClass}
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
			</div>
		)
	}
}

export default NewEntryModal;