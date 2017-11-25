import React, { Component } from 'react'
import './Monitor.css'

const Monitor = ({ x, y }) => {
  return (
    <rect x={x} y={y} width="100" height="40" />
  )
}

export default Monitor
