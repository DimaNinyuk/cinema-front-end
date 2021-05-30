import React,{useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useParams} from "react-router-dom";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function AddReview ({film, updateParrent}) {  
    const classes = useStyles();
    const{id}=useParams();
    const [review, setcurrentReview] = useState({name:"",email:"",comment:"", film_id:id});
    function changeInput(e, key){
        var state = Object.assign({}, review);
        state[key]=e.target.value;
        setcurrentReview(state);
    }
    function click(){
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
            (response) => {
                axios.post("http://localhost:8000/api/film-reviews", review).then(
                    (response) => {
                        updateParrent(response.data);
                        setcurrentReview({name:"",email:"",comment:"", film_id:id});
                    },
                )
            })
        
    }

    return (
        <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <h2 className={classes.title}>Write Review</h2>
            <h4 className={classes.description}>
             There you can write your review about film
            </h4>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Your Name"
                    id="name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                        type: "text",
                        value:review.name,
                        onChange:(e)=>changeInput(e,'name'),
                      }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Your Email"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                        type: "email",
                        value:review.email,
                        onChange:(e)=>changeInput(e,'email'),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email />
                          </InputAdornment>
                        ),
                      
                      }}
                  />
                </GridItem>
                <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                  type: "text",
                  value:review.comment,
                  onChange:(e)=>changeInput(e,'comment'),
                }}
              />
                <GridItem xs={12} sm={12} md={4}>
                  <Button onClick={()=>click()}color="primary">Send Review</Button>
                </GridItem>
              </GridContainer>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  };
  
  