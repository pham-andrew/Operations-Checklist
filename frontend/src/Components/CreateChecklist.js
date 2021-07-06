import {useEffect, useState} from 'react'

function CreateChecklist(){
    let [Checklist, setChecklist] = useState([])
    let [ListTitle, setTitle] = useState('Checklist Preview')
    let [formattedChecklist, setFormattedChecklist] = useState([])

    const addStep = (e) =>{
        e.preventDefault()
        setChecklist([...Checklist, {todo: e.target.form.item.value}])
        //console.log(Checklist)

        //formatHelper();
    }

    const titleHandler = (e) =>{
        e.preventDefault();
        setTitle(e.target.form.title.value)
    }
    
    const orderHelper = () =>{
        let tempArray = Checklist.map((element, index) =>({ order: index, ...element}))
        setChecklist([...tempArray])
        console.log(Checklist)
    }

    const inc = (e) =>{
        let temp = Checklist[e.target.id]
        let index = e.target.id
        let tempArray = Checklist
        tempArray.splice(index, 1)
        tempArray.splice((index-1), 0, temp)
        console.log(tempArray)
        setChecklist([...tempArray])
    }

    const dec = (e) =>{
        let temp = Checklist[e.target.id]
        let index = e.target.id
        let tempArray = Checklist
        tempArray.splice(index, 1)
        tempArray.splice((index+1), 0, temp)
        console.log(tempArray)
        setChecklist([...tempArray])
        index = 0 
    }

    const submitHandler = e =>{
        e.preventDefault()
        orderHelper()
        let requestOptions ={
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                author: 'admin',
                title: ListTitle,
                todos: Checklist
            })
        }
        fetch('http://localhost:3001/checklists', requestOptions)
        console.log(requestOptions)        
    }

    return(
        <>
            <h1>Create Checklist</h1>
            <form onSubmit={submitHandler}>
                <input type="text" id="title" onSubmit={titleHandler}/>
                <button onClick={titleHandler}>Set Title</button>
                <br/>
                <input type="text" id="item" />
                <button onClick={addStep}>Add Step</button>
                <br/>
                <button type="submit" onClick={submitHandler}>Post List</button>
            </form>
            <div>
                <h2>{ListTitle}</h2>
                {Checklist.map((item, index) =>{
                   return(
                        <div id={index}>
                            Step {index+1}:
                            {item.todo}
                            <button id={index} onClick={inc}>^</button>
                            <button id={index} onClick={dec}>V</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default CreateChecklist