import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Line as ChartJSLine, Scatter } from 'react-chartjs-2';
import Title from './Title';
import * as d3 from 'd3';

import lasso_energy_predict from './data/LassoEnergyPredict.csv';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);

    var csv = require(`./data/${this.props["csvName"]}`);

    this.state = {"data": []}
    d3.csv(csv).then(data => {
      console.log(data)
      const y_true = data.map(cell => {
        let ret = {}
        // ret[cell["index"]] = Math.round(parseFloat(cell["y_true"])/5000)
        // ret[cell["index"]] = 5
        ret["x"] = Math.round(parseFloat(cell["index"]))
        ret["y_true"] = parseFloat(cell["y_true"])
        ret["y_pred"] = parseFloat(cell["y_pred"])
        return(ret)
      })
      console.log(y_true)
      this.setState({"y_true": y_true})
      // this.state = {"y_true": y_true}
    });
  }

  render() {
    return (
      <React.Fragment>
        <Title>{this.props["title"]}</Title>
        <ResponsiveContainer>
          {/* <ChartJSLine data={this.state["y_true"]}/> */}
          <LineChart
          data={this.state["y_true"]}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="x" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
              Energy Prediction (W)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="y_true" stroke="#556CD6" dot={false} />
          <Line type="monotone" dataKey="y_pred" stroke="#ff0000" dot={false} />
        </LineChart>

        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}
