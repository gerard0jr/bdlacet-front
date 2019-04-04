import React, { Component } from 'react'
import Navbar from './Navbar';
import SearchComponent from './SearchComponent';
import Footer from './Footer';
import { searchDB } from '../../services/search'
import DataFilters from './DataFilters';
import CustomPaginationActionsTable from './CustomPaginationActionsTable';

export default class Home extends Component {

state = {
  searchInput: {},
  searchedWord: '',
  results: [],
  searched: false,
  logoWidth: '30%',
  filters: {},
  filterSubmitted: {}
}

handleChange = e => {
  let { searchInput } = this.state
  searchInput[e.target.name] = e.target.value
  this.setState({searchInput})
}

searchNow = e =>{
  e.preventDefault()
  const { searchInput } = this.state
  if(document.getElementById('main-search')){
    if(document.getElementById('main-search').value !== '' && document.getElementById('main-search').value.length > 3) {
      searchDB(searchInput)
    .then(results => {
      this.setState({results: results.data, lengthErr: false, logoWidth: '20%', searched: true, searchedWord: searchInput.input})
    }) //status and data
    .catch(err => console.log(err))
    } else{
      this.setState({lengthErr: true})
    }
  }
  // if(document.getElementById('search-navbar').value !== '') {
  //   searchDB(searchInput)
  //   .then(results => {
  //     this.setState({results: results.data, logoWidth: '20%', searched: true, searchedWord: searchInput.input, searchInput: {input: ''}})
  //   }) //status and data
  //   .catch(err => console.log(err))
  // }
}

handleKeyPress = e => {
  if(e.key === 'Enter'){
    this.searchNow(e)
  }
}

clearSearch = () => {
  // document.getElementById('search-navbar').value = ''
  document.getElementById('main-search').value = ''
  this.setState({searchInput:{input: ''}, results: [], searched: false, logoWidth: '30%', searchedWord: '', filters: {}, filterSubmitted: {}})
}

handleFilters = e => {
  const { filters } = this.state
  filters[e.target.id] = e.target.value
  this.setState({filters})
}

applyFilters = () => {
  const { filters } = this.state
  this.setState({filterSubmitted:{...filters}})
}

handleDelete = data => {
  const { filterSubmitted, filters } = this.state
  switch(data){
    case 'distribution':
      document.getElementById('distribution').value = ''
      filters.distribution = ''
      filterSubmitted.distribution = ''
      this.setState({filterSubmitted, filters})
      return
    case 'lifeForms':
      document.getElementById('lifeForms').value=''
      filters.lifeForms = ''
      filterSubmitted.lifeForms = ''
      this.setState({filterSubmitted, filters})
      return
    case 'references':
      document.getElementById('references').value=''
      filters.references = ''
      filterSubmitted.references = ''
      this.setState({filterSubmitted, filters})
      return
    case 'others':
      document.getElementById('others').value=''
      filters.others = ''
      filterSubmitted.others = ''
      this.setState({filterSubmitted, filters})
      return
    case 'ambient':
      document.getElementById('ambient').value=''
      filters.ambient = ''
      filterSubmitted.ambient = ''
      this.setState({filterSubmitted, filters})
      return
    case 'taxonomic':
      document.getElementById('taxonomic').value=''
      filters.taxonomic = ''
      filterSubmitted.taxonomic = ''
      this.setState({filterSubmitted, filters})
      return
    default:
      return
  }}

  render() {
    const { searchInput, results, logoWidth, searched, searchedWord, filterSubmitted, lengthErr } = this.state
    const { handleChange, searchNow, clearSearch, handleKeyPress, handleFilters, applyFilters, handleDelete } = this
    return (
      <div className="background" style={{height: "100%"}}>
        {/* <Navbar handleKeyPress={handleKeyPress} searchInput={searchInput} 
          handleChange={handleChange} searchNow={searchNow} clearSearch={clearSearch} /> */}
        <SearchComponent searchInput={searchInput} handleChange={handleChange} 
          searchNow={searchNow} logoWidth={logoWidth} searched={searched} 
          searchedWord={searchedWord} handleKeyPress={handleKeyPress} filterSubmitted={filterSubmitted}
          handleDelete={handleDelete}/>
        {lengthErr ? <p style={{margin:"1rem 0", fontSize:"0.7rem"}}>Introducir mínimo 4 letras</p> : '' }
        <DataFilters handleFilters={handleFilters} applyFilters={applyFilters} searched={searched}/>
        <CustomPaginationActionsTable filterSubmitted={filterSubmitted} results={results} searched={searched} searchInput={searchInput}/>
        {/* <Footer/> */}
      </div>
    )
  }
}
