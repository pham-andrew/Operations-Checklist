import {useState, useEffect} from 'react'
import { List, ListItem } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import React from 'react';
import Cookies from 'js-cookie'

function GetTodos(key){
    const [Todos, setTodos] = useState([])
    const [id, setId] = useState([])
    
    useEffect(() =>{
        async function fetchTodos(){
    
            let ourId = window.location.pathname.split('/')
            ourId = ourId[2]
            console.log(ourId)
            await fetch(`http://localhost:3001/todos_list/${ourId}`)
            .then(res => res.json())
            .then(json => setTodos([...json]))
        }
        fetchTodos()
    }, [])
    
    const [checked, setChecked] = React.useState(false); //for later...

    console.log('checkid',key.checklistID)
    return(
        <>
            <List>
                {Todos.map(todo => {
                    return(
                        <Grid>
                            <FormControlLabel 
                            control={
                                <Checkbox/>
                            } 
                            label={todo.todo}/>
                        </Grid>
                    )
                })}
            </List>
            <Button 
            variant="contained" 
            color="primary" 
            onClick={()=>{
                fetch('http://localhost:3001/completeChecklist', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        checklistId: key.checklistID,
                        userId: Cookies.get('userId')
                    })
                })
                document.location.href="/";
            }
            }>
                Mark as Complete
            </Button>
        </>
    )
}

export default GetTodos;