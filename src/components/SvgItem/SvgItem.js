import React, { Component } from 'react'
import utils from '../../utils'
import { TILE_WIDTH, TILE_HEIGHT } from '../../constants'
import './SvgItem.css'

class SvgItem extends Component {
  render() {
    const { item: { name, vertices }, gridTile, perspAngle } = this.props
    let coords = utils.coordsFor(gridTile)
    coords.x = coords.x + (TILE_WIDTH / 2)
    coords.y = coords.y + (TILE_HEIGHT / 2)
  
    return (
      <g className={name}>
        <path d={utils.pointsToSVGCommands(vertices, coords, perspAngle)} />
      </g>
    )
  }
}

export default SvgItem
