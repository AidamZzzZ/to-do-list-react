import axios from "axios";

const getAll = (url) => {
    const response = axios.get(url).then(response => response.data)
    return response
}

const addTask = (url, newObject) => {
    const response = axios.post(url, newObject).then(response => response.data)
    return response
}

const updateTask = (url, updateObject) => {
    const response = axios.put(url, updateObject).then(response => response.data)
    return response
}

const deleteTask = (url, object) => {
    const response = axios.delete(url, object).then(response => response.data)
    return response
}

export default { getAll, addTask, updateTask, deleteTask }