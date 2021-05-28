import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
    gridContainer:{
        height:324,
    },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 324,
    flexDirection: 'column',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Sessions() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [values, setValues] = React.useState(0);

  const handleChanges = (event, newValue) => {
    setValues(newValue);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div >
         <Grid container spacing={0} className={classes.gridContainer}>
        <Grid item xs={2} >
          <Paper className={classes.paper}>
          <div  className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      </div>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
          <div  className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      </div>
          </Paper>
        </Grid>
        <Grid item xs={7}>
         aaaa
        </Grid>
        <Grid item xs={1}>
        <Paper className={classes.paper}><div className={classes.gridContainer}></div></Paper>
        </Grid>
      </Grid>
     
      
    </div>
  );
}