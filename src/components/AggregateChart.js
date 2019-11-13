import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Line as ChartJSLine, Scatter, Chart as ChartChart } from 'react-chartjs-2';
import Title from './Title';
import * as d3 from 'd3';
import zoom from 'chartjs-plugin-zoom'

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {"x": [], "y_true": [], "y_pred": []}
    this.loadData()
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps !== this.props) {
      this.loadData()
    }
  }

  loadData = () => {
    console.log("rerendering")
    var y_real_csv = require(`../data/${this.props.y_real_path}`);
    var y_pred_csv = require(`../data/${this.props.y_pred_path}`);

    this.state = {"x": [], "y_true": [], "y_pred": []}
    let x = [], y_true = [], y_pred = [];

    this.props.series.forEach(series=> {
      d3.csv(series).then(data => {
        data.forEach(cell => {

          // x.push(Math.round(parseFloat(cell["VariableName"])))
          // y_true.push(parseFloat(cell[this.props.variable]))
        })
      })
    })
    // this.setState({"x": x, "y_true": y_true, "y_pred": y_pred})
  }

  render() {
    return (
      <React.Fragment>
        <Title>{this.props["title"]}</Title>
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
