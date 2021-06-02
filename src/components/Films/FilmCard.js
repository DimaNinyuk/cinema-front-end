import React from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import FilmCartButton from "./FilmCartButton";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";

import { cardTitle } from "assets/jss/material-kit-react.js";
import CardFooter from "components/Card/CardFooter";

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);
export default function FilmCard({film}) {
    const classes = useStyles();
    return (
            <Card style={{width: "100%"}}>
                <img
                style={{height: "180px", width: "100%", display: "block"}}
                className={classes.imgCardTop}
                src={film.image?"http://localhost:8000/img/film/"+film.image.img:"http://localhost:8000/img/film/default.jpg"}
                alt="Card-img-cap"
                />
                <CardBody style={{height:300,overflow:"auto"}}>
                <h4 className={classes.cardTitle}>{film.name}</h4>
                {film.sessions?<div><h1>Available times:</h1>{film.sessions.map((s,i)=>{return<Button 
                style={{padding:"3px"}} color="danger" key={i}>{s?.time}</Button>})}</div>:""}
                <p>{film.description?.substr(0, 150)}...</p>
                <p>{film.genrefilms?.length>0?
                film.genrefilms.map((g,i)=>{return <span key={i}>#{g.genre?.name}</span>}):""}</p>
                </CardBody>
                <CardFooter>
                <FilmCartButton film={film}/>
                </CardFooter>
            </Card>
    );
  }