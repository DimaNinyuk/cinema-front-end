import React, { useState, useEffect } from "react";
import axios from "axios";
import Film from "components/Admin/Films/Film.js";
import AddFilm from "components/Admin/Films/AddFilm.js";
export default function Films() {
    const [allfilms, setallfilms] = useState([]);
    const [currentFilm, setcurrentFilm] = useState(null);
    const [genres, setGenres] = useState();
    function getFilmDetail(film){
        axios
        .get("http://localhost:8000/api/admin-films/"+film.id)
        .then(
            (response) => {
              setcurrentFilm(response.data);
            },
        );
    }
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/admin-films")
            .then(
                (response) => {
                  //  console.log(response);
                    setallfilms(response.data);
                },
            );
            axios
            .get("http://localhost:8000/api/admin-genres")
            .then(
                (response) => {
                    //  console.log(response);
                    setGenres(response.data);
                },
            );
    }, []);

    function handleClick(film) {
        
        getFilmDetail(film);
    };
    function handleAddFilm(film) {
       // console.log(film);
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
            (response) => {
                axios.post("http://localhost:8000/api/admin-films", film).then(
                    (response)=>
                {
                    //console.log(response);
                    setallfilms(allfilms => [...allfilms, response.data]);
                    getFilmDetail(response.data);
                },
                )
            })
    }
    function handleUpdateFilm(film) {
        // console.log(film);
         axios.defaults.withCredentials = true;
         axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
             (response) => {
                 axios.put("http://localhost:8000/api/admin-films/"+film.id,film).then(
                     (response)=>
                 {
                    var array = allfilms.filter(function(item) {
                        return item.id !== film.id
                    })
                    setallfilms(allfilms => [...array, response.data]);
                    getFilmDetail(film);
                 },
                 ).then(
                    (response)=>
                    {
                        axios.post("http://localhost:8000/api/admin-genrefilm",currentFilm.genrefilms).then(
                            (response)=>
                        {
                            //console.log(response);
                            getFilmDetail(film);
                        })
                    }, 
                 )
             })

            
     }
     function handleDeleteFilm(film) {
        // console.log(film);
         axios.defaults.withCredentials = true;
         axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
             (response) => {
                 axios.delete("http://localhost:8000/api/admin-films/"+film.id,film).then(
                     (response)=>
                 {
                    var array = allfilms.filter(function(item) {
                        return item.id !== currentFilm.id
                    })
                    setallfilms(array);
                    setcurrentFilm(null);
                 },
                 )
             })
     }
        
        return (
            <div>
                <h3>All Films</h3>
                <ul>
                    {
                        allfilms.map((film,i) => {
                            return (
                                <li onClick={() => handleClick(film)}
                                    key={i} >
                                    { film.name}
                                </li>
                            );

                        }
                        )
                    }
                </ul>
                <Film film={currentFilm} onUpdate={handleUpdateFilm} onDelete={handleDeleteFilm} genres={genres} />
                <AddFilm onAdd={handleAddFilm} />
                
            </div>

        );
    };
