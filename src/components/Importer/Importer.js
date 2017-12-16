import React, { Component } from 'react'
import { ObjFileListParser } from '../../ObjParser'
import DragItem from '../DragItem'
import SvgItem from '../SvgItem'
import './Importer.css'

class Importer extends Component {
  state = {
    status: [],
    templateObjects: []
  }

  handleChange = (e) => {
    e.preventDefault()
    const files = e.target.files
    this.parseFiles(files)
  }

  parseFiles = async (files) => {
    let objFileListParser = new ObjFileListParser(files)
    objFileListParser.addListener('parseStart', this.updateStatus)
    objFileListParser.addListener('parseProgress', this.updateStatus)
    objFileListParser.addListener('parseComplete', this.onComplete)
    const templateObjects = await objFileListParser.start()
    this.setState(prevState => { 
      return {
        templateObjects: prevState.templateObjects.concat(templateObjects[0])
      }
    })
  }

  updateStatus = (index, fileName, progress) => {
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

  onComplete = (index, fileName, progress) => {
    this.updateStatus(index, fileName, progress)
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="file">
            {this.state.status.length > 0 && this.state.status.map((status, i) => {
              return <p key={i}><b>{status.fileName}</b> {status.progress}</p>
            })}<br />
            <input type="file" multiple onChange={this.handleChange} />
          </label>
        </form>
        <ul>
          {this.state.templateObjects.map((template, i) => {
            console.log(template)
            return (
              <li key={i}><b>{template.name}</b> {template.vertices.length} vertices, {template.faces.length} faces
                <DragItem
                  identifier={template.name}
                  handleDragStart={this.handleDragStart}
                  handleDragEnd={this.handleDragEnd}
                  width={100}
                  height={100}>
                  <SvgItem item={template} />
                </DragItem>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Importer
