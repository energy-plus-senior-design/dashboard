import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import NetworkChart from './components/NetworkChart';
import {Drawer, List, ListItem, Divider, CssBaseline} from '@material-ui/core';

const drawerWidth = 260;

export default function Dashboard() {
  const classes = useStyles();
  const [model, setModel] = React.useState('hybrid');

  const [control_state, set_control_state] = React.useState({
    'Zone Thermostat Cooling Setpoint Temperature': 25,
    'Zone Thermostat Heating Setpoint Temperature': 18,
    'Zone Outdoor Air Drybulb Temperature': 15,
    'Zone Outdoor Air Wetbulb Temperature': 11,
    'Zone Outdoor Air Wind Speed': 2,
    'Zone People Occupant Count': 8,
  });

  const ranges = {
    'Zone Thermostat Cooling Setpoint Temperature': [20, 30],
    'Zone Thermostat Heating Setpoint Temperature': [15, 25],
    'Zone Outdoor Air Drybulb Temperature': [-40, 40],
    'Zone Outdoor Air Wetbulb Temperature': [-30, 30],
    'Zone Outdoor Air Wind Speed': [0, 5],
    'Zone People Occupant Count': [0, 20],
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  return (
    <div className={classes.root}>
      <CssBaseline />

      <div className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
              <NetworkChart
                title={"Hybrid Model Prediction"}
                control_state={control_state}
                api_url={'http://localhost:8000/api/hybrid/predict'}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
              <NetworkChart
                title={"Explicit RNN Prediction"}
                control_state={control_state}
                api_url={'http://localhost:8000/api/explicit-rnn/predict'}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
              <NetworkChart
                title={"Implicit RNN Prediction"}
                control_state={control_state}
                api_url={'http://localhost:8000/api/implicit-rnn/predict'}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>

      <Drawer
        anchor="right"
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <h2 className={classes.drawerTitle}>Control Input</h2>
        <Divider/>
        <div style={{"padding": "20px"}}>
          {sliders(control_state, set_control_state, ranges, classes)}
        </div>
      </Drawer>
    </div>
  );
}

const sliders = (control_state, set_control_state, ranges, classes) => {
  const control_vars = Object.keys(control_state)
  return control_vars.map(u => (
    <div>
      <Typography id="vertical-slider" gutterBottom>
        {u}
      </Typography>
      <Slider
        className={classes.slider}
        value={control_state[u]}
        onChange={(e, val) => set_control_state(Object.assign({}, control_state, {[u]: val}))}
        aria-labelledby="vertical-slider"
        min={ranges[u][0]}
        max={ranges[u][1]}
      />
    </div>
  ))
}

// Styles
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawerTitle: {
    padding: '0 16px',
  },
  slider: {
    // padding: '16px 0',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 400,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));