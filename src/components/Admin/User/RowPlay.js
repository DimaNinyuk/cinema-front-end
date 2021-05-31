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
import Send from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
        '& .MuiButton-contained': {
            marginRight: '5%',
        },
    },
});

export default function Row({ buying }) {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const [currentBuying, setcurrentBuying] = useState({ ...buying });
    useEffect(() => {
        setcurrentBuying(buying);
    }, [buying])
    return currentBuying ?
        (
            <React.Fragment>
                <TableRow className={classes.root}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {buying.id}
                    </TableCell>
                    <TableCell align="right">{buying.session.date}</TableCell>
                    <TableCell align="right">{buying.session.time}</TableCell>
                    <TableCell align="right">{buying.session.film.name}</TableCell>
                    <TableCell align="right">
                        <form action={"http://localhost:8000/api/downloadPDF/" + buying.id}>
                            
                            <Button
                            type="submit"
                            download
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<Send />}
                        >
                            Download PDF
                        </Button>
                        </form>
                        
                    </TableCell>
                    <TableCell align="right">Send PDF</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Seats ticket
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>Hall</TableCell>
                                            <TableCell>Row</TableCell>
                                            <TableCell>Seat</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            buying.buyingseats.map((buyingseat, i) => (
                                                <TableRow key={i}>
                                                    <TableCell>{buyingseat.id}</TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {buyingseat.seat.row.hall.type.name}
                                                    </TableCell>
                                                    <TableCell>{buyingseat.seat.row.hall.name}</TableCell>
                                                    <TableCell>{buyingseat.seat.row.number}</TableCell>
                                                    <TableCell>{buyingseat.seat.number}</TableCell>
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
