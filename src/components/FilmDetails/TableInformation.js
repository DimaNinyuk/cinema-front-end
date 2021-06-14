import React,{useState, useEffect} from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Information ({film}) {  
    const classes = useStyles();
    const [currentFilm, setcurrentFilm] = useState({ ...film });
    //метод, который вызывается первый при загрузки страницы, здесь заполняем страницу детальными данными о фильме
    useEffect(() => {
        setcurrentFilm(film);
    }, [film])
    return (
      <div>
    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="caption table">
        <TableBody>
            <TableRow>
              <TableCell style={{backgroundColor:"black", color:"white", width:"10%"}}align="left">Full Name:</TableCell>
              <TableCell style={{backgroundColor:"#202020", color:"white"}}component="th" scope="row">
                {currentFilm.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{backgroundColor:"black", color:"white"}}align="left">Duration:</TableCell>
              <TableCell style={{backgroundColor:"#D8D8D8", color:"black"}}component="th" scope="row">
                {currentFilm.duration}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{backgroundColor:"black", color:"white"}}align="left">Description:</TableCell>
              <TableCell style={{backgroundColor:"#303030", color:"white"}}component="th" scope="row">
                {currentFilm.description}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{backgroundColor:"black", color:"white"}}align="left">Genres:</TableCell>
              <TableCell style={{backgroundColor:"#D8D8D8", color:"white"}}component="th" scope="row">
                {currentFilm.genrefilms?(currentFilm.genrefilms.map((genre,i)=>{
                    return genre.genre.name+((i+1)<currentFilm.genrefilms.length?", ":".");
                })
                ):(<div className={classes.root}>
                    <LinearProgress />
                    <LinearProgress color="secondary" />
                  </div>)
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{backgroundColor:"black", color:"white"}}align="left">Actors:</TableCell>
              <TableCell style={{backgroundColor:"#303030", color:"white"}}component="th" scope="row">
                 {currentFilm.actorfilms?(currentFilm.actorfilms.map((actor,i)=>{
                    return actor.actor.name+((i+1)<currentFilm.actorfilms.length?", ":".");
                })
                ):(<div className={classes.root}>
                    <LinearProgress />
                    <LinearProgress color="secondary" />
                  </div>)
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{backgroundColor:"black", color:"white"}}align="left">Producer:</TableCell>
              <TableCell style={{backgroundColor:"#303030", color:"black"}}component="th" scope="row">
                 {currentFilm.producerfilms?(currentFilm.producerfilms.map((producer,i)=>{
                    return producer.producer.name+((i+1)<currentFilm.producerfilms.length?", ":".");
                })
                ):(<div className={classes.root}>
                    <LinearProgress />
                    <LinearProgress color="secondary" />
                  </div>)
                }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{backgroundColor:"black", color:"white"}}align="left">Company:</TableCell>
              <TableCell style={{backgroundColor:"#303030", color:"white"}}component="th" scope="row">
                {currentFilm.company?currentFilm.company.name:<div>-</div>}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{backgroundColor:"black", color:"white"}}align="left">Release Date:</TableCell>
              <TableCell style={{backgroundColor:"#303030", color:"white"}}component="th" scope="row">
                {currentFilm.release_date}
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    );
  };
  
  