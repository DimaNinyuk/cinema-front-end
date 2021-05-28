import React, {useState, useEffect} from "react";
import axios from "axios";
import TableInformation from "components/FilmDetails/TableInformation";
import GridContainer from  "components/Grid/GridContainer";
import GridItem from  "components/Grid/GridItem";


export default function Information ({film}) {  
    return (
      <div style={{paddingTop: "55px", paddingBottom: "55px"}}>
            <TableInformation film={film}></TableInformation>
      </div>
     
    );
  };
  
  