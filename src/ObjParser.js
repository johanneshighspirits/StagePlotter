import fs from 'fs'
import readline from 'readline'
import path from 'path'
import Point from './Point'
import { Writable, Readable } from 'stream'
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
    Array.prototype.forEach.call(this.fileList, (file, index) => {
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
      fileReader.onload = (e) => {
        let chunk = new Uint8Array(fileReader.result)
        console.log(chunk)
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
      objParser.parseStream(fileStream)
    })
  }
}

class ObjParser {
  constructor() {
    this.objects = []
    this.currObject = []
    this.typeRegex = /^[vg]\s/i
    this.spacesRegex = /\s/gi
  }

  reset = () => {
    this.objects = []
    this.currObject = []
  }

  parseStream = (fileStream) => {
    let outStream = new Writable({
      write(chunk, encoding, callback) {
        console.error(chunk.toString())
        callback()
      }
    })

    fileStream.pipe(outStream)
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
        resolve(this.objects)
      })
    })
  }

  parseLine = (line) => {
    let values = line.split(this.spacesRegex)
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
    // Reset parser
    this.reset()
    let rows = string.split(/\n/gi)
    rows.forEach(line => {
      if (this.typeRegex.test(line)) {
        this.parseLine(line)
      }
    })
    return this.objects
  }
}

export default ObjParser