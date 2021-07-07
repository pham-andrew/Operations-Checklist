import {useEffect, useState} from 'react'

function View(){
    const [Checklist, setChecklist] = useState([])
    useEffect(() =>{
     async function fetchData(){
        await fetch('http://localhost:3001/checklists')
        .then(res => res.json())
        .then(json => setChecklist(json))
    }
     fetchData()
 }, [])

 function viewHandler(e){
    window.location.href=`/checklist/${e.target.id}`
 }

 return(
     <div>
         {Checklist.map(element =>{
             return(
        <div id={element.id} onClick={viewHandler}>
            <h1 id={element.id}>Title: {element.title}</h1>
            <p id={element.id}>Author: {element.author}</p>
        </div>)
     })}
     </div>
 )
}

export default View;