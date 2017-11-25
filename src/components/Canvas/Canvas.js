import React, { Component } from 'react'
import Monitor from '../Monitor'
import PreviewArea from '../PreviewArea'
import DragItem from '../DragItem'
import './Canvas.css'

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      activeItem: null,
      layers: []
    }
  }

  handleMouseMove = (e) => {
    let rect = this.refs.stage.getBoundingClientRect()
    this.setState({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    })
  }

  handleDragStart = (e) => {
    e.dataTransfer.setData('itemType', e.target.dataset.identifier)
    e.dataTransfer.effectAllowed = 'copy'
    let item = {
      identifier: e.target.dataset.identifier,
      x: 0,
      y: 0,
      text: 'Monitor 1x15'
    }
    this.setState({
      activeItem: item
    })
    console.log('start', e)
  }

  handleDragEnd = (e) => {
    console.log('end', e)
    this.setState(prevState => {
      let activeItem = prevState.activeItem
      activeItem.x = prevState.x
      activeItem.y = prevState.y
      return {
        layers: prevState.layers.concat(activeItem),
        activeItem: null
      }
    })
  }


  handleDragEnter = (e) => {
    e.preventDefault()
    console.log('enter', e)
  }

  handleDragOver = (e) => {
    e.preventDefault()
    let rect = this.refs.stage.getBoundingClientRect()
    this.setState({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    })
    // console.log('over', e)
  }

  handleDrop = (e) => {
    e.preventDefault()
    let droppedItem = e.dataTransfer.getData('itemType')
    console.log('drop', droppedItem)
    console.log('drop', e)
  }

  render() {
    return (
      <div>
        <div id="dev" style={{ position: 'fixed', top: 0, left: '50%', padding: '0.5em 1em', backgroundColor: '#222', color: '#eee' }}>
          X: {this.state.x}, Y: {this.state.y}<br />
          {this.state.layers.length} items to draw
        </div>

        <nav>
          <ul>
            <li>
              <DragItem 
                identifier='monitor'
                handleDragStart={this.handleDragStart}
                handleDragEnd={this.handleDragEnd}
                width='200'
                height='100'
                text='[ O ]'>
                <Monitor />
              </DragItem>
            </li>
          </ul>
        </nav>

        <div
          ref='stage'
          style={{ width: '600px', height: '400px', border: '3px solid black'}}
          onMouseMove={this.handleMouseMove}
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDrop={this.handleDrop} >

          {/* <canvas width='800' height='600'></canvas> */}
          <PreviewArea
            width='600'
            height='400'
            layers={this.state.layers} />

        </div>
      </div>
    )
  }
}

export default Canvas
