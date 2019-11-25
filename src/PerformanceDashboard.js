import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Paper, Grid, MenuItem, Select, Divider, CssBaseline } from '@material-ui/core';
import DataChart2 from "./components/DataChart2";

const drawerWidth = 260;

export default function Dashboard() {
  const classes = useStyles();

  const [variable, setVariable] = React.useState('Electricity:Facility');

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleChange = event => {
    setVariable(event.target.value);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <div className={classes.content}>
        <Grid container spacing={3}>
          {/* DataChart */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={variable}
            onChange={handleChange}
            className={classes.mySelect}
          >
            <MenuItem value={"Electricity:Facility"}>Electricity</MenuItem>
            <MenuItem value={"Gas:Facility"}>Gas</MenuItem>
          </Select>

          {/* <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
              <AggregateChart
                title={"Hybrid Model"}
                series={["hybrid/hybrid_2019-11-12_2_y_real.csv, hybrid/hybrid_2019-11-12_2_y_pred.csv", "explicit_rnn/y_pred.csv", "implicit_rnn/implicit_rnn_2019-11-11_y_pred.csv"]}
                labels={["Ground Truth, Hybrid, Explicit RNN, Implicit RNN"]}
                variable={variable}
              />
            </Paper>
          </Grid> */}

          <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
              <DataChart2
                title={"Hybrid Model"}
                y_real_path={"hybrid/hybrid_2019-11-12_2_y_real.csv"}
                y_pred_path={"hybrid/hybrid_2019-11-12_2_y_pred.csv"}
                variable={variable}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
              <DataChart2
                title={"Explicit RNN Model"}
                y_real_path={"explicit_rnn/y_real.csv"}
                y_pred_path={"explicit_rnn/y_pred.csv"}
                variable={variable}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Paper className={fixedHeightPaper}>
              <DataChart2
                title={"Implicit RNN"}
                y_real_path={"implicit_rnn.bak/implicit_rnn_2019-11-12_y_pred.csv"}
                y_pred_path={"implicit_rnn.bak/implicit_rnn_2019-11-12_y_pred.csv"}
                variable={variable}
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
        <h2 className={classes.drawerTitle}>Performance Metrucs</h2>
        <Divider/>
        <div style={{"padding": "20px"}}>
          <h3>Hybrid Model</h3>
          RMSE: 0.07
          <h3>Explicit RNN</h3>
          RMSE: 0.05
          <h3>Implicit RNN</h3>
          RMSE: 0.04
        </div>
      </Drawer>
    </div>
  );
}

// Styles
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  mySelect: {
    margin: theme.spacing(2),
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
    padding: theme.spacing(2),
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
  drawerTitle: {
    padding: '0 20px',
  },
}));