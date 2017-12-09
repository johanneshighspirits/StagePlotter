import utils from './utils'

describe('Point conversion', () => {
  it('toRadians should convert angles to radians correctly', () => {
    expect(utils.toRadians(180)).toBe(Math.PI)
    expect(utils.toRadians(90)).toBe(Math.PI / 2)
    expect(utils.toRadians(45)).toBe(Math.PI / 4)
  })
})