import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "contexts/AppContext";
import AuthMenu from "./AuthMenu";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg4.jpg";

const useStyles = makeStyles(styles);


const AuthLogin = (props) => {
  const appContext = useContext(AppContext);
  const {
    userEmail,
    userPassword,
    handleUserEmail,
    handleUserPassword,
    login,
    errorMessage,
  } = appContext;
  const [hidePassword, setHidePassword] = useState(true);
  const showHiddenPassword = hidePassword ? "" : "hidden";
  const showRevealedPassword = hidePassword ? "hidden" : "";
  const showErrors = errorMessage ? "" : "hidden";
  const [googleLoginUrl, setGoogleLoginUrl] = useState("");
  function togglePassword() {
    setHidePassword(!hidePassword);
  }

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  
//get google-auth-url
useEffect(() => {
  axios.defaults.withCredentials = true;
  axios.get('http://localhost:8000/api/auth/google/url')
    .then(
      (response) => {
        
        setGoogleLoginUrl(response.data.url);
      },
      (error) => {
        console.log(error);
      }
    );   
}, []);

  return (
    
    <div>
    <Header
      absolute
      color="transparent"
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
      {...rest}
    />
    <div
      className={classes.pageHeader}
      style={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "top center"
      }}
    >
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <Card className={classes[cardAnimaton]}>
              <form className={classes.form}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Login</h4>
                  <div className={classes.socialLine}>
                    <Button
                      justIcon
                      href="#pablo"
                      target="_blank"
                      color="transparent"
                      onClick={e => e.preventDefault()}
                    >
                      <i className={"fab fa-facebook"} />
                    </Button>
                    <Button
                      justIcon
                      target="_parent"
                      color="transparent"
                      href={googleLoginUrl}
                    >
                      <i className={"fab fa-google-plus-g"} />
                    </Button>
                  </div>
                </CardHeader>
                <p className={classes.divider}>Or Be Classical</p>
                <CardBody>
                  {/* EMAIL */}
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    name="email"
                    formControlProps={{
                      fullWidth: true,
                      
                    }}
                    inputProps={{
                      type: "email",
                      value:userEmail,
                      onChange:handleUserEmail,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    
                    }}
                    
                  />
                  {/* HIDDEN PASSWORD */}
                  <div className={showHiddenPassword}>
                  <CustomInput
                    labelText="Password"
                    id="pass"
                    name="password"
                   
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password",
                      value:userPassword,
                      onChange:handleUserPassword,
                      endAdornment: (
                        <InputAdornment position="end" onClick={() => togglePassword()} 
                        style={{cursor: "pointer"}}  >
                          <Icon className={classes.inputIconsColor} 
                          >
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: "off"
                    }}
                  />
                  </div>
                  {/* REVEALED PASSWORD */}
                  <div className={showRevealedPassword}>
                  <CustomInput
                    labelText="Password"
                    id="pass"
                    name="password"
                   
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value:userPassword,
                      onChange:handleUserPassword,
                      endAdornment: (
                        <InputAdornment position="end" onClick={() => togglePassword()} 
                        style={{cursor: "pointer"}}  >
                          <Icon className={classes.inputIconsColor} 
                          >
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: "off"
                    }}
                  />
                    </div>
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                   {/* SUBMIT BUTTON */}
                  <Button simple color="primary" size="lg" 
                  onClick={() => login()}>
                    Login
                  </Button>
                </CardFooter>
              </form>
              {/* Notification */}
              <div className={showErrors}>
              <SnackbarContent
                message={<b>Invalid email or password</b>} 
                close 
                color="danger"
                icon="info_outline"
              />
              </div>
              <AuthMenu loggedIn={false} />
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <Footer whiteFont />
    </div>
    </div>
  );
};

export default AuthLogin;
