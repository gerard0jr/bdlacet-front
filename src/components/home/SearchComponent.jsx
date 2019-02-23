import React from 'react'
import { TextField, Button } from '@material-ui/core';

const SearchComponent = ({searchNow, handleChange, searchInput, logoWidth}) => {
  return (
    <div className="main-search">
      <img width={logoWidth} src="/img/logo.png" alt="bdLogo"/>
      <p>Un buscador de <b>algas </b>pensado para ficólogos y no tan ficólogos</p>
      <form className="input-flex">
        <TextField
          className="text-field"
          label="Término a buscar..."
          variant="outlined"
          name='input'
          value={searchInput.input}
          onChange={handleChange}
        />
        <Button onClick={searchNow} variant="contained" color="primary">
          Buscar
        </Button>
      </form>
    </div>
  )
}

export default SearchComponent
