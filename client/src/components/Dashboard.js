import React, { Component } from 'react';
import './Dashboard.css';

import {Line} from 'react-chartjs-2';
import RGL, { WidthProvider } from "react-grid-layout";

import axios from 'axios';

import moment from 'moment';

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
    const dataTemp = {
      labels: [],
      datasets: [
        {
          label: 'Temperatur',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(191,0,22,0.4)',
          borderColor: 'rgba(181,39,42,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(181,39,42,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(181,39,42,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
    };

    const dataHumidity = {
      labels: [],
      datasets: [
        {
          label: 'Humidity',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
    };

    this.state = { layout, dataTemp, dataHumidity };

  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/data`)
      .then(res => {
        const data = res.data.data;

        const dataTemp = {
          labels: data.map(pt => {return moment(Number(pt.time)).format("hh:mm:ss")}),
          datasets: [
            {
              label: 'Temperatur (in °C)',
              fill: true,
              lineTension: 0.1,
              backgroundColor: 'rgba(191,0,22,0.4)',
              borderColor: 'rgba(181,39,42,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(181,39,42,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(181,39,42,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: data.map(pt => {return pt.temperature})
            }
          ]
        };

        const dataHumidity = {
          labels: data.map(pt => {return moment(Number(pt.time)).format("hh:mm:ss")}),
          datasets: [
            {
              label: 'Humidity (in %)',
              fill: true,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: data.map(pt => {return pt.humidity})
            }
          ]
        };

        this.setState({ dataTemp: dataTemp, dataHumidity: dataHumidity });
      });
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
        <div key="Temperature" className="Panel hover"><Line data={this.state.dataTemp} options={{responsive: true, maintainAspectRatio: false}} className="Line" height={90} /></div>
        <div key="Humidity" className="Panel hover"><Line data={this.state.dataHumidity} options={{responsive: true, maintainAspectRatio: false}} className="Line" height={90} /></div>
      </ReactGridLayout>
    )
  }
}

export default Dashboard;
