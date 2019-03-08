import React, { Component } from 'react'
import axios from 'axios'
import { getAllRegisters } from '../../services/search'
import { CircularProgress } from '@material-ui/core';

export default class UploadFile extends Component {

    state = {
        loaded: 0,
        message: '',
        registers: {},
        xml: {},
        info: []
    }

    componentDidMount = () => {
      this.getInfo()
      let password = prompt('Ingrese la contraseña')
      if(password === 'bdlacet2019') return
      this.props.history.push('/')
    }

    handleFile = e => {
      const { xml } = this.state
      let file
      file = e.target.files[0]
      let fr = new FileReader()
      fr.readAsText(file, "UTF-8")
      fr.onload = e => {
        xml.data = e.target.result
        this.setState({xml, loaded: 0})
      }
    }
    
    sendFile = e => {
      e.preventDefault()
      const { xml } = this.state        
      if(Object.keys(xml).length === 0) return

      axios.post('https://bdlacet.mx/upload', xml, {
        onUploadProgress: ProgressEvent => {
          this.setState({loaded: (ProgressEvent.loaded / ProgressEvent.total * 100)})
        }
      })
      .then(res => this.setState({registers: res, message: 'Subido correctamente'}))
      .catch(err => this.setState({message: err}))
    }

    getInfo = () => 
      getAllRegisters()
        .then(res => this.setState({info:res}))
        .catch(err => console.log(err))

    render() {
        const { loaded, message, info, registers } = this.state
        const { handleFile, sendFile } = this
    return (
      <div>
        <h1>Subir XML a la base de datos</h1>
        <small style={{padding:"1rem"}}>Por favor, subir el archivo XML sin los siguientes caracteres en el contenido: (&gt;), (&lt;), (&quot;), (&apos;), o (&amp;). Ya que son caracteres especiales y pueden producir errores.</small>
        <form style={{margin:"1rem 0"}} >
            <input type="file" accept="text/xml" onChange={handleFile}/>
            <button onClick={sendFile}>Subir</button>
        </form>
        {loaded !== 0 ? <div> <p>{Math.round(loaded,2) } %</p> {registers.data ? '' : <small>Espere... puede demorar varios segundos la subida del XML <CircularProgress/> </small>} </div> : ''}
        <div style={{margin:"1rem 0"}}>{ message ? message : ''}</div>
        {info.data || info.data === '' ? <div style={{margin:"2rem 0 1rem 0"}}>Registros en la base de datos: {info.data.length}</div> : <div>Cargando número de registros... <CircularProgress/></div>}
        {registers.data ? <div style={{margin: "1rem 0"}}>
          <p>Registros subidos a la base de datos: {registers.data.affectedRows}</p> 
          <p>Registros totales: {info.data.length + registers.data.affectedRows}</p> 
        </div> : '' }
      </div>
    )
  }
}
