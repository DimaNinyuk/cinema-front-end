import React, {useContext} from 'react';
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
import { AppContext } from "contexts/AppContext";
import {
  NOT_LOGGED_IN,
  LOG_IN_FORM,
  SIGN_UP_FORM,
  LOGGED_IN,
} from "../../constants/AuthStatus";
import "css/tickets.css";
const useStyles = makeStyles((theme) => ({
    screen:{
      width:'100%',
      backgroundColor:'white',
    },
    gridContainer:{
        height:430,
        marginBottom:1,
    },
    gridScreen:{
      overflow: "auto",
      height:430,
    },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 430,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  noDisplay:{
    display: 'none',
  }
}));
export default function TicketsBuyings({film}) {
  const classes = useStyles();
  const [currentFilm, setCureentFilm] = React.useState({ ...film });
  const [dates, setDates] = React.useState([]);
  const [dateValue, setDateValue] = React.useState(0);
  const [timeValue, setTimeValue] = React.useState(0);
  const [currentDate, setDate] = React.useState(0);
  const [sessions, setSessions] = React.useState([]);
  const [currentSession, setCurrentSession] = React.useState(null);
  const [paymentButton, setPaymentButton] = React.useState("");
  const [order, setOrder] = React.useState({session_id:null,seats:[],sum:0.00, user_id:0});
  const [status, setStatus] = React.useState(false);
  const [places, setPlaces] = React.useState([]);
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var formatter = new Intl.DateTimeFormat('en', options);
  const { id } = useParams();
  const appContext = useContext(AppContext);
  const {
    authStatus,
    userId,
    getprofileforbuying
  } = appContext;
React.useEffect(() => {
  getprofileforbuying();
 // console.log(authStatus);
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
   handleSessionChange(null,0,false); 
   setDateValue(newValue);
    setDate(dates[newValue]);
  };
  const handleSessionChange = (event, newValue, handler) => {
    var state = handler===false?null:sessions.filter(s=>s.date===currentDate.date)[newValue];
    setCurrentSession(state);
    setTimeValue(newValue);
    setOrder({session_id:null,seats:[],sum:0, user_id:userId});
    if (handler===true){
    axios
    .get("http://localhost:8000/api/places-sessions/"+state.id)
    .then(
        (response) => {
          setPlaces(response.data);
        },
      );
      }
  };
  function bookOrder(){
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(response => {
      axios.post("http://localhost:8000/api/get-payment-string", order)
      .then(
          (response) => {
            setPaymentButton(response.data);
          },
          )
        }
    //console.log(state);
    );
    setStatus(true);
  }
  function changeOrder(e,r,s){
    var state = Object.assign({}, order);
    state.session_id = Number(currentSession.id);
    var value = Number(s.id)
    var seat={};
    seat.id=value;
    seat.price=currentSession.price;
    seat.row=r;
    seat.seat=s;
    if(state.seats===null)state.seats=[];
    if (state.seats.filter(s => s.id === seat.id).length === 0)
    {
         state.seats.push(seat);
         state.sum=parseFloat(seat.price).toFixed(2)*state.seats.length;
    }
    else
    {
    state.seats.splice(state.seats.map(function (s) { return s.id; }).indexOf(seat.id), 1);
    state.sum=parseFloat(seat.price).toFixed(2)*state.seats.length;
    }
    setOrder(state);
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
    return <Tab key={i} label={session.time+" Hall:"+session.hall?.name+" "+session.hall?.type?.name} />
  })}</Tabs>
  </div>
  :<div className={classes.noDisplay}></div>
);
const screenItemRender = (
  currentSession!==null?<div  className={classes.gridScreen}> 
      <Button  fullWidth variant="contained" color="primary">
        SCREEN
      </Button>
    {currentSession?.hall?.rows.sort((a, b) => a.number > b.number ? 1 : -1).map((r,i)=>{
      return  <Grid key={i} container >
      <Grid item xs={1}>
        Row {r.number}</Grid>
      <Grid item xs={11}>
          <Box 
             display="flex"  
             alignItems="center"
             justifyContent="center"
             padding="3px">
              {r.seats.map((s,i)=>{;
             return <label key={i} className="ticket-btn">
               {places.length>0?places.filter(b=>b.seat_id===s.id).length>0?
                <input value={s.number} type="checkbox" checked disabled/>:
                <input value={s.number} onClick={(e)=>changeOrder(e,r,s)} type="checkbox"/>:
                <input value={s.number} onClick={(e)=>changeOrder(e,r,s)} type="checkbox"/>}
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
<TextField fullWidth id="filled-basic" label="Session's price:" variant="filled" value={currentSession.price+"₴"}/>
<TextField fullWidth id="filled-basic" label="Hall:" variant="filled" value={currentSession.hall?.name+" "+currentSession.hall?.type?.name}/>
<TextField fullWidth id="filled-basic" label={"Info of tickets("+order.seats.length+"):"} variant="filled" value={
  order.seats.map((s)=>{return "r"+s.row.number+"-s"+s.seat.number+" "})
}/>
<TextField fullWidth id="filled-basic" label="Total for payment:" variant="filled"value={order.sum.toFixed(2)+"₴"}/>
{status===false?<div><Button  fullWidth variant="contained"
onClick={()=>{bookOrder()}} color="primary">Buy Now!</Button></div>
:order.sum>0?<div width="20px" dangerouslySetInnerHTML={{__html: paymentButton}}></div>:<div></div>}
</div>:<div></div>
)
  if (dates.length>0) return (
    <div>
         <Grid container spacing={1}  >
        <Grid item xs={12} sm={2}>
          <Paper className={classes.paper}>
          {dateItemsRender}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Paper className={classes.paper}>
          {timeItemsRender}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
        {status===false?screenItemRender:""}
        </Grid>
        <Grid item xs={12} sm={2}>
        <Paper className={classes.paper}>
          <div className={classes.gridContainer}>
          {totalRender}
          </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
  else return "";
}