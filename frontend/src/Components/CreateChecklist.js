import {useEffect, useState} from 'react'

function CreateChecklist(){
    let [Checklist, setChecklist] = useState([])
    let [ListTitle, setTitle] = useState('Checklist Preview')
    let [formattedChecklist, setFormattedChecklist] = useState([])

    const addStep = (e) =>{
        e.preventDefault()
        setChecklist([...Checklist, {todo: e.target.form.item.value, order: Checklist.length+1}])
        console.log(Checklist)

        //formatHelper();
    }

    const titleHandler = (e) =>{
        e.preventDefault();
        setTitle(e.target.form.title.value)
    }
    
    const formatHelper = () =>{
        setFormattedChecklist(Checklist.map(e => {
            <div>
                {e.todo}
            </div>
        }))
    }

    const inc = (e) =>{
        console.log(Checklist[e.target.id])
        // TODO splice the above, and insert before like -1 -1
    }

    const dec = (e) =>{
        console.log(Checklist[e.target.id])
        // TODO splice the above, and insert before like -1 -1
    }

    return(
        <>
            <h1>Create Checklist</h1>
            <div>
                <h2>{ListTitle}</h2>
                {Checklist.map((item, index) =>{
                   return(
                        <div id={index}>
                            Step {item.order}
                            {item.todo}
                            <button id={index} onClick={inc}>^</button>
                            <button id={index} onClick={dec}>V</button>
                        </div>
                    )
                })}
            </div>
            <form>
                <input type="text" id="title" onSubmit={titleHandler}/>
                <button onClick={titleHandler}>Set Title</button>

                <br/>
                <input type="text" id="item" />
                <button onClick={addStep}>Add Step</button>
                <br/>
                <button type="submit">Post List</button>
            </form>
        </>
    )
}

export default CreateChecklist