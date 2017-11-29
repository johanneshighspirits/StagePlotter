import React, { Component } from 'react'
import { TILE_WIDTH, TILE_HEIGHT, PERSP_ANGLE, OPP_ANGLE } from '../../constants'
import utils from '../../utils'
import './Monitor.css'

const Point = (cmd, x, y, z) => {
  return { cmd, x, y, z }
}
const toRadians = (angle) => {
  return angle * (Math.PI / 180)
}
const dFrom3DPoints = (points, offset) => {
  let unit = TILE_WIDTH
  let perspAngleSin = Math.sin(toRadians(PERSP_ANGLE))
  let oppAngleSin = Math.sin(toRadians(OPP_ANGLE))
  let d = points.map((point, i) => {
    let x = point.x * unit * oppAngleSin + (point.z * unit) * oppAngleSin
    let y = (point.y * oppAngleSin) * unit + point.x * unit * perspAngleSin - point.z * unit * perspAngleSin
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
  ], { x: coords.x, y: coords.y })

  let topSquare = dFrom3DPoints([
    new Point('M', 0, 1, 0),
    new Point('L', 1, 1, 0),
    new Point('L', 1, 1, 1),
    new Point('L', 0, 1, 1),
  ], { x: coords.x, y: coords.y })

  return (
    <g className='monitor'>
      <path d={bottomSquare} />
      <path d={topSquare} />
    </g>
  )
}

export default Monitor
