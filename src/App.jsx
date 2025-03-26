import { useState, useEffect, Fragment } from 'react'
import { TaskItem, FormTask, HandleInputError, UpdateTask } from './components/Task'
import taskService from './services/tasks'
import PrincipalTitle from './components/Titles'


const url = "http://localhost:3001/tasks"

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [updateTask, setUpdateTask] = useState('')
  const [inputTask, setInputTask] = useState('')
  const [tasks, setTasks] = useState(null)
  const [editId, setEditId] = useState(null)
  
  useEffect(() => {
    taskService
      .getAll(url)
      .then(response => 
        setTasks(response))
  }, [])

  const handleFormTask = (e) => {
    e.preventDefault()

    if (inputTask === "") {
      setErrorMessage("Input a valid note")

      setTimeout(() => {
        setErrorMessage(null)
      }, 1000)
    } else {
      const newTask = {
        completed: false,
        title: inputTask
      }

      taskService
        .addTask(url, newTask)
        .then(response => 
          setTasks(tasks.concat(response))
        )
        .catch(error => console.log(error))

      setInputTask('')
    }
  }

  const handleInput = (e) => {
    setInputTask(e.target.value)
  }

  const handleCheckTask = (id) => {
    const task = tasks.find(task => task.id === id)
    const updateTask = { ...task, completed: !task.completed }
    
    taskService
      .updateTask(`${url}/${id}`, updateTask)
      .then(response => 
        setTasks(tasks.map(task => task.id !== response.id ? task : updateTask ))
      )
      .catch(error => console.log(error))
  }

  const handleDeleteTask = (id) => {
    const task = tasks.find(task => task.id === id)
    if (window.confirm(`are you sure delete task ${task.title}?`)) {
      taskService
      .deleteTask(`${url}/${id}`, task)
      .then(response => {
        setTasks(tasks.filter(task => task.id !== response.id))
      })
      .catch(error => console.log(error))
    }
  }

  const handleUpdateTask = (id, name) => {
    setUpdateTask(name)
    setEditId(id)
  }

  const handleConfirmUpdate = (id) => {
    const task = tasks.find(task => task.id === id)
    const newTask = { ...task, title: updateTask }

    if (updateTask === "" ) {
      setErrorMessage("Enter a valid input for update task")
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    } else {
      taskService
        .updateTask(`${url}/${id}`, newTask)
        .then(response => 
          setTasks(tasks.map(task => task.id === id ? response : task))
        )
        .catch(error => console.log(error))
      setEditId(null)
    }
  } 

  if (!tasks) {
    return null
  }

  return (
    <>
      <PrincipalTitle title="Your Tasks"/>
      <HandleInputError message={errorMessage} />

      <FormTask onHandleForm={handleFormTask} onInput={handleInput} inputTask={inputTask}/>

      <ul>
        {tasks.map(task => 
          task.id === editId
          ? 
            <UpdateTask 
              key={task.id}
              inputValue={updateTask} 
              onInput={(e) => setUpdateTask(e.target.value)} 
              onConfirm={() => handleConfirmUpdate(task.id)} 
            />
          :
            <TaskItem 
              key={task.id} 
              taskName={task.title} 
              completed={task.completed} 
              onCheckTask={() => handleCheckTask(task.id)}
              onDeleteTask={() => handleDeleteTask(task.id)}
              onUpdateTask={() => handleUpdateTask(task.id, task.title)}
            />
        )}
      </ul>
    </>
  )
}

export default App
