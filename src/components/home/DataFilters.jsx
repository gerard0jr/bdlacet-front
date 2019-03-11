import React, { useState } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import { TextField, Grid, Button } from '@material-ui/core';

const DataFilters = ({searched, handleFilters, applyFilters}) => {
  const [ filters, setFilters ] = useState(false)
  let toggleFilters = () => setFilters(!filters)

  return (<>
    {searched ? <div style={{marginTop:"1rem"}}>
      <div className="toggle-filters" onClick={toggleFilters} >
        <p>{filters ? <span style={{display:"flex", alignItems:"center"}}>Ocultar filtros <KeyboardArrowUp/></span> : 
                      <span style={{display:"flex", alignItems:"center"}}>Mostrar filtros <KeyboardArrowDown/></span>}</p>
      </div>
      <div>
        {filters ? <div className="filtros">
          <Grid container alignItems="flex-end">
            <Grid item>
              <TextField onChange={handleFilters} id="distribution" label="Distribución" />
            </Grid>
          </Grid>

          <Grid container alignItems="flex-end">
            <Grid item>
              <TextField onChange={handleFilters} id="ambient" label="Ambientes" />
            </Grid>
          </Grid>

          <Grid container alignItems="flex-end">
            <Grid item>
              <TextField onChange={handleFilters} id="lifeForms" label="Formas de vida" />
            </Grid>
          </Grid>

          <Grid container alignItems="flex-end">
            <Grid item>
              <TextField onChange={handleFilters} id="others" label="Otros registros" />
            </Grid>
          </Grid>

          <Grid container alignItems="flex-end">
            <Grid item>
              <TextField onChange={handleFilters} id="taxonomic" label="C. taxonómico" />
            </Grid>
          </Grid>

          <Grid container alignItems="flex-end">
            <Grid item>
              <TextField onChange={handleFilters} id="references" label="Referencias" />
            </Grid>
          </Grid>

          <div style={{margin:"10px", width:"100%"}}>
            <Button onClick={applyFilters} variant="contained">Filtrar</Button>
          </div>
        </div> : ''}
      </div>
    </div> : ''}
  </>)
}

export default DataFilters
