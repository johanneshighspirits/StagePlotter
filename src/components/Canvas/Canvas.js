import React, { Component } from 'react'
import './Canvas.css'
  
class Canvas extends Component {
  render() {
    return (
      <div>
        draw
        <canvas width='800' height='600'></canvas>
      </div>
    )
  }
}

export default Canvas;
