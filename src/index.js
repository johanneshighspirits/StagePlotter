import React from 'react'
import ReactDOM from 'react-dom'
import Canvas from './components/Canvas'

const App = () => {
  return (
    <div>
      <h1>StagePlotter</h1>
      <Canvas />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))