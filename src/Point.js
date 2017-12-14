import { TILE_WIDTH, PERSP_ANGLE } from './constants'
import utils from './utils'

function Point (cmd, x, y, z) {
  this.cmd = cmd
  this.x = x
  this.y = y
  this.z = z
}

Point.prototype.to2d = function(perspAngle = PERSP_ANGLE, offset = { x:0, y:0 }, unit = TILE_WIDTH) {
  let perspAngleSin = Math.sin(utils.toRadians(perspAngle))
  const oppAngle = 90 - perspAngle
  let oppAngleSin = Math.sin(utils.toRadians(oppAngle))
  let twoDimPoint = {
    cmd: this.cmd,
    x: offset.x + (this.x * unit * oppAngleSin + (this.z * unit) * oppAngleSin),
    y: offset.y + ((-this.y * oppAngleSin) * unit + this.x * unit * perspAngleSin - this.z * unit * perspAngleSin)
  }
  // console.log(this, 'becomes', twoDimPoint)
  return twoDimPoint
}

Point.prototype.is3d = function() {
  return this.z !== undefined
}

export default Point