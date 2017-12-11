import React from 'react'
import ReactDOM from 'react-dom'
import Canvas from './components/Canvas'
import Importer from './components/Importer'

const App = () => {
  return (
    <div>
      <h1>StagePlotter 1.0</h1>
      <Importer />
      <Canvas />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))