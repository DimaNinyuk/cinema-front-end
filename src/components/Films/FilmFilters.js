import React, { useState, useEffect } from "react";
import axios from "axios";
import FilmCard from "./FilmCard";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { AppProvider } from "contexts/AppContext"
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Email from "@material-ui/icons/Email";

import Header from "components/Header/Header.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
// core components
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import profileImage from "assets/img/faces/avatar.jpg";
import Paginations from "components/Pagination/Pagination.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);
export default function FilmFilters() {
    const classes = useStyles();
    const [allgenre, setgenre] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/filmsbygenre")
            .then(
                (response) => {
                    console.log(response);
                    setgenre(response.data);
                },
            );
    }, []);

    return (
        <div>
            <AppProvider>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={2}>
                        <FormControl >
                            <Datetime 
                                inputProps={{ placeholder: "Select Date ..." }}
                            />  
                        </FormControl>
                    </GridItem>
                </GridContainer>
                <div id="nav-tabs">
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomTabs
                                headerColor="primary"
                                tabs={[
                                    allgenre.map(genre=>({tabName: "Profile"}))
                                ]}
                            />
                        </GridItem>
                    </GridContainer>
                </div>

            </AppProvider>
        </div>

    );

};