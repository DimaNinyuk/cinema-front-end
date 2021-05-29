import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { post } from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '50ch',
        },
        '& .MuiFormGroup-root': {
            display: 'block',
        },
        '& .MuiNativeSelect-select.MuiNativeSelect-select': {
            paddingRight: '50ch',
        },

        '& .MuiButton-contained': {
            marginRight: '5%',
        },
    },

}));
export default function Session({ session, onUpdate, onDelete, films, halls }) {

    //состояния
    const [currentSession, setcurrentSession] = useState({ ...session });
    const classes = useStyles();
    //метод, который вызывается первый при загрузки страницы, здесь заполняем страницу детальными данными о фильме
    useEffect(() => {
        setcurrentSession(session);
    }, [session])
    //медот отвечает за обработку клика кнопки обновить
    function handleUpdate(e) {
        e.preventDefault();
        onUpdate(currentSession);
    };
    //метод отвечает за обработку удаления
    function handleDelete(e) {
        e.preventDefault();
        onDelete(session);
    };
    //метод отвечает за обработку изменения полля ввода (всех)
    function handleInput(key, e) {
        //в переменную создали копию переменной выбранного фильма
        var state = Object.assign({}, currentSession);
        //
        state[key] = e.target.value;
        setcurrentSession(state);
    };
    
    //рендер если фильм отсутствует
    if (!session) {
        return (<div>  Session Doesnt exist </div>);
    }
    else {

        return currentSession ?
            (
                <div className={classes.root} >
                    <label>Session</label>
                    
                    <hr />
                    <br/>
                    <br/>
                    <TextField
                        fullWidth
                        id="time-picker"
                        label="Date:"
                        multiline
                        rowsMax={4}
                        value={currentSession.date}
                        onChange={(e) => handleInput('date', e)}
                    />
                    <TextField
                        fullWidth
                        id="standard-multiline-flexible"
                        label="Time:"
                        multiline
                        rowsMax={4}
                        value={currentSession.time}
                        onChange={(e) => handleInput('time', e)}
                    />
                    <TextField
                        fullWidth
                        id="standard-multiline-flexible"
                        label="Price:"
                        multiline
                        rowsMax={4}
                        value={currentSession.price}
                        onChange={(e) => handleInput('price', e)}
                    />
                    <br />
                    <br />
                    <label>Film session</label>
                    <hr />

                    <FormControl >
                        <NativeSelect
                            value={currentSession.film_id !== null ? currentSession.film_id : ""}
                            onChange={(e) => handleInput('film_id', e)}
                        >
                            {(films.map((film, i) => {

                                return (
                                    <option key={i} value={film.id} >{film.name}</option>
                                );
                            }))}
                        </NativeSelect>
                    </FormControl>
                    <br />
                    <br />
                    <label>Hall session</label>
                    <hr />
                    <br/>
                    <br/>
                    <FormControl >
                        <NativeSelect
                            value={currentSession.hall_id !== null ? currentSession.hall_id : ""}
                            onChange={(e) => handleInput('hall_id', e)}
                        >
                            {(halls.map((hall, i) => {

                                return (
                                    <option key={i} value={hall.id} >{hall.name}</option>
                                );
                            }))}
                        </NativeSelect>
                    </FormControl>
                    <br />
                    <br />
                    <label>Session changes</label>
                    <hr />
                    <br/>
                    <br/>
                    <Button
                        onClick={(e) => handleUpdate(e)}
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<UpdateIcon />}
                    >
                        Update
                    </Button>
                    <Button
                        onClick={(e) => handleDelete(e)}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                   

                </div>
            )
            : (<div key={session.id}><p>Loading...</p></div>);
    }
};
