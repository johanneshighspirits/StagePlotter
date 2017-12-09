import React, { Component } from 'react'
import { TILE_WIDTH, TILE_HEIGHT } from '../../constants'
import utils from '../../utils'
import './Monitor.css'
import Point from '../../Point'

const Monitor = ({ gridTile, perspAngle }) => {
  let coords = utils.coordsFor(gridTile)
  coords.x = coords.x + (TILE_WIDTH / 2)
  coords.y = coords.y + (TILE_HEIGHT / 2)

  let bottomSquare = [
    new Point('M', 0, 0, 0),
    new Point('L', 1, 0, 0),
    new Point('L', 1, 0, 0.2),
    new Point('L', 1.2, 0, 0.2),
    new Point('L', 1.2, 0, 0.4),
    new Point('L', 1, 0, 0.4),
    new Point('L', 1, 0, 1),
    new Point('L', 0, 0, 1),
  ]

  let topSquare = [
    new Point('M', 0, 0.5, 0),
    new Point('L', 1, 0.5, 0),
    new Point('L', 1, 0.5, 1),
    new Point('L', 0, 0.5, 1),
  ]

  let topSquare2d = utils.pointsToSVGCommands(topSquare, coords, perspAngle)
  let bottomSquare2d = utils.pointsToSVGCommands(bottomSquare, coords, perspAngle)
  
  console.log(bottomSquare2d)
  console.log(topSquare2d)

  return (
    <g className='monitor'>
      <path d={bottomSquare2d} />
      <path d={topSquare2d} />
    </g>
  )
}

export default Monitor
