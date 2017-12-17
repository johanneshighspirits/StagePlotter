import fs from 'fs'
import readline from 'readline'
import path from 'path'
import Point from './Point'
import { Writable, Readable } from 'stream'
import { EventEmitter } from 'events'

export class ObjFileListParser extends EventEmitter {
  /**
   * Parses file(s) loaded from html form input (user
   * uploaded files)
   */
  constructor(fileList) {
    super(fileList)
    this.fileList = fileList
    this.objects = []
  }

  start = () => {
    // Create array of Promises for each file
    let filesPromises = Array.prototype.map.call(this.fileList, (file, index) => {
      this.objects[index] = {
        fileName: file.name.replace('.obj', ''),
        value: '0%'
      }
      this.emit(
        'parseStart',
        index,
        this.objects[index].fileName,
        this.objects[index].value
      )
      let objParser = new ObjParser()
      let chunkSize = 100
      let startPos = 0
      let endPos = chunkSize
      let fileStream = new Readable({
        read() {
          if (startPos <= file.size) fileReader.readAsArrayBuffer(file.slice(startPos, endPos))
        }
      })
      let fileReader = new FileReader()
      let progress = 0
      fileReader.onprogress = (e) => {
        if (e.lengthComputable) {
          progress += e.loaded
          this.emit(
            'parseProgress',
            index,
            this.objects[index].fileName,
            `${Math.round(Math.min(progress, file.size) / file.size * 100)}%`
          )
        }
      }
      fileReader.onload = () => {
        let chunk = new Uint8Array(fileReader.result)
        // console.log(chunk)
        startPos += chunkSize
        endPos += chunkSize
        fileStream.push(chunk)
        if (startPos >= file.size) {
          fileStream.push(null)
          this.emit(
            'parseComplete',
            index,
            this.objects[index].fileName,
            '100%'
          )
        }
      }
      fileReader.readAsArrayBuffer(file.slice(startPos, endPos))
      return objParser.parseStream(fileStream)
    })
    return Promise.all(filesPromises)
  }

}

class ObjParser {
  constructor() {
    this.typeRegex = /^[vgf]\s/i
    this.spacesRegex = /\s/gi
    this.reset()
  }

  reset = () => {
    this.objects = []
    this.allVertices = []
    this.resetCurrObject()
  }

  resetCurrObject = () => {
    this.currObject = {
      name: '',
      vertices: [],
      faces: []
    }
  }

  parseStream = (fileStream) => {
    console.log('parseStream()')
    return new Promise((resolve, reject) => {
      let outStream = new Writable({
        write(chunk, encoding, callback) {
          let lines = chunk.toString().split('\n')
          if (this.lastChunk) {
            lines[0] = this.lastChunk + lines[0]
          }
          this.lastChunk = lines.pop()
          lines.forEach(line => {
            this.parseLine(line)
          })
          callback()
        }
      })
      outStream.typeRegex = this.typeRegex
      outStream.parseLine = this.parseLine
      outStream.on('finish', () => {
        this.objects.push(this.currObject)
        console.log('ObjParser.parseStream finished')
        console.log(this.objects)
        resolve(this.objects)
      })

      fileStream.pipe(outStream)
    })
  }

  parseFile = (filePath) => {
    return new Promise(resolve => {
      // Reset parser
      this.reset()
      let fileStream = fs.createReadStream(path.join(__dirname, filePath))
      let lineReader = readline.createInterface(fileStream)
      lineReader.on('line', line => {
        if (this.typeRegex.test(line)) {
          this.parseLine(line)
        }
      })
      lineReader.on('close', () => {
        // Add the last parsed object to array
        this.objects.push(this.currObject)
        resolve(this.objects)
      })
    })
  }

  parseLine = (line) => {
    let values = line.split(this.spacesRegex)
    switch (values[0]) {
      case 'g':
        // This is a group
        if (values[1].trim() === 'default') {
          // This is the beginning of a group
          // Store any parsed point groups
          if (this.currObject.vertices.length > 0) {
            this.currObject.name = values[1]
            this.objects.push(this.currObject)
          }
          // Reset this.currObject
          this.resetCurrObject()
        } else {
          // Set name
          this.currObject.name = values[1].trim()
        }
        break
      case 'v': {
        // This is a vertex, store point in this.currObject array
        // Remove first value (`v`)
        values.shift()
        // If this is first point, cmd should be `M` otherwise `L`
        let cmd = this.currObject.vertices.length === 0 ? 'M' : 'L'
        let point = new Point(cmd, ...values.map(value => parseFloat(value, 10)))
        this.allVertices.push(point)
        this.currObject.vertices.push(point)
      }
        break
      case 'f': {
        // This is a face
        // Remove first value (`f`)
        values.shift()

        let face = values.map(f => {
          let vertexIndex = f.substring(0, f.indexOf('/'))
          // Arrays are zero based but obj vertice index starts at 1
          vertexIndex = parseInt(vertexIndex, 10) - 1
          return this.allVertices[vertexIndex]
        })
        this.currObject.faces.push(face)
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
    // Reset parser
    this.reset()
    let rows = string.split(/\n/gi)
    rows.forEach(line => {
      if (this.typeRegex.test(line)) {
        this.parseLine(line)
      }
    })
    this.objects.push(this.currObject)
    return this.objects
  }
}

export default ObjParser