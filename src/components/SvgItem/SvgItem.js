import React, { Component } from 'react'
import utils from '../../utils'
import { TILE_WIDTH, TILE_HEIGHT } from '../../constants'
import './SvgItem.css'

class SvgItem extends Component {
  render() {
    const { item: { name, faces }, gridTile, perspAngle } = this.props
    let coords = utils.coordsFor(gridTile)
    coords.x = coords.x + (TILE_WIDTH / 2)
    coords.y = coords.y + (TILE_HEIGHT / 2)
    let paths = utils.facesToSVGCommands(faces, coords, perspAngle)
  
    return (
      <g className={`${name} translucent wireframe`}>
        {paths.map((path, i) => {
          return <path key={i} d={path} />
        })}
      </g>
    )
  }
}

export default SvgItem
