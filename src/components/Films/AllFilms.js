import React, { useState, useEffect } from "react";
import axios from "axios";
import FilmCard from "./FilmCard";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/components.js";
import LinearProgress from '@material-ui/core/LinearProgress';
const useStyles = makeStyles(styles);
const useStyles2 = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
export default function AllFilms() {
  const classes = useStyles();
  const classes2 = useStyles();
  const [allfilms, setallfilms] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/recommends")
      .then(
        (response) => {
          setallfilms(response.data);
        },
      );
  }, []);
  return (
    <div >
      <Grid container>
        <Grid item xs={12} className={classes.textCenter}>
          <div className={classes2.root}>
            <LinearProgress />
            <LinearProgress color="secondary" />
          </div>
          <h6>Available movies</h6>
        </Grid>
      </Grid>
      <GridContainer style={{ padding: "25px" }}>
        {allfilms.map(film => {
          return (
            /* When using list you need to specify a key
            * attribute that is unique for each list item
            */
            <GridItem item xs={12} sm={6} md={4} lg={3} key={film.id} >
              <FilmCard film={film} />
            </GridItem>
          );
        })}
      </GridContainer>
      <div className={classes2.root}>
            <LinearProgress />
            <LinearProgress color="secondary" />
          </div>
    </div>

  );
};

