import React, { Component } from 'react';
import './Panel.css';

class Panel extends Component {
  render() {
    return (
      <div className={this.props.hover ? "Panel hover" : "Panel"}>
        {this.props.content}
      </div>
    );
  }
}

export default Panel;
