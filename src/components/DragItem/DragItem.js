import React, { Component } from 'react'
import './DragItem.css'
  
const DragItem = ({ identifier, handleDragStart, handleDragEnd, width, height, children }) => {
  let viewBox = `${width / -2} ${height / -2} ${width} ${height}`
  viewBox = '50 -50 100 100'
  return (
    <span
      data-identifier={identifier}
      draggable='true'
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <svg width={width} height={height} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
        {children}
      </svg>
    </span>
  )
}

export default DragItem
