import {useState, useEffect} from 'react'
import GetTodos from './GetTodos'

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
        <>
            <h1>{Checklist.title}</h1>
            <p>By {Checklist.author}</p>
            <GetTodos checklistID={Checklist.id} />
        </>
    )
}

export default Checklist;