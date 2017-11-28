import React, { Component } from 'react'
import Monitor from '../Monitor'
import PreviewArea from '../PreviewArea'
import DragItem from '../DragItem'
import GridTile from '../GridTile'
import utils from '../../utils'
import * as constants from '../../constants'
import './Canvas.css'
import { TILE_WIDTH, TILE_HEIGHT } from '../../constants'

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      activeItem: null,
      activeTile: -1,
      layers: [],
      gridTiles: this.gridTiles()
    }
  }

  /**
   * Setup grid
   */
  gridTiles = () => {
    let xIndex = 0
    let yIndex = 0
    let gridTiles = []
    while (yIndex < constants.TILES_IN_Y) {
      while (xIndex < constants.TILES_IN_X) {
        let i = gridTiles.length
        gridTiles.push(
          <GridTile key={i} isActive={false} xIndex={xIndex} yIndex={yIndex} />
        )
        xIndex++
      }
      yIndex++
      xIndex = 0
    }
    return gridTiles
  }

  handleMouseMove = (e) => {
    let rect = this.refs.stage.getBoundingClientRect()
    let x = Math.round(e.clientX - rect.left)
    let y = Math.round(e.clientY - rect.top)
    this.setState({
      // x, y,
      activeTile: utils.tileFor(x, y)
    })
  }

  handleDragStart = (e) => {
    e.dataTransfer.setData('itemType', e.target.dataset.identifier)
    let img = e.currentTarget
    e.dataTransfer.setDragImage(img.firstChild, 50, 12.5)
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
    this.setState(prevState => {
      let activeItem = prevState.activeItem
      activeItem.gridTile = prevState.activeTile
      activeItem.x = prevState.x
      activeItem.y = prevState.y
      return {
        layers: prevState.layers.concat(activeItem),
        activeItem: null,
        activeTile: -1
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
    let x = Math.round(e.clientX - rect.left)
    let y = Math.round(e.clientY - rect.top)
    let tile = utils.tileFor(x, y)
    if (this.state.tile !== tile) {
      this.setState({
        x, y,
        activeTile: tile
      })
    }
  }

  handleMouseLeave = (e) => {
    e.preventDefault()
    this.setState({
      activeTile: -1
    })
    console.log('left', e)
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
        {/* <div id="dev" style={{ position: 'fixed', top: 0, left: '50%', padding: '0.5em 1em', backgroundColor: '#222', color: '#eee' }}>
          X: {this.state.x}, Y: {this.state.y}<br />
          Tile: {this.tileFor(this.state.x, this.state.y)}<br />
          {this.state.layers.length} items to draw
        </div> */}

        <nav>
          <ul>
            <li>
              <DragItem
                identifier='monitor'
                handleDragStart={this.handleDragStart}
                handleDragEnd={this.handleDragEnd}
                width={TILE_WIDTH}
                height={TILE_HEIGHT}
                text='[ O ]'>
                <Monitor />
              </DragItem>
            </li>
          </ul>
        </nav>

        <div
          ref='stage'
          style={{
            width: `${constants.GRID_WIDTH}px`,
            height: `${constants.GRID_HEIGHT}px`
          }}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          onDragEnter={this.handleDragEnter}
          onDragOver={this.handleDragOver}
          onDrop={this.handleDrop} >

          <PreviewArea
            width={constants.GRID_WIDTH}
            height={constants.GRID_HEIGHT}
            gridTiles={this.state.gridTiles}
            activeTile={this.state.activeTile}
            layers={this.state.layers} />

        </div>
      </div>
    )
  }
}

export default Canvas
