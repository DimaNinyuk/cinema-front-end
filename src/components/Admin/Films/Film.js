import React, { useState, useEffect } from "react";
import axios from "axios";
import { escapeLeadingUnderscores } from "typescript";

function useStateFromProp(initialValue) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => setValue(initialValue), [initialValue]);
    return [value, setValue];
}
export default function Film({ film, onUpdate, onDelete, genres }) {

    const [currentFilm, setcurrentFilm] = useStateFromProp(film);
    function handleSubmit(e) {
        e.preventDefault();
        // console.log(newfilm);
        onUpdate(currentFilm);
    };
    function handleDelete(e) {
        e.preventDefault();
        onDelete(film);
    };
    function handleInput(key, e) {
        var state = Object.assign({}, currentFilm);
        state[key] = e.target.value;
        setcurrentFilm(state);
        //console.log(currentFilm);
    };
    function handleInputGenre(e) {
      //  e.preventDefault();
        var state = Object.assign({}, currentFilm);
        var value = e.target.value
        var genre={};
            genre.genre_id=value;
            if(state['genrefilms'].filter(g => g.genre_id.toString() === value.toString()).length === 0)
            state['genrefilms'].push(genre);
            else 
            state['genrefilms'].splice(state['genrefilms'].map(function(g) { return g.genre_id.toString(); }).indexOf(value.toString()), 1);
       // console.log(genrefilms);
       // setCart(cart => [...cart, film]);
        setcurrentFilm(state);
        console.log(state['genrefilms']);
    }


    if (!film) {
        return (<div>  Film Doesnt exist </div>);
    }
    else if (currentFilm == null) {
        return (
            <div>
                <form>
                    <label> Name:
                        <input type="text" value={film.name} onChange={(e) => handleInput('name', e)} />
                    </label>
                    <label> Description:
                    <input type="text" value={film.description} onChange={(e) => handleInput('description', e)} />
                    </label>

                    <input type="text" value={film.id} onChange={(e) => handleInput('id', e)} />

                    {genres.map((genre,i) => {
                        if(film.genrefilms.filter(g => g.genre_id.toString() === genre.id.toString()).length > 0)
                            return (
                                <div>
                                <input  onChange={(e) => handleInputGenre(e)} checked key={i} type="checkbox" value={genre.id}/> 
                                {genre.name}
                                </div>
                            );
                            else 
                            return (
                                <div>
                                <input  onChange={(e) => handleInputGenre(e)} key={i} type="checkbox" value={genre.id}/> 
                                {genre.name}
                                </div>
                            );
                        }
                        )}
                    <button onClick={(e) => handleSubmit(e)}>Update</button>
                    <button onClick={(e) => handleDelete(e)}>Delete</button>
                </form>
            </div>
        )
    }
    else {
        return (

            <div>
                <form>
                    <label> Name:
                        <input type="text" value={currentFilm.name} onChange={(e) => handleInput('name', e)} />
                    </label>
                    <label> Description:
                    <input type="text" value={currentFilm.description} onChange={(e) => handleInput('description', e)} />
                    </label>
                    <input type="text" value={currentFilm.id} onChange={(e) => handleInput('id', e)} />
                    <div>
                    {genres.map((genre,i) => {
                        if(currentFilm.genrefilms.filter(g => g.genre_id.toString() === genre.id.toString()).length > 0)
                            return (
                                <div>
                                <input  onChange={(e) => handleInputGenre(e)} checked key={i} type="checkbox" value={genre.id} /> 
                                {genre.name}
                                </div>
                            );
                            else 
                            return (
                                <div>
                                <input  onChange={(e) => handleInputGenre(e)} key={i} type="checkbox" value={genre.id}/> 
                                {genre.name}
                                </div>
                            );
                        }
                        )}
                        
                    </div>
                    <button onClick={(e) => handleSubmit(e)}>Update</button>
                    <button onClick={(e) => handleDelete(e)}>Delete</button>
                </form>

            </div>

        );
    }
};
