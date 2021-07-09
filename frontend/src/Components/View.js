import {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Grid } from '@material-ui/core'
import Cookies from 'js-cookie'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      margin: 10,
      padding: 10
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    card: {
        margin:10,
        padding:10
    },
  });

function View(){
    const classes = useStyles();
    const [Checklist, setChecklist] = useState([])
    useEffect(() =>{
     async function fetchData(){
        await fetch(`http://localhost:3001/checklistsAsUser?user_id=${Cookies.get('userId')}`)
        .then(res => res.json())
        .then(json => setChecklist(json))
    }
     fetchData()
 }, [])

 function viewHandler(e){
    window.location.href=`/checklist/${e.target.id}`
 }

 return(
  <Grid container spacing={12} justifyContent="space-around">
  <Grid item>
       <Typography>Your Checklists:</Typography>
         {Checklist.map(element =>{
             return(
        <Card variant="outlined" className={classes.card} id={element.id} onClick={viewHandler}>
            <Typography id={element.id} className={classes.title} color="textSecondary" gutterBottom>
                {element.title}
            </Typography>
            <Typography variant="body2" component="p" id={element.id}>
                Author: {element.author}
            </Typography>
        </Card>)
     })}
     </Grid></Grid>
 )
}

export default View;