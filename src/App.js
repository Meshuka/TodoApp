import React, { useState } from 'react';
import './App.css';
// import Tasks from './Components/Tasks';

const App = () =>{
    const [task, setTask] = useState('')
    const [taskList, setTaskList] = useState([])
    // const [togglePopUp, setToggle] = useState(false)
    const [toggleShowCompleted, setToggleShowCompleted]= useState(false)
    const [completedList, setCompletedList] = useState([])
    const [editId, setEditId] = useState(null)
    const [edittingText, setEdittingText] = useState("")

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
    const handleEdit=(id)=>{
        const temp1= taskList.findIndex((x)=> x.id===id);
        const temp = taskList[temp1].value;
        console.log(temp)
        setEdittingText(temp);
        console.log(edittingText)
        // setToggle(!togglePopUp);
        setEditId(id);
    }
    const submitEdit=(e, id)=>{
        // const idOfEdit = taskList.findIndex((x)=> x.id===id);
        // taskList[idOfEdit]= edittingText;
        // const newList = [...taskList]
        // setTaskList(newList)
        // setEditId(null)
        e.preventDefault()
        const updatedTodos = [...taskList].map((todo) => {
            if (todo.id === id) {
            todo.value = edittingText;
            }
            return todo;
        });
        setTaskList(updatedTodos);
        setEditId(null);
        setEdittingText("");
        // setToggle(!togglePopUp);
    }
    const toggleHandler=()=>{
        // setToggle(!togglePopUp);
        setEditId(null);
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
                                            {/* <input type="text" onChange={e=>setEdittingText(e.target.value)} value={edittingText} autoFocus></input> */}
                                            {/* {editId == t.id ? 
                                            (<div>
                                                {t.value}
                                            </div>):
                                            (<input type="text" onChange={e=>setEdittingText(e.target.value)} value={edittingText} autoFocus></input>)
                                            } */}
                                            <button className='edit-task' onClick={()=>{handleEdit(t.id)}}>Edit</button>
                                            {/* {editId == t.id ? (
                                            <button className='edit-task' onClick={()=>submitEdit(t.id)}>Sumbit Edit</button>
                                            ):(<button className='edit-task' onClick={setEditId(t.id)}>Edit</button>)} */}
                                            {/* <button className='edit-task' onClick={setEditId(t.id)}>Edit</button> */}
                                            {/* { togglePopUp ? */}
                                            { editId ===t.id ?
                                            <div className='popup-box'>
                                                <div className='box'>
                                                <span className='close-icon' onClick={toggleHandler}>X</span>
                                                Edit here!
                                                <br></br>
                                                <input type="text" className="input-edit" 
                                                value={edittingText} 
                                                autoFocus
                                                onChange={e=>setEdittingText(e.target.value)}
                                                onKeyPress={e =>{
                                                    if(e.key === 'Enter') {
                                                        submitEdit(e, editId)}}}>
                                                </input>
                                                <button className='submit' onClick={e => submitEdit(e, editId)}>Submit</button>
                                                </div>
                                            </div>
                                            : null}
                                            <button className='fa' onClick={e => deleteTask(e,t.id)}>Delete</button>
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
                    {completedList !== [] ? ( 
                    <ul>        
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