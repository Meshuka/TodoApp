import React, { useState } from 'react';
import './App.css';
// import Tasks from './Components/Tasks';

const App = () =>{
    const [task, setTask] = useState('')
    const [taskList, setTaskList] = useState([])
    const [togglePopUp, setToggle] = useState(false)
    const [toggleShowCompleted, setToggleShowCompleted]= useState(false)
    const [completedList, setCompletedList] = useState([])
    const addTask=(e)=>{
        e.preventDefault();
        console.log(task)
        if (task !== ""){
            const taskDetails ={
                id: Math.floor(Math.random()*1000),
                value: task,
                isCompleted: false,
            }
        setTaskList((oldItems)=> [...oldItems, taskDetails])
        console.log(taskList)
        setTask("");
        // localStorage.setItem('task', taskList)
        }
    }
    const toggleHandler=()=>{
        setToggle(!togglePopUp);
    }   
    const showCompletedLists=()=>{
        setToggleShowCompleted(!toggleShowCompleted);
    }
    const deleteTask=(e, id)=>{
        e.preventDefault(); //prevents default action
        setTaskList(taskList.filter((t) => t.id !==id)); //filtering out the id we want to remove from the list and rewriting the list
    }
    const completedTask=(e,id)=>{
        e.preventDefault();
        const idOfCompleted = taskList.findIndex((x)=> x.id===id); //finding the completed task using task id
        //adding the task to completedTask list
        const tempCompleted = taskList[idOfCompleted];
        const taskDetails1={
            id1: tempCompleted.id,
            value: tempCompleted.value,
            isCompleted: !tempCompleted.isCompleted,
        }
        setCompletedList([...completedList, taskDetails1])
        setTaskList(taskList.filter((t) => t.id !==id));
    }
    const incompleteTask=(e,id1)=>{
        e.preventDefault();
        const idOfCompleted = completedList.findIndex((x)=> x.id1===id1) //finding the completed task using task id
        //re-adding the task to original taskList
        console.log(idOfCompleted)
        const stillIncomplete = completedList[idOfCompleted];
        const taskDetails2={
            id: stillIncomplete.id1,
            value: stillIncomplete.value,
            isCompleted: !stillIncomplete.isCompleted
        }
        setTaskList([...taskList, taskDetails2]);
        //removing the task from completedTaskList
        setCompletedList(completedList.filter((t)=> t.id1 !== id1))
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
                    <input className='input-task'
                        type='text' 
                        placeholder='Add a text here'
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        onKeyPress={(event)=>{
                            if (event.key === 'Enter'){
                                addTask(event)}
                            }
                            }>
                    </input>
                    <input type="button" className='addbtn' value='Add' onClick={addTask}></input>
                </div>
                <div className='task-list'>
                <div className='incomplete-task-list'>
                    {/* <div className='incomplete-tasks-list'> */}
                        {taskList !== [] ? ( //[0: 'a' , 1: 'b']
                        <div>
                            <ul>        
                            {/* every child element must have a key value. in this case div can be assigned a key|| use index as a last resort. here we have an id assigned to each task so using t.id as key*/}
                                {taskList.map((t) =>(
                                    <div key={t.id}>
                                        {t.isCompleted ? (null):
                                        <div className='list-item' >
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
                                            <button className='fa' onClick={e => deleteTask(e,t.id)}>Delete</button>
                                            {/* <i className="fa fa-trash" onClick={e => deleteTask(e, t.id)}></i> */}
                                            </li>
                                        </div>}
                                    </div>
                                ))}
                            </ul>
                            
                        </div>)
                        : null}
                        
                </div>
                <div className='showListbtn'>
                        <button className='show-completed' onClick={showCompletedLists}>Show completed tasks</button>
                </div>
                <div className='completed-task-list'>
                    {toggleShowCompleted ?
                    <div>
                    {completedList !== [] ? ( //[0: 'a' , 1: 'b']
                    <ul>        
                    {/* every child element must have a key value. in this case div can be assigned a key|| use index as a last resort. here we have an id assigned to each task so using t.id as key*/}
                        {completedList.map((t) =>(
                            <div key={t.id1}>
                                {t.isCompleted ? 
                                <div className="cross-text">
                                    <li>
                                    <input type="checkbox" className="task-comlete" defaultChecked onClick={e => incompleteTask(e, t.id1)}></input>
                                    {t.value}
                                </li>
                                </div>
                                :null}
                            </div>))}
                        </ul>)
                    :null}
                    </div>
                    :null}
                </div>
                </div>
            </div>
        </div>
)
}
export default App;