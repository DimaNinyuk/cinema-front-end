
import React, {useState, useEffect} from "react";
import axios from "axios";
import Reviews from "components/FilmDetails/Reviews";
import AddReview from "components/FilmDetails/AddReview";
import GridContainer from  "components/Grid/GridContainer";
import GridItem from  "components/Grid/GridItem";


export default function ReviewsSection ({film}) { 
  const[updatedReview, setupdatedReview] = React.useState(false);
  function update(review){
    setupdatedReview(review);
    //console.log(updatedReview);
  }
    return (
      <div style={{paddingTop: "55px", paddingBottom: "55px"}}>
            <Reviews film={film} updateChild={updatedReview}></Reviews>
            <AddReview film={film} updateParrent={update}></AddReview>
      </div>
      
     
    );
  };
  
  