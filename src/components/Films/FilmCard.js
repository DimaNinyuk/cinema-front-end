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
                src="..."
                alt="Card-img-cap"
                />
                <CardBody>
                <h4 className={classes.cardTitle}>name = {film.name}</h4>
                <h4 className={classes.cardTitle}>date = {film.release_date}</h4>
                <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <FilmCartButton film={film}/>
                </CardBody>
            </Card>
    );
  }