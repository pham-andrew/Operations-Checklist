import {useEffect, useState} from 'react'

function CreateChecklist(){
    let [checkList, setChecklist] = useState([])
    let [ListTitle, setTitle] = useState('Checklist Preview')
    let [formattedChecklist, setFormattedChecklist] = useState([])

    const addStep = (e) =>{
        e.preventDefault()
        setChecklist([...checkList, {todo: e.target.form.item.value}])
        console.log('from addstep',checkList)
        //formatHelper();
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
                author: 'admin',
                title: ListTitle,
                todos: checkListToPost
            })
        }
        await fetch('http://localhost:3001/checklists', requestOptions)
        console.log(requestOptions.body)        
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
                {checkList.map((item, index) =>{
                   return(
                        <div id={index}>
                            Step {index+1}:
                            {item.todo}
                            <button id={index} onClick={inc}>⬆️</button>
                            <button id={index} onClick={dec}>⬇️</button>
                            <button id={index} onClick={del}>❌</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default CreateChecklist