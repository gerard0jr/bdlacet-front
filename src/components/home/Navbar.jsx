import React from 'react'
import { AppBar, Toolbar, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

const Navbar = ({clearSearch}) => {
  return (
    <div>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <img onClick={clearSearch} style={{cursor:"pointer",marginLeft:"1rem",width:"90px"}} src="/img/small-logo.png" alt="navbar-logo"/>
          <div className="grow"/>
          <div className="search">
            <div className="search-icon">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Buscar"
              className="input-input"
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar