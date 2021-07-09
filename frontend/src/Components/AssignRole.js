import ShowUsers from './ShowUsers'
import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'

import FormControl from '@material-ui/core/FormControl';
import { List, ListItem } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select/'
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Typography } from '@material-ui/core';
import { Paper, TableBody, TableContainer, Table, TableHead, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'


function AssignRole(){
    const [ subs, setSubs ] = useState([])
    const [ lists, setLists ] = useState([])
    const [ current, setCurrent ] = useState([])
    const [ assigned, setAssigned ] = useState([])
    const [ supervisors, setSupervisors ] = useState([])
    const [ user, setUser] = useState('')
    const [ role, setRole ] = useState('')

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
        lilMargin: {
            margin: 5,
            color:"#FFFFFF"
        },
        formControl:{
            maxWidth: 30
        }
      });

    const classes = useStyles();

    useEffect(() =>{
        async function fetchLists(){
            await fetch(`http://localhost:3001/checklistsAsSupervisor?user_id=${Cookies.get('userId')}`)
            .then(res => res.json())
            .then(json => setLists([...json]))
        }
        fetchLists()
    }, [])

    useEffect(() =>{
        async function fetchSubs(){
            await fetch(`http://localhost:3001/user`)
            .then(res => res.json())
            .then(json => setSubs([...json]))
        }
        fetchSubs()
    }, [])

    async function groupHandler(e){
        e.preventDefault()
        console.log('groupHandler e value:', e)
        let requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                checklist: current,//e.target.form.selectList.value,
                user: user,
                role: role
            })
        }
           await fetch('http://localhost:3001/assignUser', requestOptions)  
    }


    //GET USERS
    async function getUsers(checklist_id){
        await fetch(`http://localhost:3001/checklistUsers?checklist_id=${checklist_id}`)
        .then(res => res.json())
        .then(json => setAssigned([...json]))   
    }
    useEffect(() =>{
        getUsers()
    }, [])

    //GET SUPERVISORS
    async function getSupervisors(checklist_id){
        await fetch(`http://localhost:3001/checklistSupervisors?checklist_id=${checklist_id}`)
        .then(res => res.json())
        .then(json => setSupervisors([...json]))
    }
    useEffect(() =>{
        getSupervisors()
    }, [])

    // checklist_id, user_id        http://localhost:3001/removeUser http://localhost:3001/removeSupervisor

    const deleteHandler = e =>{
        let requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                checklist_id: current, 
                user_id: e.target.value
            })
        }
            fetch('http://localhost:3001/removeUser', requestOptions)  
    }

    const archiveHandler = e =>{
        let requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                checklist_id: current, 
            })
        }
            fetch('http://localhost:3001/archive', requestOptions)  
    }

    function handleList(e){
        setCurrent(e.target.value)
        getUsers(e.target.value)
        getSupervisors(e.target.value)
    }

    function handleUser(e){
        setUser(e.target.value)
    }

    function handleRole(e){
        setRole(e.target.value)
    }

    return(
        <Grid container spacing={5} justifyContent="center">
        <Grid item>
            <br/>
            <form id="assignForm" className="assignForm" onSubmit={groupHandler} >
                <FormControl  style={{minWidth: 120, maxWidth:120}}>
                    <InputLabel>Checklist</InputLabel>
                        <Select id="selectList" className="selectList" onClick={handleList}>
                            {lists.map(list =>{
                                return(
                                    <MenuItem value={list.id}>{list.title}</MenuItem>
                                    ) 
                                })} 
                        </Select>
                </FormControl>           
                    <br/>
                <FormControl style={{minWidth: 120}}>
                    <InputLabel>User to add</InputLabel>
                    <Select id="selectSub" className="selectSub" onClick={handleUser}>
                            {subs.map(sub =>{
                                return(
                                    <MenuItem value={sub.id}>{sub.username}</MenuItem>
                                    )
                                })}
                    </Select>  
                </FormControl>
                    <br/>

                <FormControl>
                    {/* <FormLabel component="legend">Role</FormLabel> */}
                        <RadioGroup id="selectRole" className="selectRole">
                            <FormControlLabel value="user" label="User" control={<Radio />} onClick={handleRole}/>
                            <FormControlLabel value="supervisor" label="Supervisor" control={<Radio />} onClick={handleRole}/>
                        </RadioGroup>
                </FormControl>
            <br/>
                <Button className={classes.lilMargin} variant="contained" color="primary" type="submit" onClick={groupHandler}>Add to group</Button>
            </form>
            <br/>
        </Grid>
        <Grid item >
        <br/>
        <Typography >Current supervisors:</Typography>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="current-supervisors">
                <TableHead>
                    <TableRow>
                        <TableCell>Supervisor</TableCell>
                        <TableCell>Remove Supervisor</TableCell>
                    </TableRow>
                </TableHead>
                {supervisors.map(supervisor =>{
                    return(            
                        <TableBody>
                            <TableRow key={supervisor.id}>
                                <TableCell>{supervisor.username}</TableCell>
                                <TableCell><button id={supervisor.id} value={supervisor.id} className="del" onClick={deleteHandler}>❌</button></TableCell>
                            </TableRow>
                        </TableBody>  
                    )
                })}
            </Table>
        </TableContainer>
        <br/>
        <Typography >Current Users:</Typography>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="current-users">
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Remove user</TableCell>
                    </TableRow>
                </TableHead>
                {assigned.map(user =>{
                    return(
                        <TableBody>
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell><button id={user.id} value={user.id} className="del" onClick={deleteHandler}>❌</button></TableCell>
                            </TableRow>
                        </TableBody>  
                    )
                })}
            </Table>
        </ TableContainer>
        <Button className={classes.lilMargin} variant="contained" color="secondary" type="submit" onClick={archiveHandler}>Archive</Button>
        </Grid>
    </Grid>
    )
}

export default AssignRole