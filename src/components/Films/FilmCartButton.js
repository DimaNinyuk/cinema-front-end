import React,  { useContext }from "react";
import Button from "components/CustomButtons/Button.js";
import { AppContext } from "contexts/AppContext";
import history from '../../history';

export default function FilmCartButton({film}) {
    const appContext = useContext(AppContext);
  const {
    cart,
    setCart,
  } = appContext;
    function press() {
        var thisfilm={id:0, name:""};
        thisfilm.id=film.id;
        thisfilm.name=film.name;
        if (cart.filter(f=>f.id===thisfilm.id).length<1)
        {setCart(cart => [...cart, thisfilm]);
          }
          console.log(cart);
        
    }
    
    function press2() {
        history.push('/film-detail/'+film.id)
    }
    return(
        <div>
             <Button onClick={press} color="primary" >Want</Button>
             <Button onClick={press2} color="primary" >Show</Button>
        </div>
    );
}