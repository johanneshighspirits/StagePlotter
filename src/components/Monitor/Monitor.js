import React, { Component } from 'react'
import { TILE_WIDTH, TILE_HEIGHT } from '../../constants'
import utils from '../../utils'
import './Monitor.css'

const Point = (cmd, x, y, z) => {
  return { cmd, x, y, z }
}

const dFrom3DPoints = (points, offset) => {
  console.log(offset)
  let unit = TILE_WIDTH / 2
  let d = points.map((point, i) => {
    let x = point.x * unit + (point.z * unit / 2)
    let y = unit * point.y - (point.z * unit / 2)
    return `${point.cmd}${offset.x + x} ${offset.y + y}`
  })
  d.push('Z')
  return d.join(' ')
}

const Monitor = ({ gridTile }) => {
  let coords = utils.coordsFor(gridTile)
  coords.x = coords.x + (TILE_WIDTH / 2)
  coords.y = coords.y + (TILE_HEIGHT / 2)
  let size = {
    width: TILE_WIDTH,
    height: TILE_HEIGHT / 2
  }

  let bottomSquare = dFrom3DPoints([
    new Point('M', 0, 0, 0),
    new Point('L', 1, 0, 0),
    new Point('L', 1, 0, 1),
    new Point('L', 0, 0, 1),
  ], {x: coords.x, y: coords.y})
  
  let topSquare = dFrom3DPoints([
    new Point('M', 0, 1, 0),
    new Point('L', 1, 1, 0),
    new Point('L', 1, 1, 1),
    new Point('L', 0, 1, 1),
  ], {x: coords.x, y: coords.y})

  return (
    <g className='monitor'>
      <path d={bottomSquare} />
      <path d={topSquare} />
    </g>
  )
}

export default Monitor
