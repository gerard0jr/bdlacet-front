import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/home/Home';
import UploadFile from './components/upload/UploadFile';

const Routes = () => {
  return (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/upload" component={UploadFile}/>
    </Switch>
  )
}

export default Routes
