const HandleInputError = props => <p className="text-center font-semibold mb-1 text-red-500">{props?.message}</p>

const FormTask = ({ onHandleForm, onInput, inputTask }) => {
  return (
    <form className="m-auto w-2/5 bg-gray-400 border-slate-300 border-1
    mb-2 p-5 flex justify-between rounded-sm" onSubmit={onHandleForm}>
      <label htmlFor="">
        <input 
          className="bg-white p-1 w-78 outline-none"
          type="text" 
          placeholder='Input a new task...'
          onChange={onInput}
          value={inputTask}  
        />
      </label>
      <button className="bg-gray-600 ml-2 px-3 py-1 rounded-sm cursor-pointer text-white" type='submit'>send</button>
    </form>
  )
}

const UpdateTask = ({ inputValue, onConfirm, onInput }) => {
  return (
    <li className="w-full">
      <form className="flex justify-between mb-3" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="">
          <input
            className="border-b-1 outline-none"
            type="text"
            value={inputValue}
            onChange={onInput}
          />
        </label>
        <button className="p-1 bg-blue-800 text-white rounded-sm hover:bg-blue-950 transition-colors ease-in" type="submit" onClick={onConfirm}>confirm</button>
      </form>
    </li>
  )
}

const TaskItem = ({ task, onClickHandleUpdate,  onClickHandleDelete, onCheckTask }) => {
  return (
    <li className="m-3 border-b w-full overflow-hidden truncate">
      <input className="mr-2" type="checkbox" checked={task.completed} onChange={() => onCheckTask(task.id)} />
      <span className="font-semibold">{task.title}</span>
      <div className="inline-block float-right">
        <button className="cursor-pointer bg-green-600 text-white p-1 rounded-sm hover:bg-green-700 transition-colors ease-in mb-1" onClick={() => onClickHandleUpdate(task.id, task.title)} type='submit'>update</button>
        <button className="cursor-pointer ml-2 bg-red-500 text-white hover:bg-red-600 transition-colors ease-in p-1 rounded-sm" onClick={() => onClickHandleDelete(task.id)} type='submit'>delete</button>
      </div>
    </li>
  )
}

export { FormTask, TaskItem, HandleInputError, UpdateTask }