const HandleInputError = (props) => {
  if (props.message === null) {
    return null
  }
  return <p>{props.message}</p>
}

const FormTask = ({ onHandleForm, onInput, inputTask }) => {
  return (
    <>
      <form onSubmit={onHandleForm}>
        <label htmlFor="">
          <input 
            type="text" 
            placeholder='Input a new task...'
            onChange={onInput}
            value={inputTask}  
          />
        </label>
        <button type='submit'>send</button>
      </form>
    </>
  )
}

const UpdateTask = ({ inputValue, onConfirm, onInput }) => {
  return (
    <li>
      <label htmlFor="">
        <input 
          type="text"
          value={inputValue}
          onChange={onInput}
        />
      </label>
      <button type="submit" onClick={onConfirm}>confirm</button>
    </li>
  )
}

const CheckboxTask = ({ completed, onCheckTask }) => {
  return (
    <input type="checkbox" checked={completed} onChange={onCheckTask} />
  )
}

const ButtonTask = ({ name, onClickHandle }) => {
  return (
    <button onClick={onClickHandle} type='submit'>{name}</button>
  )
}

const TaskItem = (props) => {
  return (
    <li>
      <CheckboxTask completed={props.completed} onCheckTask={props.onCheckTask}/>
      <span>{props.taskName}</span>
      <ButtonTask onClickHandle={props.onDeleteTask} name="delete"/>
      <ButtonTask onClickHandle={props.onUpdateTask} name="update"/>
    </li>
  )
}

export { FormTask, TaskItem, HandleInputError, UpdateTask }