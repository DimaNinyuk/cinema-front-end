import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from 'components/Admin/Buyings/Row.js';

export default function Buyings() {

    const [allbuyings, setAllBuyings] = useState([]);
    useEffect(() => {
      axios.defaults.withCredentials = true;
      axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
          (response) => {
              axios
                  .get("http://localhost:8000/api/admin-buyings")
                  .then(
                      (response) => {
                          setAllBuyings(response.data);
                      },
                  );
          })
  }, []);
  return allbuyings?(
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>#</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allbuyings.map((buying,i) => (
            <Row key={i} buying={buying}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ):<div>Loading...</div>;
}