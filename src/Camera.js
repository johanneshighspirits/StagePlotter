
class Camera {
  constructor() {
    this.distance = 50
    this.screen = {
      width: 1600,
      height: 900
    }
    this.center = {
      x: this.screen.width * 0.5,
      y: this.screen.height * 0.5
    }
  }

  /**
   * Convert a 3d vertex to a 2d screen position
   * (Perspective projection)
   * 
   * @param {object} vertex - A 3d point to be converted `{ x:number, y:number, z:number }`
   * @param {boolean} isOrthographic - Set to true to return an ortohgraphic projection
   */
  project = (vertex, isOrthographic) => {
    if (isOrthographic) throw new Error('Orthographic projection is not implemented')
    if (vertex.z <= 0) return { x: undefined, y: undefined }
    let x = this.distance / vertex.z * vertex.x
    let y = this.distance / vertex.z * vertex.y
    if (isNaN(x)) x = 0
    if (isNaN(y)) y = 0
    let screenPoint = {
      x: x + this.center.x,
      y: (y + this.center.y) * -1
    }
    return screenPoint
  }

}

export default Camera