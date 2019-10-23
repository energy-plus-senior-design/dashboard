import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Line as ChartJSLine, Scatter, Chart as ChartChart } from 'react-chartjs-2';
import Title from './Title';
import * as d3 from 'd3';
import Hammer from 'react-hammerjs';
import zoom from 'chartjs-plugin-zoom'

import lasso_energy_predict from './data/LassoEnergyPredict.csv';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);

    var csv = require(`./data/${this.props["csvName"]}`);

    this.state = {"x": [], "y_true": [], "y_pred": []}
    let x = [], y_true = [], y_pred = [];
    d3.csv(csv).then(data => {
      data.forEach(cell => {
        x.push(Math.round(parseFloat(cell["index"])))
        y_true.push(parseFloat(cell["y_true"]))
        y_pred.push(parseFloat(cell["y_pred"]))
        
      })
      console.log(x)
      console.log(y_true)
      console.log(y_pred)
      this.setState({"x": x, "y_true": y_true, "y_pred": y_pred})
      //   ...this.state, "x": [...this.state.x,Math.round(parseFloat(cell["index"]))]})
      // this.setState({...this.state, "y_true": [...this.state.y_true,parseFloat(cell["y_true"])]})
      // this.setState({...this.state, "y_pred": [...this.state.y_pred,parseFloat(cell["y_pred"])]})
    });
  }
  componentWillMount(){
    ChartChart.plugins.register(zoom)
}
  render() {
    return (
      <React.Fragment>
        <Title>{this.props["title"]}</Title>yar
        <ResponsiveContainer>
          <ChartJSLine data= {{
                labels: this.state.x,
                datasets: [
                    {
                        label: 'Energy Consumption Actual',
                        data: this.state.y_true,
                        fill: false,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        pointRadius: 0
                    },
                    {
                        label: 'Energy Consumption Prediction',
                        data: this.state.y_pred,
                        fill: false,
                        backgroundColor: 'rgba(99, 132, 255, 0.2)',
                        borderColor: 'rgba(99, 132, 255, 1)',
                        borderWidth: 1,
                        pointRadius: 0
                    }                
                ]
            }} options= {{
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              },
              pan: {
                  // Boolean to enable panning
                  enabled: true,

                  // Panning directions. Remove the appropriate direction to disable 
                  // Eg. 'y' would only allow panning in the y direction
                  mode: 'xy'
              },

              // Container for zoom options
              zoom: {
                  // Boolean to enable zooming
                  enabled: true,
                  drag: true,
                  // Zooming directions. Remove the appropriate direction to disable 
                  // Eg. 'y' would only allow zooming in the y direction
                  mode: 'xy',
              }
          }}            
          />
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}
