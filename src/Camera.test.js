import Camera from './Camera'

describe('Camera', () => {
  let camera = new Camera()

  function testProjection(vertex, point) {
    describe(`when given a 3d vertex ${vertex.x},${vertex.y},${vertex.z}`, () => {
      test(`should project correct point ${point.x},${point.y}`, () => {
        let screenPoint = camera.project(vertex)
        console.log('3d', vertex)
        console.log('2d', screenPoint)
        // expect(screenPoint.x).toBeCloseTo(point.x)
        // expect(screenPoint.y).toBeCloseTo(point.y)
      })
    })
  }

  describe('flat landscape plane', () => {

  })
  const verticesAndPoints = [
    [
      { x: -10, y: 0, z: 10 },
      { x: 0, y: 0 }
    ],
    [
      { x: 10, y: 0, z: 10 },
      { x: 0, y: 0 }
    ],
    [
      { x: 10, y: 16, z: 10 },
      { x: 0, y: 0 }
    ],
    [
      { x: -10, y: 16, z: 10 },
      { x: 0, y: 0 }
    ],
  ]
  verticesAndPoints.forEach(vertexAndPoint => {
    testProjection(vertexAndPoint[0], vertexAndPoint[1])
  })
  const verticesAndPoints2 = [
    [
      { x: -15, y: 30, z: 10 },
      { x: 0, y: 0 }
    ],
    [
      { x: 15, y: 30, z: 10 },
      { x: 0, y: 0 }
    ],
    [
      { x: 15, y: 30, z: 50 },
      { x: 0, y: 0 }
    ],
    [
      { x: -15, y: 30, z: 50 },
      { x: 0, y: 0 }
    ],
  ]
  verticesAndPoints2.forEach(vertexAndPoint => {
    testProjection(vertexAndPoint[0], vertexAndPoint[1])
  })
  
})