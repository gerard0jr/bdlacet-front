import React, { Component } from 'react'
import Navbar from './Navbar';
import SearchComponent from './SearchComponent';
import Footer from './Footer';
import Results from './Results';
import { searchDB } from '../../services/search'
import DataFilters from './DataFilters';

export default class Home extends Component {

state = {
  searchInput: {},
  results: [],
  searched: false,
  logoWidth: '30%'
}

handleChange = e => {
  let { searchInput } = this.state
  searchInput[e.target.name] = e.target.value
  this.setState({searchInput})
}

searchNow = e =>{
  e.preventDefault()
  const { searchInput } = this.state
  searchDB(searchInput)
    .then(results => {
      this.setState({results: results.data, logoWidth: '15%', searched: true})
    }) //status and data
    .catch(err => console.log(err))
}

clearSearch = () => this.setState({searchInput:{input: ''}, results: [], searched: false, logoWidth: '30%'})

  render() {
    const { searchInput, results, logoWidth, searched } = this.state
    const { handleChange, searchNow, clearSearch } = this
    console.log(results)
    return (
      <div className="background" style={{height: "100%"}}>
        <Navbar handleChange={handleChange} searchNow={searchNow} clearSearch={clearSearch} />
        <SearchComponent searchInput={searchInput} handleChange={handleChange} searchNow={searchNow} logoWidth={logoWidth} />
        <DataFilters searched={searched}/>
        <Results searchInput={searchInput} results={results} searched={searched} />
        <Footer/>
      </div>
    )
  }
}
