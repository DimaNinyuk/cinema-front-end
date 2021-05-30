import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from 'components/Admin/Reviews/Row.js';
export default function Reviews() {
    
    const [allfilms, setAllFilms] = useState([]);
    useEffect(() => {
      axios.defaults.withCredentials = true;
      axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
          (response) => {
              axios
                  .get("http://localhost:8000/api/admin-films")
                  .then(
                      (response) => {
                        setAllFilms(response.data);
                      },
                  );
          })
  }, []);
  function handleDeleteReview(review) {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
        (response) => {
            axios.delete("http://localhost:8000/api/admin-reviews/" + review.id, review).then(
                (response) => {
                    axios
                  .get("http://localhost:8000/api/admin-films")
                  .then(
                      (response) => {
                        setAllFilms(response.data);
                      },
                  );
                },
            )
        })
}
  return allfilms?(
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>#</TableCell>
            <TableCell align="right">Release date</TableCell>
            <TableCell align="right">Film</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allfilms.map((film,i) => (
            <Row key={i} film={film} onDelete={handleDeleteReview}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ):<div>Loading...</div>;

};
