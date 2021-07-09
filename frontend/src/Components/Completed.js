import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Completed2 from './Completed2'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

function Completed(){
    const [complete, setComplete] = useState([])
    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

    // /completed  ?=user_id   <--- Cookies.get('user_id')
    async function getCompleted(){
        await fetch(`http://localhost:3001/completed?user_id=12`)
        .then(res => res.json())
        .then(json => setComplete([...json]))
    }

    const classes = useStyles();

    useEffect(() =>{
        getCompleted()
    }, [])


    // {
    //     "user_id": 16,
    //     "checklist_id": 18,
    //     "date_completed": "2021-07-09T02:26:59.078Z"
    // },
    return(
        <Grid container spacing={5} justifyContent="center">
        <Grid item>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="completed checklists">
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Checklist</TableCell>
                                <TableCell>Date Completed</TableCell>
                            </TableRow>
                        </TableHead>
            {complete.map(list =>{
                return(
                            <TableBody>
                                <Completed2 user_id={list.user_id} checklist_id={list.checklist_id} completed={list.date_completed}/>
                            </TableBody>
                )
            })}
            </Table>
        </ TableContainer>
        </Grid></Grid>
    )
}

export default Completed;