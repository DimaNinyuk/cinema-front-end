import React from 'react';
import axios from "axios";
import { useParams} from "react-router-dom";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


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

export default function Sessions({film}) {
  const classes = useStyles();
  const [currentFilm, setCureentFilm] = React.useState({ ...film });
  const [dates, setDates] = React.useState([]);
  const [dateValue, setDateValue] = React.useState(0);
  const [date, setDate] = React.useState(null);
  const [sessions, setSessions] = React.useState([]);
  const [currentSession, setCurrentSession] = React.useState(null);
  const { id } = useParams();

React.useEffect(() => {
  setCureentFilm(film);
  axios
      .get("http://localhost:8000/api/film-dates/"+id)
      .then(
          (response) => {
            setDates(response.data);
          },
      );
}, []);

  const handleDateChanges = (event, newValue) => {
    console.log(newValue);
    setDateValue(newValue);
    setDate(dates[newValue]);
    console.log(dates[newValue]);
  };
  const handleSessionChange = (event, newValue) => {
    setCurrentSession(newValue);
  };

 const dateItems = (
      dates.length>0? <div  className={classes.root}><Tabs
      orientation="vertical"
      variant="scrollable"
      value={dateValue}
      onChange={handleDateChanges}
      className={classes.tabs}
    >{dates.map((date,i)=>{
      return <Tab key={i} label={date.date} />
    })}</Tabs>
    </div>
    :<div>No Data</div>
  );
  return (
    <div >
         <Grid container spacing={0} className={classes.gridContainer}>
        <Grid item xs={2} >
          <Paper className={classes.paper}>
          {dateItems}
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
          <div  className={classes.root}>
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