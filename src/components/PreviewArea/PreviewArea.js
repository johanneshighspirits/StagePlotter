import React, { Component } from 'react'
import Monitor from '../Monitor'
import GridTile from '../GridTile'
import * as constants from '../../constants'
import './PreviewArea.css'

class PreviewArea extends Component {
  shapeFor = (item, i) => {
    switch (item.identifier) {
    case 'monitor':
      return <Monitor key={i} gridTile={item.gridTile} perspAngle={this.props.perspAngle} x={item.x} y={item.y} />
    default:
      throw new Error(item.identifier + ' is not defined as a shape')
    }
  }

  render() {
    let items = this.props.layers.map(this.shapeFor)
    return (
      <div className='previewArea'>
        {/* Underlying grid tiles */}
        <svg width={this.props.width} height={this.props.height} viewBox={`0 0 ${this.props.width} ${this.props.height}`} xmlns="http://www.w3.org/2000/svg">
          {this.props.gridTiles}
          {this.props.activeTile >= 0 && <GridTile {...this.props.gridTiles[this.props.activeTile].props} isActive={true} /> }
        </svg>
        {/* Existing items */}
        <svg width={this.props.width} height={this.props.height} viewBox={`0 0 ${this.props.width} ${this.props.height}`} xmlns="http://www.w3.org/2000/svg">
          {items}
        </svg>
      </div>
    )
  }
}

export default PreviewArea
