import axios from 'axios'

const url = 'http://localhost:3000'

export const searchDB = input => 
    axios.post(`${url}/searchNow`, input, {})
    .then(res => res)
    .catch(err => err.response)