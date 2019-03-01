import React from 'react'
import { TextField, Button, Chip } from '@material-ui/core';

const SearchComponent = ({searchNow, handleChange, filterSubmitted, logoWidth, searched, searchedWord, handleKeyPress, handleDelete}) => {
  return (
    <div className="main-search">
      <img width={logoWidth} src="/img/logo.png" alt="bdLogo"/>
      {searched ? <div>Resultados relacionados a <b>'{searchedWord}'</b></div> : <div>
      <p>Un buscador de <b>algas </b>pensado para ficólogos y no tan ficólogos</p>
      <div className="input-flex">
        <TextField
          className="text-field"
          label="Término a buscar..."
          variant="outlined"
          name='input'
          id='main-search'
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={searchNow} variant="contained" color="primary">
          Buscar
        </Button>
      </div>
      </div>}
      {Object.keys(filterSubmitted).length > 0 ? <div style={{display:'flex', justifyContent:'center', margin:"1rem"}}>
       {filterSubmitted.distribution ? filterSubmitted.distribution.length > 0 ? <div style={{margin:'0 1rem'}}><Chip deleteIcon="default" onDelete={() => handleDelete('distribution')} label={`Distribución: ${filterSubmitted.distribution}`}/></div>: '' : ''}
       {filterSubmitted.lifeForms ? filterSubmitted.lifeForms.length > 0 ?  <div style={{margin:'0 1rem'}}><Chip deleteIcon="default" onDelete={() => handleDelete('lifeForms')} label={`Formas de vida: ${filterSubmitted.lifeForms}`}/></div> : '' : ''}
       {filterSubmitted.references ? filterSubmitted.references.length > 0 ?  <div style={{margin:'0 1rem'}}><Chip deleteIcon="default" onDelete={() => handleDelete('references')} label={`Referencias: ${filterSubmitted.references}`}/></div> : '' : ''}
       {filterSubmitted.others ? filterSubmitted.others.length > 0 ?  <div style={{margin:'0 1rem'}}><Chip deleteIcon="default" onDelete={() => handleDelete('others')} label={`Otros registros: ${filterSubmitted.others}`}/></div> : '' : ''}
       {filterSubmitted.ambient ? filterSubmitted.ambient.length > 0 ?  <div style={{margin:'0 1rem'}}><Chip deleteIcon="default" onDelete={() => handleDelete('ambient')} label={`Ambiente: ${filterSubmitted.ambient}`}/></div> : '' : ''}
       {filterSubmitted.taxonomic ? filterSubmitted.taxonomic.length > 0 ? <div style={{margin:'0 1rem'}}><Chip deleteIcon="default" onDelete={() => handleDelete('taxonomic')} label={`Comentario taxonómico: ${filterSubmitted.taxonomic}`}/></div> : '' : ''} </div> : ''}
    </div>
  )
}

export default SearchComponent
