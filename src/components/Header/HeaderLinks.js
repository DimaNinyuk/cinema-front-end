/*eslint-disable*/
import React, {useContext} from "react";
import { AppContext } from "contexts/AppContext";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// react components for routing our app without refresh

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput.js";
// @material-ui/icons
import { ShoppingCart, YoutubeSearchedFor} from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import {
  NOT_LOGGED_IN,
  LOG_IN_FORM,
  SIGN_UP_FORM,
  LOGGED_IN,
} from "../../constants/AuthStatus";
const useStyles = makeStyles(styles);
const thisStyles = theme => ({
  multilineColor:{
      color:'white'
  }
});
const thisUseStyles = makeStyles(thisStyles);
export default function HeaderLinks(props) {
  const classes = useStyles();
  const thisClasses = thisUseStyles();
  const appContext = useContext(AppContext);
  const [searchValue, setSearchValue] = React.useState("");
  const {
    cart,
    setCart,
    logout,
    authStatus
  } = appContext;

  return (
    <List className={classes.list}>
    <ListItem className={classes.listItem}><div style={{marginTop:-23}}><CustomInput
                  inputProps={{
                    classes: {
                      input: thisClasses.multilineColor,
                  },
                  placeholder:'Seacrh',
                  value:searchValue,
                  onChange:(e)=>{setSearchValue(e.target.value)}
                  }}
                  
                /></div>
      </ListItem>
      <ListItem className={classes.listItem}>
      <Button
          href={searchValue!==""?"http://localhost:3000/film-search?key="+searchValue:"#"}
          color="transparent"
          className={classes.navLink}
        >
          <Search className={classes.icons} /> 
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Cart"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={ShoppingCart}
          dropdownList=
          {
            cart.length>0?cart.map(c=>
              {
                return <div key={c.id}><div>{c.name}</div>
                <p><Button href={"http://localhost:3000/film-detail/"+c.id} 
                onClick={(e)=>{}}
                fullWidth style={{height:10, padding:15}}>Book now</Button></p>
                <p><Button onClick={()=>{setCart(cart.filter(item => item.id !== c.id));}}
                fullWidth style={{height:10, padding:15}}>Remove from cart</Button></p></div>
              }):[<div>Cart is empty</div>]
          }
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="http://localhost:3000/profile"
          color="transparent"
          className={classes.navLink}
        >
          <AccountCircleIcon className={classes.icons} /> 
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on youtube"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://youtube.com/"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-youtube"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      {authStatus===LOGGED_IN?<ListItem className={classes.listItem}>
        <Tooltip
          id="logout-tooltip"
          title="Log out"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
          onClick={()=>{logout()}}
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fas fa-sign-out-alt"} />
          </Button>
        </Tooltip>
      </ListItem>:""}
    </List>
  );
}
