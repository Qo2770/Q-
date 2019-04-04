import React, { Component } from 'react';
import './Panel.css';

class Panel extends Component {
  render() {
    return (
      <div className={'Panel ' + this.props.className} style={this.props.style}>
        Hi
      </div>
    );
  }
}

export default Panel;
