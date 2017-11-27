import * as constants from './constants'

const utils = {
  coordsFor: (gridTile) => {
    let coords = {
      x: Math.floor(gridTile % constants.TILES_IN_X) * constants.TILE_WIDTH,
      y: Math.floor(gridTile / constants.TILES_IN_X) * constants.TILE_HEIGHT
    }
    if (isNaN(coords.x)) return { x: 0, y: 0 }
    return coords
  },
  tileFor: (x, y) => {
    let xTileIndex = Math.floor(x / constants.TILE_WIDTH)
    let yTileIndex = Math.floor(y / constants.TILE_HEIGHT)
    let tileIndex = xTileIndex + (yTileIndex * constants.TILES_IN_X)
    return tileIndex
  }

}

export default utils