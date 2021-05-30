import React from "react";
import axios from "axios";
import { useParams} from "react-router-dom";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "assets/img/faces/avatar.jpg";
import team2 from "assets/img/faces/christian.jpg";
import team3 from "assets/img/faces/kendall.jpg";

import Carousel from "react-slick";
// material-ui components
// @material-ui/icons

const useStyles = makeStyles(styles);

const viewsStyles = makeStyles((theme) => ({
  gridReviews:{
    overflow: "auto",
    height:424,
    paddingLeft:-100
  },
}));
export default function Reviews({film, updateChild}) {
  const { id } = useParams();
  const [reviews, setreviews]=React.useState([]);
  const [reviewsOnPage, setreviewsOnPage]=React.useState({});
  const [reviewsPages, setreviewsPages]=React.useState({});
  const [renderEnable, setrenderEnable]=React.useState();
  React.useEffect(() => {
    axios
    .get("http://localhost:8000/api/film-reviews/"+id)
    .then(
        (response) => {
           // console.log(response);
           var onPages=2;
           setreviews(response.data);
           setreviewsOnPage(onPages);
           setreviewsPages(Math.ceil(response.data.length/onPages));
        });
}, []);

  const classesNames = viewsStyles();
  const classes = useStyles();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  let CarouselItems = [];
  if(updateChild!=false&&reviews.length!==0 && reviews.filter(r=>r.id===updateChild.id).length===0){
   // console.log(updateChild);
    setreviews(reviews => [...reviews, updateChild]);
    setreviewsPages(Math.ceil((reviews.length+1)/reviewsPages));
    console.log(reviews);
  }

  for (var i = 1; i <= reviewsPages; i++) {
    CarouselItems.push(
          <GridContainer >
            {reviews.slice((i*reviewsOnPage)-reviewsOnPage, 
            i*reviewsOnPage>reviews.lenght? reviews.lenght:i*reviewsOnPage).map((review,j) => {
          return <GridItem key={j}className={classesNames.gridReviews} xs={12} sm={12} md={6}>
            <Card plain>
              <h4 className={classes.cardTitle}>
                {review.name}
                <br />
                <small className={classes.smallTitle}>{review.date}</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                    {review?.comment?.substr(0, 700)}
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
              </CardFooter>
            </Card>
          </GridItem>
            })}
        </GridContainer>
    )};

  if (reviews?.length>0)return (
    <div className={classes.section}>
      <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12}>
        <Card >
          <Carousel {...settings}>
            {CarouselItems.map((item,i)=>{
              return (<div key={i}>{item}</div>)
            })}
          </Carousel>
        </Card>
      </GridItem>
    </GridContainer>
    </div>
  )
  else return <div></div> 
}
