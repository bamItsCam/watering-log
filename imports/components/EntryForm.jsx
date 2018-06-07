import React, { Component } from 'react';

export default class EntryForm extends Component {
	render() {
		return this.renderForm();
	}

	renderForm() {
		return (
			<div ref="form-popup" className="modal">
				<div className="modal-background"></div>
				<div className="modal-content">
					<div className="field">
					  <label className="label">Name</label>
					  <div className="control">
					    <input className="input" type="text" placeholder="Text input"/>
					  </div>
					</div>
				</div>
				<button className="modal-close is-large" aria-label="close"></button>
			</div>
		)
	}
}