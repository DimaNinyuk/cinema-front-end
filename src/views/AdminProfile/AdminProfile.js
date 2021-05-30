import React, { useContext } from "react";
import { AppProvider } from "contexts/AppContext"
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import LocalMovies from "@material-ui/icons/LocalMovies";
import LiveTv from "@material-ui/icons/LiveTv";
import Assignment from "@material-ui/icons/Assignment";
import Assessment from "@material-ui/icons/Assessment";
import ChatBubble from "@material-ui/icons/ChatBubble";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/christian.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";
//Films
import Films from "components/Admin/Films/Films.js"
//style
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Sessions from 'components/Admin/Sessions/Sessions.js';
import Buyings from 'components/Admin/Buyings/Buyings.js';
import Reviews from "components/Admin/Reviews/Reviews";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );

    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    return (
        <div>
            <AppProvider>
                <Header
                    color="transparent"
                    rightLinks={<HeaderLinks />}
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
                    fixed
                    changeColorOnScroll={{
                        height: 200,
                        color: "white"
                    }}
                    {...rest}
                />
                <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div>
                        <div className={classes.container}>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={6}>
                                    <div className={classes.profile}>
                                        <div>
                                            <img src={profile} alt="..." className={imageClasses} />
                                        </div>
                                        <div className={classes.name}>
                                            <h3 className={classes.title}>Christian Louboutin</h3>
                                            <h6>ADMIN</h6>
                                            
                                        </div>
                                    </div>
                                </GridItem>
                            </GridContainer>
                           
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
                                    <NavPills
                                        alignCenter
                                        color="primary"
                                        tabs={[
                                            {
                                                tabButton: "Films",
                                                tabIcon: LocalMovies,
                                                tabContent: (
                                                    
                                                    <GridContainer justify="center">
                                                        <GridItem>
                                                            <Films>

                                                            </Films>
                                                        </GridItem>
                                                    </GridContainer>
                                                )
                                            },
                                            {
                                                tabButton: "Sessions",
                                                tabIcon: LiveTv,
                                                tabContent: (
                                                    <GridContainer justify="center">
                                                        <GridItem >
                                                            <Sessions>
                                                                
                                                            </Sessions>
                                                        </GridItem>
                                                    </GridContainer>
                                                )
                                            },
                                            {
                                                tabButton: "Orders",
                                                tabIcon: Assignment,
                                                tabContent: (
                                                    <GridContainer justify="center">
                                                        <GridItem >
                                                            <Buyings>

                                                            </Buyings>
                                                        </GridItem>
                                                    </GridContainer>
                                                )
                                            },
                                            {
                                                tabButton: "Reviews",
                                                tabIcon: ChatBubble,
                                                tabContent: (
                                                    <GridContainer justify="center">
                                                        <GridItem>
                                                            <Reviews>
                                                                
                                                            </Reviews>
                                                        </GridItem>
                                                    </GridContainer>
                                                )
                                            },
                                            {
                                                tabButton: "Statistics",
                                                tabIcon: Assessment,
                                                tabContent: (
                                                    <GridContainer justify="center">
                                                        <GridItem xs={12} sm={12} md={4}>
                                                            <img
                                                                alt="..."
                                                                src={work4}
                                                                className={navImageClasses}
                                                            />
                                                            <img
                                                                alt="..."
                                                                src={studio3}
                                                                className={navImageClasses}
                                                            />
                                                        </GridItem>
                                                        <GridItem xs={12} sm={12} md={4}>
                                                            <img
                                                                alt="..."
                                                                src={work2}
                                                                className={navImageClasses}
                                                            />
                                                            <img
                                                                alt="..."
                                                                src={work1}
                                                                className={navImageClasses}
                                                            />
                                                            <img
                                                                alt="..."
                                                                src={studio1}
                                                                className={navImageClasses}
                                                            />
                                                        </GridItem>
                                                    </GridContainer>
                                                )
                                            },
                                        ]}
                                    />
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                </div>
                <Footer />
            </AppProvider>
        </div>
    );
}
