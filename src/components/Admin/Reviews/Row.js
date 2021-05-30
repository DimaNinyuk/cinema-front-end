import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { post } from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

export default function Row({ film }) {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const [currentfilm, setcurrentFilm] = useState({ ...film });
    useEffect(() => {
        setcurrentFilm(film);
    }, [film])

    return currentfilm ?
        (
            <React.Fragment>
                <TableRow className={classes.root}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {film.id}
                    </TableCell>
                    <TableCell align="right">{film.release_date}</TableCell>
                    <TableCell align="right">{film.name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Reviews
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Comment</TableCell>
                                            <TableCell>Reviewer</TableCell>
                                            <TableCell>Comment</TableCell>
                                            <TableCell align="right">Change</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            film.reviews.map((review, i) => (
                                                <TableRow key={i}>
                                                    <TableCell component="th" scope="row">
                                                        {review.date}
                                                    </TableCell>
                                                    <TableCell>{review.name}</TableCell>
                                                    <TableCell>{review.comment}</TableCell>
                                                    <TableCell align="right">Button</TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        )
        : (<div><p>Loading...</p></div>);

};
