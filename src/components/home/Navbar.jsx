import React from 'react'
import { AppBar, Toolbar, InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

const Navbar = ({clearSearch, handleChange, handleKeyPress, searchNow}) => {
  return (
    <div>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <img onClick={clearSearch} style={{cursor:"pointer",marginLeft:"1rem",width:"90px"}} src="/img/small-logo.png" alt="navbar-logo"/>
          <div className="grow"/>
          <div className="search">
            <div className="search-icon">
              <SearchIcon style={{cursor:"pointer"}} onClick={searchNow} />
            </div>
            <InputBase
              id="search-navbar"
              name="input"
              placeholder="Buscar"
              className="input-input"
              autoComplete="off"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar