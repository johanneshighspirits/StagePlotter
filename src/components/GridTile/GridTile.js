import React, { Component } from 'react'
import * as constants from '../../constants'
import './GridTile.css'
  
class GridTile extends Component {
  render() {
    let { xIndex, yIndex, isActive } = this.props
    let classes = ['gridTile']
    if (isActive) classes.push('highlight')
    return (
      <rect
        className={classes.join(' ')}
        x={xIndex * constants.TILE_WIDTH}
        y={yIndex * constants.TILE_HEIGHT}
        width={constants.TILE_WIDTH}
        height={constants.TILE_HEIGHT} />
    )
  }
}

export default GridTile
