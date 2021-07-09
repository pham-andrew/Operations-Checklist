import Cookies from 'js-cookie'
import {useEffect, useState} from 'react'
import { List, ListItem, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

function CreateChecklist(){
    let [checkList, setChecklist] = useState([])
    let [ListTitle, setTitle] = useState('Checklist Preview')
    let [formattedChecklist, setFormattedChecklist] = useState([])
    

    const useStyles = makeStyles({
        root: {
          width: '100%',
          maxWidth: 500,
          display: 'inline-flex'
        },
        typo: {
          alignSelf: 'center'
        }
      });
    const classes = useStyles();

    const addStep = (e) =>{
        e.preventDefault()
        setChecklist([...checkList, {todo: e.target.form.item.value}])
    }

    const titleHandler = (e) =>{
        e.preventDefault();
        setTitle(e.target.form.title.value)
    }
    
    const orderChecklist=()=>{
        let tempArray = checkList
        tempArray = checkList.map((element, index) =>({ order: index, ...element}))
        setChecklist(tempArray)
        return tempArray
    }

    const inc = (e) =>{
        let temp = checkList[e.target.id]
        let index = e.target.id
        let tempArray = checkList
        tempArray.splice(index, 1)
        tempArray.splice((index-1), 0, temp)
        console.log(tempArray)
        setChecklist([...tempArray])
    }

    const dec = (e) =>{
        let temp = checkList[e.target.id]
        let index = e.target.id
        let tempArray = checkList
        tempArray.splice(index, 1)
        tempArray.splice((index+1), 0, temp)
        console.log(tempArray)
        setChecklist([...tempArray])
        index = 0 
    }

    const del = (e) =>{
        let temp = checkList[e.target.id]
        let index = e.target.id
        let tempArray = checkList
        tempArray.splice(index, 1)
        setChecklist([...tempArray])
        index = 0 
    }

    async function submitHandler(e){
        e.preventDefault()
        let checkListToPost = orderChecklist()
        console.log('checkList',checkListToPost)
        let requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                author: Cookies.get('username'),
                title: ListTitle,
                todos: checkListToPost,
                user_id: Cookies.get('userId')
            })
        }
        await fetch('http://localhost:3001/checklists', requestOptions)
        console.log(requestOptions.body)        
    }

    return(
        <Grid container spacing={12} justifyContent="space-around">
        <Grid item>
            <Typography variant="h6" color="inherit" className={classes.typo}>Create Checklist</Typography>
            <form className="form" onSubmit={submitHandler}>
                <input type="text" id="title" onSubmit={titleHandler}/>
                <button className="setTitle" onClick={titleHandler}>Set Title</button>
                <br/>
                <input type="text" className="item" id="item" />
                <button className="addStep" onClick={addStep}>Add Step</button>
                <br/>
                <button className="submit" type="submit" onClick={submitHandler}>Post List</button>
            </form>

            <div>
                <Typography variant="h6" color="inherit" className={classes.typo}>{ListTitle}</Typography>
                <List>
                {checkList.map((item, index) =>{
                   return(
                        <div id={index}>
                            <ListItem>

                        
                            Step {index+1}:
                            {item.todo}
                            <button id={index} className='inc' onClick={inc}>⬆️</button>
                            <button id={index} className="dec" onClick={dec}>⬇️</button>
                            <button id={index} className="del" onClick={del}>❌</button>
                            </ListItem>
                        </div>

                        
                    )
                })}
                </List>
            </div>
        </Grid></Grid>
    )
}

export default CreateChecklist