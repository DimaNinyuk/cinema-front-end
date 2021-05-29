import React from 'react';
import axios from "axios";
import { useParams} from "react-router-dom";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import "css/tickets.css";


const useStyles = makeStyles((theme) => ({
    screen:{
      width:'100%',
      backgroundColor:'white',
    },
    gridContainer:{
        height:424,
        marginBottom:1,
    },
    gridScreen:{
      overflow: "auto",
      height:424,
    },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 424,
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
  const [timeValue, setTimeValue] = React.useState(0);
  const [currentDate, setDate] = React.useState(0);
  const [sessions, setSessions] = React.useState([]);
  const [currentSession, setCurrentSession] = React.useState(null);
  const [order, setOrder] = React.useState({session_id:null,seats:[],sum:0.00});
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var formatter = new Intl.DateTimeFormat('en', options);
  
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
      axios
      .get("http://localhost:8000/api/film-sessions/"+id)
      .then(
          (response) => {
            setSessions(response.data);
          },
      );
}, []);

  const handleDateChanges = (event, newValue) => {
   // console.log(newValue);
   handleSessionChange(null,0,false); 
   setDateValue(newValue);
    setDate(dates[newValue]);
   
   // console.log(dates[newValue]);
  };
  const handleSessionChange = (event, newValue, handler) => {
    //console.log(newValue);
    setTimeValue(newValue);
    var state = handler===false?null:sessions.filter(s=>s.date===currentDate.date)[newValue];
    setCurrentSession(state);
    setOrder({session_id:null,seats:[],sum:0.00});
   // console.log(state);
    //setDate(dates[newValue]);
    
    //setCurrentSession(newValue);
  };
  function changeOrder(e){
    var state = Object.assign({}, order);
    state.session_id = Number(currentSession.id);
    var value = Number(e.target.value)
    var seat={};
    seat.id=value;
    seat.price=currentSession.price;;

    if(state.seats===null)state.seats=[];
    if (state.seats.filter(s => s.id === seat.id).length === 0)
    {
         state.seats.push(seat);
         state.sum+=seat.price*1.00;
    }
    else
    {state.seats.splice(state.seats.map(function (s) { return s.id; }).indexOf(seat.id), 1);
    state.sum-=seat.price*1.00;}
    setOrder(state);
    console.log(state);

  }

 const dateItemsRender = (
      dates.length>0? <div  className={classes.root}><Tabs
      orientation="vertical"
      variant="scrollable"
      value={dateValue}
      onChange={handleDateChanges}
      className={classes.tabs}
    >{dates.map((date,i)=>{
      return <Tab key={i} label={formatter.format(new Date(date.date))} />
    })}</Tabs>
    </div>
    :<div>No Data</div>
  );

  const timeItemsRender = (
    currentDate!==null? <div  className={classes.root}><Tabs
    orientation="vertical"
    variant="scrollable"
    value={timeValue}
    onChange={(e,v) => handleSessionChange(e,v,true)}
    className={classes.tabs}
  >{sessions.filter(session=>session.date===currentDate.date).map((session,i)=>{
    return <Tab key={i} label={session.time} />
  })}</Tabs>
  </div>
  :<div></div>
);

const screenItemRender = (
  currentSession!==null? <div  className={classes.gridScreen}> 
        <Box 
      display="flex" 
      height={30} 
      bgcolor="lightblue"
      alignItems="center"
      justifyContent="center"
    >SCREEN
    </Box>
    {currentSession.hall.rows.sort((a, b) => a.number > b.number ? 1 : -1).map((r,i)=>{
      return  <Grid key={i} container >
      <Grid item xs={1}>
        Row {r.number}</Grid>
      <Grid item xs={11}>
          <Box 
             display="flex"  
             alignItems="center"
             justifyContent="center"
             padding="3px"
           >
              {r.seats.map((s,i)=>{;
             return <label key={i} className="ticket-btn">
               {currentSession.buyings.filter(b=>b.seat_id===s.id).length>0?<input type="checkbox" checked disabled/>:<input value={s.id} onChange={(e)=>changeOrder(e)} type="checkbox"/>}
             <span>{s.number}</span>
             </label>
            })}
           </Box>
      </Grid>
    </Grid>
    })}
</div>
:<div></div>
);

const totalRender = (currentSession?
<div >
<TextField fullWidth id="filled-basic" label="Film Name:" variant="filled" value={currentSession.film.name}/>
<TextField fullWidth id="filled-basic" label="Date:" variant="filled" value={formatter.format(new Date(currentSession.date))}/>
<TextField fullWidth id="filled-basic" label="Time:" variant="filled" value={currentSession.time}/>
<TextField fullWidth id="filled-basic" label="Film's price:" variant="filled" value={currentSession.price+"₴"}/>
<TextField fullWidth id="filled-basic" label="Hall:" variant="filled" value={currentSession.hall?.name+" "+currentSession.hall?.type?.name}/>
<TextField fullWidth id="filled-basic" label="Number of tickets:" variant="filled" value={order.seats.length}/>
<TextField fullWidth id="filled-basic" label="Total for payment:" variant="filled"value={order.sum.toFixed(2)+"₴"} autoFocus/>
<Button  fullWidth variant="contained" color="primary">
        Buy Now!
      </Button>
</div>:<div></div>
)
  return (
    <div>
         <Grid container spacing={1}  >
        <Grid item xs={2} >
          <Paper className={classes.paper}>
          {dateItemsRender}
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
          {timeItemsRender}
          </Paper>
        </Grid>
        <Grid item xs={6}>
        {screenItemRender}
        </Grid>
        <Grid item xs={2}>
        <Paper className={classes.paper}>
          <div className={classes.gridContainer}>
          {totalRender}
          </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}