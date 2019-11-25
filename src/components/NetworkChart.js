import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Line as ChartJSLine, Scatter, Chart as ChartChart } from 'react-chartjs-2';
import Title from './Title';
import * as d3 from 'd3';
import zoom from 'chartjs-plugin-zoom'
import axios from 'axios'
import { Icon, IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import 'chartjs-plugin-streaming';
var querystring = require('querystring')

export default class NetworkChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {"x": [], "y_pred": [], "count": 0, "should_poll": true}
  }

  componentWillMount() {
    this.startRequests()
  }

  componentWillUnmount() {
    this.stopRequests()
  }

  startRequests = async () => {
    const fetchPrediction = async () => {
      let x = JSON.parse(JSON.stringify(this.state.x))
      let y_pred = JSON.parse(JSON.stringify(this.state.y_pred))

      const res = await axios.post(this.props.api_url, querystring.stringify(this.props.control_state))
      const data = res.data

      x.push(Date.now())
      y_pred.push({x: Date.now(), y: data["Electricity:Facility"]})

      if (x.length > 50) {
        x.shift()
      }
      if(y_pred.length > 50) {
        y_pred.shift()
      }

      this.setState({...this.state, "x": x, "y_pred": y_pred, "count": this.state.count+1})
    }

    await fetchPrediction()
    this.setState({...this.state, "should_poll": true})
    if (this.state.should_poll) {
      // setTimeout(this.startRequests, 200)
      this.startRequests()
    }
  }

  stopRequests = () => {
    // clearInterval(this.timer)
    this.setState({...this.state, "should_poll": false})
  }

  render = () => {
    return (
      <React.Fragment>
        <Title>{this.props["title"]}</Title>
        {/* <IconButton style={{float: "right"}}><RefreshIcon/></IconButton> */}

        <ResponsiveContainer>
          <ChartJSLine data= {{
                // labels: this.state.x,
                datasets: [
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
            }}

            options={{
              animation: {
                duration: 0                    // general animation time
            },
            hover: {
                animationDuration: 0           // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0,    // animation duration after a resize
            plugins: {
                streaming: {
                    frameRate: 30               // chart is drawn 5 times every second
                }
            },
              scales: {
                xAxes: [{
                  type: 'realtime',
                  realtime: {
                    duration: 15000,
                    delay: 2000,
                    ttl: undefined,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Timestep (1 hour)",
                  },
                }],
                yAxes: [{
                  ticks: {
                      suggestedMin: 0,
                      suggestedMax: 700000000
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Energy Consumption (J)",
                  },
              }]
              }
            }}
          />
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}
