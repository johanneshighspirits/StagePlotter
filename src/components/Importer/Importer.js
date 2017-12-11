import React, { Component } from 'react'
import { ObjFileListParser } from '../../ObjParser'
import './Importer.css'

class Importer extends Component {
  state = {
    status: []
  }
  
  handleChange = (e) => {
    e.preventDefault()
    const files = e.target.files
    let objFileListParser = new ObjFileListParser(files)
    objFileListParser.addListener('parseStart', this.updateStatus)
    objFileListParser.addListener('parseProgress', this.updateStatus)
    objFileListParser.addListener('parseComplete', this.updateStatus)
    objFileListParser.start()
  }

  updateStatus = (index, fileName, progress) => {
    console.log(index, fileName, progress)
    this.setState(prevState => {
      let status = prevState.status
      status[index] = {
        fileName,
        progress
      }
      return {
        status
      }
    })
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="file">
            {this.state.status.length > 0 && this.state.status.map((status, i) => {
              return <p key={i}><b>{status.fileName}</b> {status.progress}</p>
            })}<br/>
            <input type="file" multiple onChange={this.handleChange} />
          </label>
        </form>
      </div>
    )
  }
}

export default Importer
