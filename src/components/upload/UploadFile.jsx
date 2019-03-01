import React, { Component } from 'react'
import axios from 'axios'

export default class UploadFile extends Component {

    state = {
        loaded: 0,
        message: '',
        registers: null,
        xml: {}
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
    
      axios.post('http://bdlacet.mx/upload', xml, {
        onUploadProgress: ProgressEvent => {
          this.setState({loaded: (ProgressEvent.loaded / ProgressEvent.total * 100)})
        }
      })
      .then(res => this.setState({registers: res, message: 'Subido correctamente'}, () => console.log(res)))
      .catch(err => err)
      
    }

    render() {
        const { loaded, message, registers } = this.state
        const { handleFile, sendFile } = this
        console.log(registers)
    return (
      <div>
        <h1>Subir archivo de base de datos</h1>
        <form  >
            <input type="file" onChange={handleFile}/>
            <button onClick={sendFile}>Enviar</button>
        </form>
        <div> {Math.round(loaded,2) } %</div>
        <div>{ message ? message : ''}</div>
      </div>
    )
  }
}
