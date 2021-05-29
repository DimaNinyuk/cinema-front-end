import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { escapeLeadingUnderscores } from "typescript";
import { post } from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import CardMedia from '@material-ui/core/CardMedia';
import { DropzoneArea } from 'material-ui-dropzone'
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import Backup from '@material-ui/icons/Backup';
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
        '& .MuiDropzoneArea-root': {
            width: '99%',
        },
        button: {
            margin: theme.spacing(1),

        },
        '& .MuiButton-contained': {
            marginRight: '5%',
        },
    },

}));


export default function Film({ film, onUpdate, onDelete, genres, actors, producers, companies }) {

    //состояния
    const [currentFilm, setcurrentFilm] = useState({ ...film });
    const [image, setImage] = useState();
    const [zoneimage, setzoneimage] = useState(null);
    const classes = useStyles();
    //метод, который вызывается первый при загрузки страницы, здесь заполняем страницу детальными данными о фильме
    useEffect(() => {
        setcurrentFilm(film);
    }, [film])
    //медот отвечает за обработку клика кнопки обновить
    function handleUpdate(e) {
        e.preventDefault();
        onUpdate(currentFilm);
    };
    //метод отвечает за обработку удаления
    function handleDelete(e) {
        e.preventDefault();
        onDelete(film);
    };
    //метод отвечает за обработку изменения полля ввода (всех)
    function handleInput(key, e) {
        //в переменную создали копию переменной выбранного фильма
        var state = Object.assign({}, currentFilm);
        //
        state[key] = e.target.value;
        setcurrentFilm(state);
    };
    //метод отвечает за обработку изменения жанров выбранного фильма
    function handleInputGenre(e) {

        //в переменную создали копию переменной выбранного фильма
        var state = Object.assign({}, currentFilm);
        //хранит код жанра
        var value = Number(e.target.value)
        //переменная объекта жанра
        var genre = {};
        //присваиваем обьекту жанра код фильма (используя пропс)
        genre.film_id = Number(film.id);
        ///присваиваем обьекту жанра код жанра (используя переменную)
        genre.genre_id = value;
        var key = 'genrefilms';
        //проверка на наличие в жанрах фильма ключа который соответствует checkbox
        if (state[key].filter(g => g.genre_id === value).length === 0)
            //добавляем обьект жанра
            state[key].push(genre);
        else
            //иначе вырезаем обьект из масива жанров фильма
            state[key].splice(state[key].map(function (g) { return g.genre_id; }).indexOf(value), 1);
        //записаем копию в оригинал детальный фильм
        setcurrentFilm(state);
    }
    function handleInputActor(e) {
        //в переменную создали копию переменной выбранного фильма
        var state = Object.assign({}, currentFilm);
        //хранит код жанра
        var value = Number(e.target.value)
        //переменная объекта жанра
        var actor = {};
        //присваиваем обьекту жанра код фильма (используя пропс)
        actor.film_id = Number(film.id);
        ///присваиваем обьекту жанра код жанра (используя переменную)
        actor.actor_id = value;
        var key = 'actorfilms';
        //проверка на наличие в жанрах фильма ключа который соответствует checkbox
        if (state[key].filter(g => g.actor_id === value).length === 0)
            //добавляем обьект жанра
            state[key].push(actor);
        else
            //иначе вырезаем обьект из масива жанров фильма
            state[key].splice(state[key].map(function (g) { return g.actor_id; }).indexOf(value), 1);
        //записаем копию в оригинал детальный фильм
        setcurrentFilm(state);
    }
    function handleInputProducer(e) {
        //в переменную создали копию переменной выбранного фильма
        var state = Object.assign({}, currentFilm);
        //хранит код жанра
        var value = Number(e.target.value)
        //переменная объекта жанра
        var producer = {};
        //присваиваем обьекту жанра код фильма (используя пропс)
        producer.film_id = Number(film.id);
        ///присваиваем обьекту жанра код жанра (используя переменную)
        producer.producer_id = value;
        var key = 'producerfilms';
        //проверка на наличие в жанрах фильма ключа который соответствует checkbox
        if (state[key].filter(g => g.producer_id === value).length === 0)
            //добавляем обьект жанра
            state[key].push(producer);
        else
            //иначе вырезаем обьект из масива жанров фильма
            state[key].splice(state[key].map(function (g) { return g.producer_id; }).indexOf(value), 1);
        //записаем копию в оригинал детальный фильм
        setcurrentFilm(state);
    }
    function handleInputImage(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        console.log(files[0])
        setImage(files[0]);
    }
    function onChangeImageZone(file) {
        console.log(file[0]);
        setImage(file[0]);
    }
    function onFormSubmit(e) {
        e.preventDefault()
        let formData = new FormData(); // instantiate it
        // suppose you have your file ready
        formData.set('file', image);
        //console.log(formData.get('file'));
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
            (response) => {
                axios.post('http://localhost:8000/api/admin-upload-image-film', formData, {
                    headers: {
                        'content-type': 'multipart/form-data' // do not forget this 
                    }
                }).then(
                    (response) => {
                        //console.log(response.data);
                        var state = Object.assign({}, currentFilm);
                        state["image_id"] = response.data;
                        setcurrentFilm(state);

                    },
                )
            })
        /*axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
            (response) => {
                axios.post("http://localhost:8000/api/admin-upload-image-film", image).then(
                    (response) => {
                        console.log(response.data);
                        //setImage(response.data);

                    },
                )
            })*/
    }
    //рендер если фильм отсутствует
    if (!film) {
        return (<div>  Film Doesnt exist </div>);
    }
    else {

        return currentFilm ?
            (

                <div className={classes.root} >
                    <label>Film</label>
                    <hr />
                    <br/>
                    <br/>
                    <TextField
                        fullWidth
                        id="standard-multiline-flexible"
                        label="Name:"
                        multiline
                        rowsMax={4}
                        value={currentFilm.name}
                        onChange={(e) => handleInput('name', e)}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Description:"
                        multiline
                        rows={4}
                        value={currentFilm.description != null ? currentFilm.description : ""}
                        variant="outlined"
                        onChange={(e) => handleInput('description', e)}
                    />
                    <TextField
                        fullWidth
                        id="standard-multiline-flexible"
                        label="Release date:"
                        multiline
                        rowsMax={4}
                        value={currentFilm.release_date != null ? currentFilm.release_date : ""}
                        onChange={(e) => handleInput('release_date', e)}
                    />
                    <TextField
                        fullWidth
                        id="standard-multiline-flexible"
                        label="Link trailer:"
                        multiline
                        rowsMax={4}
                        value={currentFilm.link_trailer != null ? currentFilm.link_trailer : ""}
                        onChange={(e) => handleInput('link_trailer', e)}
                    />
                    <TextField
                        fullWidth
                        id="standard-multiline-flexible"
                        label="Duration:"
                        multiline
                        rowsMax={4}
                        value={currentFilm.duration != null ? currentFilm.duration : ""}
                        onChange={(e) => handleInput('duration', e)}
                    />

                    <br />
                    <br />
                    <label>Genres film</label>
                    <hr />

                    <input type="hidden" value={currentFilm.id} />

                    {
                        //вывод списка жанров в виде checkbox
                    }
                    <FormGroup row>
                        {(genres.map((genre, i) => {
                            return (
                                <FormControlLabel key={i}
                                    control={<Checkbox checked={currentFilm.genrefilms?.filter(g => g.genre_id === genre.id).length > 0 ? "checked" : ""} onChange={(e) => handleInputGenre(e)} value={genre.id} />}
                                    label={genre.name}
                                />
                            );
                        }))}
                    </FormGroup>
                    <br />
                    <label>Actors film</label>
                    <hr />
                    <FormGroup row>
                        {(actors.map((actor, i) => {
                            return (
                                <FormControlLabel key={i}
                                    control={<Checkbox checked={currentFilm.actorfilms?.filter(g => g.actor_id === actor.id).length > 0 ? "checked" : ""} onChange={(e) => handleInputActor(e)} value={actor.id} />}
                                    label={actor.name}
                                />
                            );
                        }))}
                    </FormGroup>
                    <br />
                    <label>Producers film</label>
                    <hr />
                    <FormGroup row>
                        {(producers.map((producer, i) => {
                            return (
                                <FormControlLabel key={i}
                                    control={<Checkbox checked={currentFilm.producerfilms?.filter(g => g.producer_id === producer.id).length > 0 ? "checked" : ""} onChange={(e) => handleInputProducer(e)} value={producer.id} />}
                                    label={producer.name}
                                />
                            );
                        }))}
                    </FormGroup>
                    <br />
                    <label>Company film</label>
                    <hr />
                    <FormControl >

                        <NativeSelect
                            value={currentFilm.company_id !== null ? currentFilm.company_id : ""}
                            onChange={(e) => handleInput('company_id', e)}
                        >
                            {(companies.map((company, i) => {

                                return (
                                    <option key={i} value={company.id} >{company.name}</option>
                                );
                            }))}
                        </NativeSelect>
                    </FormControl>
                    <br />
                    <br />
                    <label>Image upload </label>
                    <hr />
                    <br />
                    <label>Old image</label>
                    <br />
                    <CardMedia>
                        <img
                            src={currentFilm.image !== null ? "http://localhost:8000/img/film/" + currentFilm.image.img : "http://localhost:8000/img/film/default.jpg"}
                            alt="First slide"
                            className="slick-image"
                        />
                    </CardMedia>
                    <br />
                    <label>New image</label>
                    <br />
                    <br />
                    <form onSubmit={(e) => onFormSubmit(e)}>

                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={(files) => onChangeImageZone(files)}
                        />
                        <br />
                    <br />
                        <Button
                            type="submit"
                            variant="contained"
                            color="default"
                            className={classes.button}
                            startIcon={<Backup />}
                        >
                            Upload
                    </Button>
                    <br />
                    <br />
                    </form>

                    <label>Film changes</label>
                    <hr />
                    <br />
                    <br />
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
                    <br />
                    <br />
                </div>
            )
            : (<div key={film.name}><p>Loading...</p></div>);
    }
};
