import React from "react";
import TicketsBuyings from "components/FilmDetails/TicketsBuyings";


export default function Sessions ({film}) {  
    return (
      <div >
            <TicketsBuyings film={film}></TicketsBuyings>
      </div>
     
    );
  };
  
  