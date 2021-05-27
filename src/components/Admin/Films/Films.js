import React, { useState, useEffect } from "react";
import axios from "axios";
import Film from "components/Admin/Films/Film.js";
import AddFilm from "components/Admin/Films/AddFilm.js";
export default function Films() {
    const [allfilms, setallfilms] = useState([]);
    const [currentFilm, setcurrentFilm] = useState(null);
    const [genres, setGenres] = useState();
    const [allactors, setActors] = useState();
    const [allproducers, setProducers] = useState();
    const [allcompanies, setCompanies] = useState();
    //метод, который заполняет данными переменную выбранного фильма (перересовка выбраного фильма)
    function getFilmDetail(film){
        axios
        .get("http://localhost:8000/api/admin-films/"+film.id)
        .then(
            (response) => {
              setcurrentFilm(response.data);
            },
        );
    }
    //метод, который вызывается первый при загрузки страницы, здесь заполняем фильмами страницу, а также список жанров
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/admin-films")
            .then(
                (response) => {
                    setallfilms(response.data);
                },
            );
            axios
            .get("http://localhost:8000/api/admin-genres")
            .then(
                (response) => {
                    setGenres(response.data);
                },
            );
            axios
            .get("http://localhost:8000/api/admin-actors")
            .then(
                (response) => {
                    setActors(response.data);
                },
            );
            axios
            .get("http://localhost:8000/api/admin-producers")
            .then(
                (response) => {
                    setProducers(response.data);
                },
            );
            axios
            .get("http://localhost:8000/api/admin-companies")
            .then(
                (response) => {
                    setCompanies(response.data);
                },
            );
    }, []);
    //метод отвечает за обработку клика выбора фильма
    function handleClick(film) {
        
        getFilmDetail(film);
    };
    //медот отвечает за добавление фильма
    function handleAddFilm(film) {
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
            (response) => {
                axios.post("http://localhost:8000/api/admin-films", film).then(
                    (response)=>
                {
                    setallfilms(allfilms => [...allfilms, response.data]);
                    getFilmDetail(response.data);
                },
                )
            })
    }
    //метод отвечает за обновление фильма
    function handleUpdateFilm(film) {
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
                 },
                 ).then(
                    (response)=>
                    {
                        axios.post("http://localhost:8000/api/admin-genrefilm",film.genrefilms).then(
                            (response)=>
                        {
                        })
                    }, 
                 ).then(
                    (response)=>
                    {
                        axios.post("http://localhost:8000/api/admin-actorfilm",film.actorfilms).then(
                            (response)=>
                        {
                            
                        })
                    }, 
                    ).then(
                        (response)=>
                        {
                            axios.post("http://localhost:8000/api/admin-producerfilm",film.producerfilms).then(
                                (response)=>
                            {
                                getFilmDetail(film);
                            })
                        }, 
                        )
             })

            
     }
     //мотод отвечает за удаление фильма
     function handleDeleteFilm(film) {
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
        //рендер страницы
        return (
            <div>
                <h3>All Films</h3>
                <ul>
                    {
                        //вывод списка фильмов
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
                {//вывод выбранного фильма
                }
                <Film film={currentFilm} onUpdate={handleUpdateFilm} onDelete={handleDeleteFilm} genres={genres} actors={allactors} producers={allproducers} companies={allcompanies}/>
                {//добавление фильма
                }
                <AddFilm onAdd={handleAddFilm} />
                
            </div>

        );
    };
