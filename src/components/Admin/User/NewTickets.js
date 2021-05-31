import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "contexts/AppContext";

import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from './Row.js';
export default function NewTickets() {

    const [allByuingUser, setAllBuyingUser] = useState(false);
    const appContext = useContext(AppContext);
    const [rerender, setrerender] = useState(true);
    const { getprofile, authStatus, host, userName, userId } = appContext;
    useEffect(() => {
        getprofile();



    }, []);

    if (userId !== 0 && allByuingUser === false) {
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
            (response) => {
                axios
                    .get("http://localhost:8000/api/user-buyings/" + userId)
                    .then(
                        (response) => {
                            console.log(userId)
                            console.log(response.data);
                            setAllBuyingUser(response.data);
                        },
                    );
            });
    }

    function toPDF(id) {
        return 1;
    }
    if (allByuingUser === false)
        return (
            <div>Loading...</div>
        );
    else return (
        <TableContainer component={Paper}>
            <br />
            <br />
            <label>History buy tickets</label>
            <hr />
            <br />
            <br />
          
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>#</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Time</TableCell>
                        <TableCell align="right">Film</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allByuingUser.map((buying, i) => (
                        <Row key={i} buying={buying} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
      
    )

};
