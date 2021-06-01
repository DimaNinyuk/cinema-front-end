import React, {useState, useEffect} from "react";
import axios from "axios";
import FilmCard from "./FilmCard";
import GridContainer from  "components/Grid/GridContainer";
import GridItem from  "components/Grid/GridItem";

export default function SearchedFilms ({props}) {

    const [searchedfilms, setSearchedfilms] = useState([]);
    useEffect(() => {
        console.log(props);
          axios
            .get("http://localhost:8000/api/film-search"+props)
            .then(
              (response) => {
                  console.log(response);
                  setSearchedfilms(response.data);
              },
            );
            
    }, []);
  
    if (searchedfilms.length>0) return (
      <div>
                <h3>Results:</h3>
                <GridContainer style={{padding: "25px"}}>
                {searchedfilms.map(film => {
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
    else return (<div>Not Found</div>)
  };
  
  