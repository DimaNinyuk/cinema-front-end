import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Session from 'components/Admin/Sessions/Session.js';
import AddSession from "./AddSession";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 300,
        flexDirection: 'column',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));
export default function Sessions() {
    const [allsessions, setallsessions] = useState([]);
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [currentSession, setcurrentSession] = useState(null);
    const [allfilms, setallFilms] = useState([]);
    const [allhalls, setallHalls] = useState([]);
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
            (response) => {
                axios
                    .get("http://localhost:8000/api/admin-sessions")
                    .then(
                        (response) => {
                            setallsessions(response.data);
                            setcurrentSession(response.data[0]);
                        },
                    );
                axios
                    .get("http://localhost:8000/api/admin-films")
                    .then(
                        (response) => {
                            setallFilms(response.data);
                        },
                    );
                    axios
                    .get("http://localhost:8000/api/admin-halls")
                    .then(
                        (response) => {
                            setallHalls(response.data);
                        },
                    );
            })
    }, []);
    function getSessionDetail(session) {
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
            (response) => {
                axios
                    .get("http://localhost:8000/api/admin-sessions/" + session.id)
                    .then(
                        (response) => {
                            setcurrentSession(response.data);
                        },
                    );
            })
    }
    function handleChange(e, newValue) {
        setValue(newValue);
        getSessionDetail(allsessions[newValue]);
    };
    function handleUpdateSession(session) {
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
            (response) => {
                axios.put("http://localhost:8000/api/admin-sessions/" + session.id, session).then(
                    (response) => {
                        var array = allsessions.filter(function (item) {
                            return item.id !== session.id
                        })
                        setallsessions(allsessions => [...array, response.data]);
                        setValue(allsessions.length-1);
                        getSessionDetail(session);
                    },
                )
            })

    }
    function handleDeleteSession(session) {
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
            (response) => {
                axios.delete("http://localhost:8000/api/admin-sessions/" + session.id, session).then(
                    (response) => {
                        var array = allsessions.filter(function (item) {
                            return item.id !== currentSession.id
                        })
                        setallsessions(array);
                        setcurrentSession(allsessions[0]);
                        setValue(0);
                    },
                )
            })
    }
    function handleAddSession(session) {
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
            (response) => {
                axios.post("http://localhost:8000/api/admin-sessions", session).then(
                    (response) => {
                        setallsessions(allsessions => [...allsessions, response.data]);
                        getSessionDetail(response.data);
                        setValue(allsessions.length);
                    },
                )
            })
    }
    return(
        <div>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <div className={classes.root}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            className={classes.tabs}
                        >
                            {
                                //вывод списка фильмов
                                allsessions.map((session, i) => {
                                    return (

                                        <Tab key={i} label={session?.film.name!==null?session.film.name:""}></Tab>
                                    );

                                }
                                )
                            }
                        </Tabs>
                    </div>
                </Grid>
                <Grid xs={10}>
                    <Session session={currentSession} onUpdate={handleUpdateSession} onDelete={handleDeleteSession} halls={allhalls} films={allfilms}></Session>
                </Grid>
            </Grid>
            <br/>
            <br/>
            <AddSession onAdd={handleAddSession} />
        </div>
    );

};
