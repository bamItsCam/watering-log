import React, { Component } from 'react';
export default class Entry extends Component {
	render() {
		return (
			<ul>title: {this.props.entry.title} - message: {this.props.entry.message }</ul>
		)
	}
}