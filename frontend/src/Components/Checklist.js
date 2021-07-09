import {useState, useEffect} from 'react'
import GetTodos from './GetTodos'
import React from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Checklist(){
    const [Checklist, setChecklist] = useState({})
    
    useEffect(() =>{
        async function fetchChecklist(){
            //window.location.href
            await fetch(`http://localhost:3001${window.location.pathname}`)
            .then(res => res.json())
            .then(json => setChecklist({...json[0]}))
        }
        fetchChecklist()
    }, [])

    return(
        <Grid className="list-container" container spacing={2}>
            <Grid item>
                <Typography variant="h4" >
                    {Checklist.title}
                </Typography>
                <Typography variant="h6" >
                    {Checklist.author}
                </Typography>
                <div >
                    <List>
                        <GetTodos checklistID={Checklist.id} />
                    </List>
                </div>
            </Grid>




        </Grid>
    )
}

export default Checklist;