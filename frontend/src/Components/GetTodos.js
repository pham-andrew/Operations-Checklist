import {useState, useEffect} from 'react'

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
    

    console.log('checkid',key.checklistID)
    return(
        <>
            {Todos.map(todo => {
                return(
                    <li>Item {todo.todo}</li>
                )
            })}
        </>
    )
}

export default GetTodos;