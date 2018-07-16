import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { logEntriesDB } from '../api/logEntries.jsx'

import { withTracker } from 'meteor/react-meteor-data';
import { Tracker } from 'meteor/tracker'

import LogList from '../components/logList.jsx';

class Log extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			pageSize: 5,
			entriesTotal: 0,
		};
		this.availablePageSizes = [1,5,10,20,50];
	}

	render() {
		return (
			<div>
				<div className="select">
			      <select
			      	value={this.state.pageSize}
			      	onChange={this.handlePageSizeDropdown}
			      >
			      	<option value={1}>1</option>
			      	<option value={5}>5</option>
			      	<option value={10}>10</option>
			      </select>
			    </div>
				<LogList pageSize={this.state.pageSize} currentPage={this.state.currentPage} entriesTotal={this.state.entriesTotal}/>
				{this.renderPagination()}
			</div>
		);
	}

	renderPageOptions() {
		return this.availablePageSizes.map( size => (
			<option key={size} value={size}>{size}</option>
		));
	}

	renderPagination() {
		return (
			<nav className="pagination" role="navigation" aria-label="pagination">
			  <ul className="pagination-list">
			    <li>
			      <a className="pagination-link" aria-label="Go back" onClick={this.goBack} disabled={this.isPrevDisabled()}>Back</a>
			    </li>
			    <li>
			      <a className="pagination-link is-current" aria-label="Page Current" aria-current="page" disabled>page {this.state.currentPage} of {Math.ceil(this.state.entriesTotal/this.state.pageSize)}</a>
			    </li>
			    <li>
			      <a className="pagination-link" aria-label="Goto Next" onClick={this.goNext} disabled={this.isNextDisabled()}>Next</a>
			    </li>
			  </ul>
			</nav>
		)
	}

	handlePageSizeDropdown = (event) => {
		this.setState({"pageSize": parseInt(event.target.value)});
	}

	isNextDisabled() {
		// Math!
		return (this.state.currentPage * this.state.pageSize >= this.state.entriesTotal)
	}

	isPrevDisabled() {
		return (this.state.currentPage <= 1)
	}

	goBack = () => {
		if (! this.state.isFirstPage) { 
			this.setState({"currentPage": this.state.currentPage - 1})
		}
	}

	goNext = () => {
		if (! this.state.isLastPage) { 
			this.setState({"currentPage": this.state.currentPage + 1})
		}
	}

	componentDidMount() {
		const componentThis = this
		Tracker.autorun(() => {
			Meteor.call('logEntries.count', function(error, result) {
				componentThis.setState({"entriesTotal": result})
			})
		})
	}
}

export default withTracker((props) => {
	return {}
})(Log)