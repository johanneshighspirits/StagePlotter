import ObjParser from './ObjParser'
import Point from './Point'

const validCubeObjFileAsString = `# This file uses centimeters as units for non-parametric coordinates.

g default
v -2.000000 0.000000 3.000000
v 2.000000 0.000000 3.000000
v -2.000000 4.000000 3.000000
v 2.000000 4.000000 3.000000
v -2.000000 4.000000 -3.000000
v 2.000000 4.000000 -3.000000
v -2.000000 0.000000 -3.000000
v 2.000000 0.000000 -3.000000
vt 0.375000 0.000000
vt 0.625000 0.000000
vt 0.375000 0.250000
vt 0.625000 0.250000
vt 0.375000 0.500000
vt 0.625000 0.500000
vt 0.375000 0.750000
vt 0.625000 0.750000
vt 0.375000 1.000000
vt 0.625000 1.000000
vt 0.875000 0.000000
vt 0.875000 0.250000
vt 0.125000 0.000000
vt 0.125000 0.250000
g pCube1
f 1/1 2/2 4/4 3/3
f 3/3 4/4 6/6 5/5
f 5/5 6/6 8/8 7/7
f 7/7 8/8 2/10 1/9
f 2/2 8/11 6/12 4/4
f 7/13 1/1 3/3 5/14
`
const validThreeCubesObjFileAsString = `# This file uses centimeters as units for non-parametric coordinates.

g default
v -6.067946 0.000000 8.175728
v -2.931914 0.000000 8.175728
v -6.067946 3.999978 8.175728
v -2.931914 3.999978 8.175728
v -6.067946 3.999978 4.959470
v -2.931914 3.999978 4.959470
v -6.067946 0.000000 4.959470
v -2.931914 0.000000 4.959470
vt 0.375000 0.000000
vt 0.625000 0.000000
vt 0.375000 0.250000
vt 0.625000 0.250000
vt 0.375000 0.500000
vt 0.625000 0.500000
vt 0.375000 0.750000
vt 0.625000 0.750000
vt 0.375000 1.000000
vt 0.625000 1.000000
vt 0.875000 0.000000
vt 0.875000 0.250000
vt 0.125000 0.000000
vt 0.125000 0.250000
g pCube3
f 1/1 2/2 4/4 3/3
f 3/3 4/4 6/6 5/5
f 5/5 6/6 8/8 7/7
f 7/7 8/8 2/10 1/9
f 2/2 8/11 6/12 4/4
f 7/13 1/1 3/3 5/14
g default
v -2.000000 0.000000 3.000000
v 2.000000 0.000000 3.000000
v -2.000000 4.000000 3.000000
v 2.000000 4.000000 3.000000
v -2.000000 4.000000 -3.000000
v 2.000000 4.000000 -3.000000
v -2.000000 0.000000 -3.000000
v 2.000000 0.000000 -3.000000
vt 0.375000 0.000000
vt 0.625000 0.000000
vt 0.375000 0.250000
vt 0.625000 0.250000
vt 0.375000 0.500000
vt 0.625000 0.500000
vt 0.375000 0.750000
vt 0.625000 0.750000
vt 0.375000 1.000000
vt 0.625000 1.000000
vt 0.875000 0.000000
vt 0.875000 0.250000
vt 0.125000 0.000000
vt 0.125000 0.250000
g pCube1
f 9/15 10/16 12/18 11/17
f 11/17 12/18 14/20 13/19
f 13/19 14/20 16/22 15/21
f 15/21 16/22 10/24 9/23
f 10/16 16/25 14/26 12/18
f 15/27 9/15 11/17 13/28
g default
v -0.594776 -0.000000 -2.652112
v 4.216208 -0.000000 -2.652112
v -0.594776 1.805561 -2.652112
v 4.216208 1.805561 -2.652112
v -0.594776 1.805561 -6.102974
v 4.216208 1.805561 -6.102974
v -0.594776 -0.000000 -6.102974
v 4.216208 -0.000000 -6.102974
vt 0.375000 0.000000
vt 0.625000 0.000000
vt 0.375000 0.250000
vt 0.625000 0.250000
vt 0.375000 0.500000
vt 0.625000 0.500000
vt 0.375000 0.750000
vt 0.625000 0.750000
vt 0.375000 1.000000
vt 0.625000 1.000000
vt 0.875000 0.000000
vt 0.875000 0.250000
vt 0.125000 0.000000
vt 0.125000 0.250000
g pCube2
f 17/29 18/30 20/32 19/31
f 19/31 20/32 22/34 21/33
f 21/33 22/34 24/36 23/35
f 23/35 24/36 18/38 17/37
f 18/30 24/39 22/40 20/32
f 23/41 17/29 19/31 21/42
`
function validateResultIsOfCorrectType(pointGroups) {
  expect(pointGroups).toBeInstanceOf(Array)
  expect(pointGroups[0]).toBeInstanceOf(Array)
  expect(pointGroups[0][0]).toBeInstanceOf(Point)
}

describe('Obj File Parser', () => {
  let objParser
  beforeEach(() => {
    objParser = new ObjParser()
  })

  afterEach(() => {
    objParser = null
  })

  describe('from valid .obj string', () => {
    let validCubePointGroups
    let validThreeCubesPointGroups
    beforeEach(() => {
      validCubePointGroups = objParser.parseString(validCubeObjFileAsString)
      validThreeCubesPointGroups = objParser.parseString(validThreeCubesObjFileAsString)
    })
    afterEach(() => {
      validCubePointGroups = null
      validThreeCubesPointGroups = null
    })
    describe('should return an array of arrays containing Points', () => {
      test('when given one cube', () => {
        validateResultIsOfCorrectType(validCubePointGroups)
      })
      test('when given three cubes', () => {
        validateResultIsOfCorrectType(validThreeCubesPointGroups)
      })
    })

    describe('should return', () => {
      test('1 group of 8 points when given one cube', () => {
        expect(validCubePointGroups).toHaveLength(1)
        expect(validCubePointGroups[0]).toHaveLength(8)
      })
      test('3 groups of 8 points when given three cubes', () => {
        expect(validThreeCubesPointGroups).toHaveLength(3)
        validThreeCubesPointGroups.forEach(cubeGroup => {
          expect(cubeGroup).toHaveLength(8)
        })
      })
    })

    describe('point xyz values should be of type Number', () => {
      test('when given one cube', () => {
        let objectPoints = validCubePointGroups[0]
        objectPoints.forEach(point => {
          expect(typeof point.x).toBe('number')
          expect(typeof point.y).toBe('number')
          expect(typeof point.z).toBe('number')
        })
      })
      test('when given three cubes', () => {
        validThreeCubesPointGroups.forEach(cubeGroup => {
          cubeGroup.forEach(point => {
            expect(typeof point.x).toBe('number')
            expect(typeof point.y).toBe('number')
            expect(typeof point.z).toBe('number')
          })
        })
      })
    })
    test('point cmd value should be of type String', () => {
      let objectPoints = validCubePointGroups[0]
      objectPoints.forEach(point => {
        expect(typeof point.cmd).toBe('string')
      })
    })
  })

  describe('from valid external .obj file', () => {
    describe('should return an array of arrays containing Points', () => {
      test('when given 1 cube', async () => {
        expect.assertions(3)
        let fileContentAsString = await objParser.parseFile('validCubeFile.obj')
        validateResultIsOfCorrectType(fileContentAsString)
      })
      test('when given 3 cubes', async () => {
        expect.assertions(3)
        let fileContentAsString = await objParser.parseFile('validThreeCubesFile.obj')
        validateResultIsOfCorrectType(fileContentAsString)
      })
    })
  })
})

