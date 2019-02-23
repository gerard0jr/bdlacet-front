import React, { useState } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'

const DataFilters = ({searched}) => {
  const [ filters, setFilters ] = useState(false)
  let toggleFilters = () => setFilters(!filters)

  return (<>
    {searched ? <div style={{marginTop:"1rem"}}>
      <div className="toggle-filters" onClick={toggleFilters} >
        <p>{filters ? <span style={{display:"flex", alignItems:"center"}}>Ocultar filtros <KeyboardArrowUp/></span> : 
                      <span style={{display:"flex", alignItems:"center"}}>Mostrar filtros <KeyboardArrowDown/></span>}</p>
      </div>
      <div>
        {filters ? <div>
          Filtro1
          Filtro2
          Filtro3
        </div> : ''}
      </div>
    </div> : ''}
  </>)
}

export default DataFilters
