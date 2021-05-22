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
    
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var formatter = new Intl.DateTimeFormat('en', options);
    const [selecteddate, setselecteddate] = useState(formatter.format(new Date()));
    const [allgenre, setgenre] = useState([]);
    const [pages, setpages] = useState([]);
    const [page, setpage] = useState([]);
    const [onpage, setonpage] = useState(1);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/filmsbygenre")
            .then(
                (response) => {
                   // console.log(response);
                    setgenre(response.data);
                    const ps = [];
                    const p = [];
                    response.data.map(g=>{
                    ps.push(Math.ceil(g.genrefilms.length/onpage))
                    p.push(1)
                });
                setpages(ps);
                setpage(p);
                },
            );
    }, []);

    return (
        <div>
            <AppProvider>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={3}>
                        <FormControl >
                            <Datetime 
                                inputProps={{ placeholder: "Select Date ...", value:selecteddate,
                                }}
                                onChange={(date)=>{setselecteddate(formatter.format(date));
                                    var array = allgenre.map(genre=> {
                                        genre.genrefilms.filter(function(genrefilm){
                                                return genrefilm.film.release_date == selecteddate
                                            }) 
                                    })
                                    //setgenre(array);
                                    console.log(allgenre)
                                }}
                            />  
                        </FormControl>
                    </GridItem>
                </GridContainer>
                <div id="nav-tabs">
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomTabs
                                headerColor="primary"
                                tabs={
                                    allgenre.map((genre,i)=>({
                                        tabName: genre.name,
                                        tabContent: <div>
                                               <GridContainer style={{padding: "25px"}}>
                                                    {genre.genrefilms.slice((page[i]*onpage)-onpage,
                                                     page[i]*onpage>genre.genrefilms.lenght? genre.genrefilms.lenght:page[i]*onpage)
                                                    .map(genrefilm => {
                                                    return (
                                                        /* When using list you need to specify a key
                                                        * attribute that is unique for each list item
                                                        */
                                                        <GridItem item xs={12} sm={6} md={4} lg={3} key={genrefilm.film.id} >
                                                            {genrefilm.film.name } 
                                                            <FilmCard film={genrefilm.film}/> 
                                                        </GridItem>
                                                        
                                                    );})}
                                                </GridContainer> 
                                                <div style={{textAlign:"center"}}>
                                                <Paginations
                                                    pages=
                                                    {
                                                        Array.from(Array(pages[i]), (e, j) => ({
                                                            text:(j+1), 
                                                            active:(page[i]===j+1),
                                                            onClick: ()=>{
                                                                let newArr = [...page];
                                                                newArr[i] = j+1;
                                                                setpage(newArr);}
                                                        })
                                                        )
                                                    }
                                                    color="info"
                                                    />
                                                </div>
                                        </div>
                                    }))
                                }
                            />
                        </GridItem>
                    </GridContainer>
                </div>

            </AppProvider>
        </div>

    );

};