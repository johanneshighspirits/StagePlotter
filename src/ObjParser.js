import fs from 'fs'
import readline from 'readline'
import path from 'path'
import Point from './Point'

class Objparser {
  constructor() {
    this.objects = []
    this.currObject = []
    this.typeRegex = /^[vg]\s/i
  }

  parseFile = (filePath) => {
    return new Promise(resolve => {
      // Reset parser
      this.objects = []
      this.currObject = []

      let fileStream = fs.createReadStream(path.join(__dirname, filePath))
      let lineReader = readline.createInterface(fileStream)
      lineReader.on('line', line => {
        if (this.typeRegex.test(line)) {
          this.parseLine(line)
        }
      })
      lineReader.on('close', () => {
        resolve(this.objects)
      })
    })
  }

  parseLine = (line) => {
    let values = line.split(/\s/gi)
    switch (values[0]) {
      case 'g':
        // This is a group
        // Store any parsed point groups
        if (this.currObject.length > 0) this.objects.push(this.currObject)
        // Reset this.currObject array
        this.currObject = []
        break
      case 'v': {
        // This is a vertex, store point in this.currObject array
        // Remove first value (`v`)
        values.shift()
        // If this is first point, cmd should be `M` otherwise `L`
        let cmd = this.currObject.length === 0 ? 'M' : 'L'
        let point = new Point(cmd, ...values.map(value => parseFloat(value, 10)))
        this.currObject.push(point)
      }
    }
  }

  /**
   * Returns a two dimensional array, representing groups
   * of points
   * 
   * @param {string} string - An `.obj` file's content
   * @returns {array<array<<Point>>} - A two dimensional array of Points
   */
  parseString = (string) => {
    if (!string) throw new Error('No string supplied')
    let objects = []
    let rows = string.split(/\n/gi)
    // Loop through rows
    let lastObject = rows.reduce((acc, row) => {
      let values = row.split(/\s/gi)
      switch (values[0]) {
        case 'g':
          // This is a group
          // Store any parsed point groups
          if (acc.length > 0) objects.push(acc)
          // Init new acc array
          acc = []
          break
        case 'v': {
          // This is a vertex, store point in acc array
          // Remove first value (`v`)
          values.shift()
          // If this is first point, cmd should be `M` otherwise `L`
          let cmd = acc.length === 0 ? 'M' : 'L'
          let point = new Point(cmd, ...values.map(value => parseFloat(value, 10)))
          acc.push(point)
        }
      }
      return acc
    }, [])
    if (lastObject.length > 0) objects.push(lastObject)
    return objects
  }
}

export default Objparser