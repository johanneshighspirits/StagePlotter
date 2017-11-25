import React, { Component } from 'react'
import Monitor from '../Monitor'
import './PreviewArea.css'

class PreviewArea extends Component {
  shapeFor = (item, i) => {
    switch (item.identifier) {
    case 'monitor':
      return <Monitor key={i} x={item.x} y={item.y} />
    default:
      throw new Error(item.identifier + ' is not defined as a shape')
    }
  }

  render() {
    let items = this.props.layers.map(this.shapeFor)
    console.log(items)
    return (
      <div className='previewArea'>
        <svg width={this.props.width} height={this.props.height} viewBox={`0 0 ${this.props.width} ${this.props.height}`} xmlns="http://www.w3.org/2000/svg">
          {items}
        </svg>
      </div>
    )
  }
}

export default PreviewArea
