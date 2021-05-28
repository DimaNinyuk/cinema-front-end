import React, {useState, useEffect} from "react";
import axios from "axios";
import FilmCard from "./FilmCard";
import GridContainer from  "components/Grid/GridContainer";
import GridItem from  "components/Grid/GridItem";


export default function AllFilms () {

    const [allfilms, setallfilms] = useState([]);
    useEffect(() => {
          axios
            .get("http://localhost:8000/api/recommends")
            .then(
              (response) => {
                  console.log(response);
                setallfilms(response.data);
              },
            );
    }, []);
  
    return (
      <div>
                <h3>Фильмы в прокате</h3>
                <GridContainer style={{padding: "25px"}}>
                {allfilms.map(film => {
                return (
                    /* When using list you need to specify a key
                    * attribute that is unique for each list item
                    */
                    <GridItem item xs={12} sm={6} md={4} lg={3} key={film.id} >
                        {film.name } 
                        <FilmCard film={film}/> 
                    </GridItem>
                    
                );})}
                </GridContainer> 
      </div>
     
    );
  };
  
  