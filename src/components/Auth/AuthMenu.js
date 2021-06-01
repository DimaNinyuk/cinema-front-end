import React, { useContext } from "react";
import { AppContext } from "contexts/AppContext";
import Button from 'components/CustomButtons/Button.js';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

const AuthMenu = (props) => {
  const appContext = useContext(AppContext);
  const { changeAuthStatusLogin, changeAuthStatusSignup } = appContext;
  return (
    <div className="">
      {props.loggedIn ? null : (
        <div>
          <GridContainer  justify="center">
            <GridItem xs={12} sm={12} md={12}></GridItem>
           <Button simple color="primary" size="lg" 
                  onClick={() => changeAuthStatusSignup()}>
                    SIGNUP
          </Button>
          <Button simple color="primary" size="lg" 
                  onClick={() => changeAuthStatusLogin()}>
                    SIGNIN
          </Button>
          </GridContainer>
        </div>
      )}
    </div>
  );
};

export default AuthMenu;
