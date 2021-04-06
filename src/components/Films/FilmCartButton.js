import React,  { useContext }from "react";
import Button from "components/CustomButtons/Button.js";
import { AppContext } from "contexts/AppContext";

export default function FilmCartButton({film}) {
  
    const appContext = useContext(AppContext);
  const {
    cart,
    setCart,
  } = appContext;
    function press() {
        if (!cart.includes(film))
        setCart(cart => [...cart, film]);
    }
    
    function press2() {
        console.log(cart);
    }
    return(
        <div>
             <Button onClick={press} color="primary" >Want</Button>
             <Button onClick={press2} color="primary" >Show</Button>
        </div>
    );
}