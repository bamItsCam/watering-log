import React, { Component } from 'react';

class App extends Component {
    render() {
        const {content} = this.props;
        return (
        <div>
        	{content}
        </div>
        );
    }
}

export default App;