import { useState, useEffect } from 'react'
import { TaskItem, FormTask, HandleInputError } from './components/Task'
import taskService from './services/tasks'
import PrincipalTitle from './components/Titles'

const url = "http://localhost:3001/tasks"

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [inputTask, setInputTask] = useState('')
  const [tasks, setTasks] = useState(null)
  
  useEffect(() => {
    taskService
      .getAll(url)
      .then(response => 
        setTasks(response))
      updateReverseTask()
  }, [])

  const handleFormTask = (e) => {
    e.preventDefault()

    if (inputTask === "") {
      console.log("Ingrese una nota...")
    }

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
    updateReverseTask()
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
    taskService
      .deleteTask(`${url}/${id}`, task)
      .then(response => {
        setTasks(tasks.filter(task => task.id !== response.id))
      })
      .catch(error => console.log(error))
  }

  const handleUpdateTask = (id) => {
    const task = tasks.find(task => task.id === id)
    return <input type="text" value={task.title} />
  }

  if (!tasks) {
    return null
  }
  
  const updateReverseTask = () => {
    const reverseTasks = tasks.reverse()

    return reverseTasks
  }

  return (
    <>
      <PrincipalTitle title="Your Tasks"/>
      <HandleInputError message={errorMessage} />

      <FormTask onHandleForm={handleFormTask} onInput={handleInput} inputTask={inputTask}/>

      <ul>
        {tasks.map(task => 
          <TaskItem key={task.id} 
            taskName={task.title} 
            completed={task.completed} 
            onCheckTask={() => handleCheckTask(task.id)}
            onDeleteTask={() => handleDeleteTask(task.id)}
            onUpdateTask={() => handleUpdateTask(task.id)}
            />
        )}
      </ul>
    </>
  )
}

export default App
