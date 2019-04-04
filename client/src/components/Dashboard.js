import React, { Component } from 'react';
import './Dashboard.css';

import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

class Dashboard extends Component {

  static defaultProps = {
    className: "layout",
    items: 20,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12
  };

  constructor(props) {
    super(props);

    var layout = [
      {i: 'Camera', x: 0, y: 0, w: 6, h: 12, minH: 6},
      {i: 'Temperature', x: 6, y: 0, w: 6, h: 6},
      {i: 'Humidity', x: 6, y: 6, w: 6, h: 6}
    ];
    this.state = { layout };
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        <div key="Camera" className="Panel hover">
          <div className="streamContainer">
            Interne Infrarot-Kamera (Funktioniert auch Nachts)
            <img src="http://192.168.102.220:8081/?action=stream" onError={(e)=>{e.target.onerror = null; e.target.src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Raspberry_Pi_Logo.svg/188px-Raspberry_Pi_Logo.svg.png"; e.target.style.height="150px"; e.target.style.width="120px";}} alt="" />
          </div>
        </div>
        <div key="Temperature" className="Panel hover">2</div>
        <div key="Humidity" className="Panel hover">3</div>
      </ReactGridLayout>
    )
  }
}

export default Dashboard;
