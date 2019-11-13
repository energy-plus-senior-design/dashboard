import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './components/listItems';
import DataChart from './components/DataChart';
import DataChart2 from "./components/DataChart2";
import AggregateChart from "./components/AggregateChart";

const drawerWidth = 260;

export default function Dashboard() {
  const classes = useStyles();

  const [variable, setVariable] = React.useState('Electricity:Facility');

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleChange = event => {
    console.log("fired")
    setVariable(event.target.value);
  }

  return (
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
            y_real_path={"implicit_rnn/implicit_rnn_2019-11-11_y_real.csv"}
            y_pred_path={"implicit_rnn/implicit_rnn_2019-11-11_y_pred.csv"}
            variable={variable}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

// Styles
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  mySelect: {
    margin: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 300,
  },
}));