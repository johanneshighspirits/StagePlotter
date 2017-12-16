import { TILE_WIDTH, TILE_HEIGHT, TILES_IN_X, TILES_IN_Y } from './constants'

const utils = {
  coordsFor: (gridTile) => {
    let coords = {
      x: Math.floor(gridTile % TILES_IN_X) * TILE_WIDTH,
      y: Math.floor(gridTile / TILES_IN_X) * TILE_HEIGHT
    }
    if (isNaN(coords.x)) return { x: 0, y: 0 }
    return coords
  },
  tileFor: (x, y) => {
    let xTileIndex = Math.floor(x / TILE_WIDTH)
    let yTileIndex = Math.floor(y / TILE_HEIGHT)
    let tileIndex = xTileIndex + (yTileIndex * TILES_IN_X)
    return tileIndex
  },
  toRadians: (angle) => {
    return angle * (Math.PI / 180)
  },
  pointsToSVGCommands: (points, offset = { x:0, y:0 }, perspAngle) => {
    const commands = points.map(point => {
      if (point.cmd === point.cmd.toLowerCase()) throw new Error('You must provide absolute coordinates to utils.pointsToSVGCommands(). Only uppercased commands.')
      if (point.is3d()) point = point.to2d(perspAngle)
      return `${point.cmd}${offset.x + point.x} ${offset.y + point.y}`
    })
    return commands.join(' ') + 'Z'
  },
  facesToSVGCommands: (faces, offset = { x:0, y:0 }, perspAngle) => {
    return faces.map(face => {
      let isFirst = true
      const path = face.map(point => {
        if (point.cmd === point.cmd.toLowerCase()) throw new Error('You must provide absolute coordinates to utils.pointsToSVGCommands(). Only uppercased commands.')
        if (point.is3d()) point = point.to2d(perspAngle)
        let cmd = `${isFirst ? 'M' : 'L'}${offset.x + point.x} ${offset.y + point.y}`
        isFirst = false
        return cmd
      })
      return path.join(' ') + 'Z'
    })
  },


}

export default utils