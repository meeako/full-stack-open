import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl)

const create = (newObject) => axios.post(baseUrl, newObject)

const remove = (id) => axios.delete(`${baseUrl}/${id}`)

const updateNumber = (id, newObjec) => axios.put(`${baseUrl}/${id}`, newObjec)

export default {getAll, create, remove, updateNumber}