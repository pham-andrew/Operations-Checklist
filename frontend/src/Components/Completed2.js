import {useState, useEffect} from 'react'
import { TableRow, TableCell } from '@material-ui/core'

function Completed2({user_id, checklist_id, completed}){
    let [user, setUser] = useState('')
    let [checklist, setList] = useState('')

    //USER      /username?user_id=
    useEffect(()=>{
        async function getUser(){
            await fetch(`http://localhost:3001/username?user_id=${user_id}`)
            .then(res => res.json())
            .then(json => setUser([...json[0].username]))
        }
        getUser()
    }, ['anything1'])

    //LIST      /checklistName?checklist_id=
    useEffect(()=>{
        async function getList(){
            await fetch(`http://localhost:3001/checklistName?checklist_id=${checklist_id}`)
            .then(res => res.json())
            .then(json => setList([...json[0].title]))
        }
        getList()
    }, ['something2'])

    console.log("User", user)
    console.log("checklist", checklist)

    return(
        <TableRow key={user_id}>
            <TableCell>{user}</TableCell>
            <TableCell>{checklist}</TableCell>
            <TableCell>{completed}</TableCell>
        </TableRow>
    )
}

export default Completed2;