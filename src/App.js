import React, { useState } from 'react';
import './App.css';
// import { useForm } from "react-hook-form";
// import Tasks from './Components/Tasks';

const App = () =>{
    // const { reset } = useForm()
    // const [noAddedTask, addingTask] = useState(false)
    const [task, setTask] = useState('')
    const [taskList, setTaskList] = useState([])
    const [togglePopUp, setToggle] = useState(false)
    // const [completedList, setCompletedList] = useState([])
    let temp=task;
    const inputTask=(e)=>{
        e.preventDefault();
        temp=e.target.value;
        setTask(temp);
    }
    const addTask=(e)=>{
        e.preventDefault();
        if (temp !== ""){
            const taskDetails ={
                id: Math.floor(Math.random()*1000),
                value: temp,
                isCompleted: false,
                // toEdit: false
            }
        // task = ''
        setTaskList([...taskList, taskDetails])
        temp="";
        }
    }
    const toggleHandler=()=>{
        setToggle(!togglePopUp);
    }

    const deleteTask=(e, id)=>{
        e.preventDefault(); //prevents default action
        setTaskList(taskList.filter((t) => t.id !==id)); //filtering out the id we want to remove from the list and rewriting the list
    }
    const completedTask=(e,id)=>{
        e.preventDefault();
        const idOfCompleted = taskList.findIndex((x)=> x.id===id) //finding the completed task using task id
        const newTaskList= [...taskList] 
        newTaskList[idOfCompleted] ={
            ...newTaskList[idOfCompleted],
            isCompleted: true,  //updating isCompleted attribute
        } 
        setTaskList(newTaskList);
    }
    // const completedTask=(e,id)=>{
    //     e.preventDefault();
    //     const idOfCompleted = taskList.findIndex((x)=> x.id===id); //finding the completed task using task id
    //     //adding the task to completedTask list
    //     const tempCompleted = taskList[idOfCompleted];
    //     console.log(tempCompleted.value)
    //     console.log(tempCompleted.id)
    //     console.log(tempCompleted.isCompleted)
    //     console.log(tempCompleted)
    //     const taskDetails1={
    //         id: tempCompleted.id,
    //         value: tempCompleted.value,
    //         isCompleted: !tempCompleted.isCompleted,
    //     }
    //     setCompletedList([...completedList, taskDetails1])
    //     console.log(completed.id)
        //remove the task from original taskList
        // setTaskList(taskList.filter((t) => t.id !==id));
    //}
    const incompleteTask=(e,id)=>{
        e.preventDefault();
        const idOfCompleted = taskList.findIndex((x)=> x.id===id) //finding the completed task using task id
        //re-adding the task to original taskList
        const newTaskList= [...taskList] 
        newTaskList[idOfCompleted] ={
            ...newTaskList[idOfCompleted],
            isCompleted: false,  //updating isCompleted attribute
        } 
        setTaskList(newTaskList);
        //removing the task from completedTaskList
        //setCompleted(completed.filter((t)=> t.id !==id))
    }
    const submitEdittedTask=(e,id)=>{
        e.preventDefault();
        const idOfCompleted = taskList.findIndex((x)=> x.id===id)
        const newTaskList= [...taskList]
        newTaskList[idOfCompleted] = {
            ...newTaskList[idOfCompleted],
            value: e.target.value
        }
        setTaskList(newTaskList)
    }
    return(
        <div>
            <div className='header'>
                <p>To-Do App</p>
            </div>
            <div className="container">
                <div className='add-task'>
                    <p>Tasks</p>
                    {/* <div className={noAddedTask ? "clickable": "fa fa-plus"}> */}
                    {/* <button className= 'fa fa-plus' onClick={()=> addingTask(true)}></button> */}
                    <input className='input-task'
                        type='text' 
                        placeholder='Add a text here'
                        value={temp}
                        onChange={(e) => inputTask(e)}
                        //onChange={(e) => setTask(e.target.value)}
                        onKeyPress={(event)=>{
                            if (event.key === 'Enter'){
                                addTask(event)}
                            }
                            }>
                    </input>
                    <input type="button" className='addbtn' value='Add' onClick={addTask}></input>
                    {/* <button className='addbtn' onClick={e=> addTask(e)}>Add</button> */}
                    {/* <input type="checkbox" className="clickable"></input> */}
                </div>
                    {/* <button className=' fa fa-plus' onClick={() => addingTask(true)}></button> */}
                    {/* { noAddedTask ?  */}
                <div className='tasks-list'>
                    {taskList !== [] ? ( //[0: 'a' , 1: 'b']
                        <ul>        
                        {/* every child element must have a key value. in this case div can be assigned a key|| use index as a last resort. here we have an id assigned to each task so using t.id as key*/}
                            {taskList.map((t) =>(
                                <div className='task-list-container' key={t.id}>
                                    {t.isCompleted ?
                                    <li>
                                    <div className="cross-text" key={t.id}>
                                    <input key={t.id} type="checkbox" className="task-incomlete" defaultChecked onClick={e => incompleteTask(e, t.id)}></input>
                                    {t.value}
                                    <i className="fa fa-trash" onClick={e => deleteTask(e, t.id)}></i>
                                {/* <button className="task-comlete" onClick={e => incompleteTask(e, t.id)}>Restore</button> */}
                                    </div>
                                    </li>
                                    :
                                    <div className="list-item" key={t.id}>
                                    <li>
                                    <input type="checkbox" className="task-comlete" onClick={e => completedTask(e, t.id)}></input>
                                    {t.value}
                                    <button className='edit-task' onClick={toggleHandler}>Edit</button>
                                    {/* <i onClick={e => editTask(e,t.id)}>{t.value}</i> */}
                                    {/* {t.toEdit && togglePopUp ?  */}
                                    { togglePopUp ?
                                    <div className='popup-box'>
                                        <div className='box'>
                                        <span className='close-icon' onClick={toggleHandler}>X</span>
                                        Edit here!
                                        <br></br>
                                        <input type="text" className="input-edit" 
                                        value={t.value} 
                                        autoFocus
                                        onChange={e => submitEdittedTask(e, t.id)}
                                        onKeyPress={e =>{
                                            if(e.key === 'Enter') {
                                                toggleHandler()}}}>
                                        </input>
                                        <button className='submit' onClick={toggleHandler}>Submit</button>
                                        </div>
                                    </div>
                                    : null}
                                    <i className="fa fa-trash" onClick={e => deleteTask(e, t.id)}></i>
                                    </li>
                                    </div>
                                    }
                                </div>
                            ))}
                        </ul>)
                    : null}
                </div>
        {/* :null} */}
        </div>
    </div>
)
}


export default App;