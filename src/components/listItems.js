import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Assessment from '@material-ui/icons/Assessment';
import TimelineIcon from '@material-ui/icons/Timeline';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/models">
      <ListItemIcon>
        <Assessment />
      </ListItemIcon>
      <ListItemText primary="Model Performance" />
    </ListItem>
    <ListItem button component={Link} to="/predictions">
      <ListItemIcon>
        <TimelineIcon />
      </ListItemIcon>
      <ListItemText primary="Real-time Prediction" />
    </ListItem>
  </div>
);

