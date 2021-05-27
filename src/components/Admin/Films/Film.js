import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { escapeLeadingUnderscores } from "typescript";

export default function Film({ film, onUpdate, onDelete, genres, actors, producers, companies }) {

    //состояния
    const [currentFilm, setcurrentFilm] = useState({ ...film });
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
    //рендер если фильм отсутствует
    if (!film) {
        return (<div>  Film Doesnt exist </div>);
    }
    else {
        return currentFilm ?
            (
                <div >
                    <label> Name:
                        <input type="text" value={currentFilm.name} onChange={(e) => handleInput('name', e)} />
                    </label>
                    <label> Description:
                    <input type="text" value={currentFilm.description != null ? currentFilm.description : ""} onChange={(e) => handleInput('description', e)} />
                    </label>
                    <input type="hidden" value={currentFilm.id} />
                    {
                        //вывод списка жанров в виде checkbox
                    }
                    {(genres.map((genre, i) => {
                        return (
                            <div key={i}>
                                <input onChange={(e) => handleInputGenre(e)}
                                    checked={currentFilm.genrefilms?.filter(g => g.genre_id === genre.id).length > 0 ? "checked" : ""} type="checkbox"
                                    value={genre.id} />
                                {genre.name}
                            </div>
                        );
                    }))}
                    {(actors.map((actor, i) => {
                        return (
                            <div key={i}>
                                <input onChange={(e) => handleInputActor(e)}
                                    checked={currentFilm.actorfilms?.filter(g => g.actor_id === actor.id).length > 0 ? "checked" : ""} type="checkbox"
                                    value={actor.id} />
                                {actor.name}
                            </div>
                        );
                    }))}
                    {(producers.map((producer, i) => {
                        return (
                            <div key={i}>
                                <input onChange={(e) => handleInputProducer(e)}
                                    checked={currentFilm.producerfilms?.filter(g => g.producer_id === producer.id).length > 0 ? "checked" : ""} type="checkbox"
                                    value={producer.id} />
                                {producer.name}
                            </div>
                        );
                    }))}
                    <select onChange={(e) => handleInput('company_id', e)} value={currentFilm.company_id !== null ? currentFilm.company_id : ""}>
                        {(companies.map((company, i) => {

                            return (
                                <option key={i} value={company.id}  >{company.name}</option>
                            );
                        }))}
                    </select>
                    <form >
                            <input type="file" name="image"  placeholder="Select file..."/>
                            <br />
                            <br />
                            <button type="submit" name="upload">
                                Upload
                            </button>
                        </form>
                    <button onClick={(e) => handleUpdate(e)}>Update</button>
                    <button onClick={(e) => handleDelete(e)}>Delete</button>
                </div>
            )
            : (<div key={film.name}><p>Loading...</p></div>);
    }
};
