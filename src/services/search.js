import axios from 'axios'

const url = 'http://bdlacet.mx'

export const searchDB = input => 
    axios.post(`${url}/searchNow`, input, {})
    .then(res => res)
    .catch(err => err.response)