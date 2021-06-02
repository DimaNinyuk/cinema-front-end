import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams} from "react-router-dom";
import { AppProvider } from "contexts/AppContext"
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";


import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import Information from "./Sections/Information";
import Sessions from "./Sections/Sessions";
import ReviewsSection from "./Sections/ReviewsSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function FilmDetail(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const { id } = useParams();
  const [film, setfilm] = useState({});

  useEffect(() => {
    axios
        .get("http://localhost:8000/api/film-detail/"+id)
        .then(
            (response) => {
                setfilm(response.data);
            },
        );
}, []);
  return (
    <div>
    <AppProvider>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        leftLinks={<List>
            <ListItem className={classes.listItem}>
         <Button
           href="http://localhost:3000"
           color="transparent"
           style={{ fontSize: 40 }}
           className={classes.navLink}
         >
          CinemaX
         </Button>
       </ListItem>
         </List>}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={film?.image?.img?"http://localhost:8000/img/film/"+film.image.img:require("assets/img/bg4.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}></h1>
              <h4>
              </h4>
              <br />
              {console.log(film)}
              <Button
                color="danger"
                size="lg"
                href={film.link_trailer?film.link_trailer:"http://youtube.com"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
      <div className={classes.container}>
            <Information film={film}/>
            </div>
    </div>
    <div className={classNames(classes.mainRaised)} style={{marginTop:"50px"}}>
    <div className={classes.container}>
            <Sessions film={film}/>
            </div>
    </div>
      <div className={classNames(classes.main)} style={{marginTop:"50px"}}>
        <div className={classes.container}>
          <ReviewsSection />
          </div>
      </div>
      <Footer />
      </AppProvider>
    </div>
  );
}
