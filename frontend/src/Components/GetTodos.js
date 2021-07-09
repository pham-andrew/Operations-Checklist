import {useState, useEffect, useRef} from 'react'
import { List, ListItem } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import React from 'react';
import Cookies from 'js-cookie'
import Collapse from '@material-ui/core/Collapse';
import { Typography } from '@material-ui/core';

function GetTodos(key){
    const styles = {
        button:{
            margin: "8px",
            color: "#FFFFFF",
            width: "50%"
        }
    }

    const [Todos, setTodos] = useState([])
    const [id, setId] = useState([])
    const [checked, setChecked] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const countRef = useRef(count)
    const [show, setShow] = React.useState(false);
    
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
    }, [count])


    const handleChange = (event) => {
        let currentCount
        if(event.target.checked){
            currentCount = count + 1
            setCount(currentCount)
        }
        else {
            currentCount = count - 1
            setCount(currentCount)
        }
        if(currentCount === Todos.length)
            setShow(true)
        else
            setShow(false)
        console.log(event.target.checked)
        console.log(currentCount)
    }

    // const handleChange = (event) => {
    //     let checked = event.target.checked
    //     if(checked)
    //         setCount(count + 1, handleShow())
    //     else
    //         setCount(count - 1, handleShow())

    //     console.log('line 39, handle change checked',checked)
    //     console.log('line 40, handle change count',count)

    // };

    // const handleShow = () => {
    //     console.log('handleShowed called with count:', count)
    //     if(countRef === Todos.length)
    //         setShow(true)
    //     else
    //         setShow(false)
    // }

    /*
         setCount(old => count++);
        }); 

    */

    //console.log('checkid',key.checklistID)
    return(
        <>
            <List>
                {Todos.map(todo => {
                    return(
                        <Grid>
                            <FormControlLabel 
                            control={
                                <Checkbox onChange={handleChange}/>
                            } 
                            label={todo.todo}/>
                        </Grid>
                    )
                })}
            </List>
            <Collapse in={show}>
                <Button
                style={styles.button}
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
            </Collapse>
        </>
    )
}

export default GetTodos;