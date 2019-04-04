import React, { Component } from 'react';
import './Dashboard.css';

import GridLayout from 'react-grid-layout';

import Panel from './Panel';

class Dashboard extends Component {
  render() {
    var layout = [
      {i: 'a', x: 1, y: 0, w: 1, h: 2},
      {i: 'b', x: 1, y: 0, w: 3, h: 2},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
    return (
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key="a" className="Panel hover">1</div>
        <div key="b" className="Panel hover">2</div>
        <div key="c" className="Panel hover">3</div>
      </GridLayout>
    )
  }
}

export default Dashboard;
