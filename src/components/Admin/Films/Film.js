import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";
import { escapeLeadingUnderscores } from "typescript";

export default function Film({ film, onUpdate, onDelete, genres }) {

    const [currentFilm, setcurrentFilm] = useState({...film});
    useEffect(() => {
        setcurrentFilm(film);
    }, [film])
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
        console.log(currentFilm);
    };
    function handleInputGenre(e) {
      //  e.preventDefault();
        var state = Object.assign({}, currentFilm);
        var value = Number(e.target.value)
        var genre={};
            genre.film_id=Number(film.id);
            genre.genre_id=value;
        var key= 'genrefilms';
            if(state[key].filter(g => g.genre_id=== value).length === 0)
            state[key].push(genre);
            else 
            state[key].splice(state[key].map(function(g) { return g.genre_id; }).indexOf(value), 1);
       // console.log(genrefilms);
       // setCart(cart => [...cart, film]);
      setcurrentFilm(state);
        
        console.log(state['genrefilms']);
    }
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
                    <input type="text" value={currentFilm.description!=null?currentFilm.description:""} onChange={(e) => handleInput('description', e)} />
                    </label>
                    <input type="hidden" value={currentFilm.id}  />
                        {(genres.map((genre,i) => {
                            return (
                                <div key={i}> 
                                <input  onChange={(e) => handleInputGenre(e)} 
                                checked={currentFilm.genrefilms?.filter(g => g.genre_id === genre.id).length > 0?"checked":""} type="checkbox" 
                                value={genre.id} /> 
                                {genre.name}
                                </div>
                            );
                        }))}
                    <button onClick={(e) => handleSubmit(e)}>Update</button>
                    <button onClick={(e) => handleDelete(e)}>Delete</button>
            </div>
         )
         : (<div key={film.name}><p>Loading...</p></div>);
    }
};
