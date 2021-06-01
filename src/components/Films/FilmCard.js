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
                <CardBody>
                <h4 className={classes.cardTitle}>{film.name}</h4>
                <h4 className={classes.cardTitle}>Genre: {film.genrefilms?.length>0?
                film.genrefilms.map((g,i)=>{return <span key={i}>{g.genre?.name}  </span>}):<span>-</span>}</h4>
                <p>{film.description?.substr(0, 150)}...</p>
                <FilmCartButton film={film}/>
                </CardBody>
            </Card>
    );
  }