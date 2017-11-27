import React, { Component } from 'react'
import { TILE_WIDTH, TILE_HEIGHT } from '../../constants'
import utils from '../../utils'
import './Monitor.css'

const Monitor = ({ gridTile }) => {
  let coords = utils.coordsFor(gridTile)
  coords.y = coords.y + (TILE_HEIGHT / 4)
  let size = {
    width: TILE_WIDTH,
    height: TILE_HEIGHT / 2
  }
  return (
    <g x="100">
      <rect className='monitor' {...coords} {...size} />
    </g>
  )
}

export default Monitor
