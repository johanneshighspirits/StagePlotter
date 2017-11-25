import React, { Component } from 'react'
import './DragItem.css'
  
const DragItem = ({ identifier, handleDragStart, handleDragEnd, width, height, children }) => {
  return (
    <div
      data-identifier={identifier}
      draggable='true'
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
        {children}
      </svg>
    </div>
  )
}

export default DragItem
