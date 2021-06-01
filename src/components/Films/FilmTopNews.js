import React, { useState, useEffect } from "react";
import axios from "axios";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// material-ui components
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import { makeStyles } from "@material-ui/core/styles";

import image1 from "assets/img/bg.jpg";
import image2 from "assets/img/bg2.jpg";
import image3 from "assets/img/bg3.jpg";
import styles from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

const useStyles = makeStyles(styles);
export default function FilmTopNews(){
    const classes = useStyles();
    const [films, setfilms] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/newfilms")
      .then(
        (response) => {
          setfilms(response.data);
        },
      );
  }, []);
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
  return (
    
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12}>
        <Card>
        {films.length>0?films.length>4?<Carousel {...settings}>
          {films.slice(0,4).map((f,i)=>{
              return <div key={i}>
              <img
                src={"http://localhost:8000/img/film/"+f.image.img}
                alt="First slide"
                className="slick-image"
              />
              <div className="slick-caption">
                <h6>
                {f.name+" - "+f.release_date}
                </h6>
              </div>
            </div>
          })
        }
        </Carousel>:
        <Carousel {...settings}>
        {films.map((f,i)=>{
            return <div key={i}>
            <img
              src={f.image?"http://localhost:8000/img/film/"+f.image.img:"http://localhost:8000/img/film/default.jpg"}
              alt="First slide"
              className="slick-image"
            />
            <div className="slick-caption">
              <h6>sssssss
               {f.name+" - "+f.release_date}
              </h6>
            </div>
          </div>
        })
      }
      </Carousel>:<div></div>}
        </Card>
      </GridItem>
    </GridContainer>
  
  );
}