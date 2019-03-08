import axios from 'axios'

// const url = 'http://localhost:3000'
const url = 'https://bdlacet.mx'

export const searchDB = input => 
    axios.post(`${url}/searchNow`, input, {})
    .then(res => res)
    .catch(err => err.response)

export const getAllRegisters = () => 
    axios.get(url + '/getAll')
    .then(res => res)
    .catch(err => err.response)