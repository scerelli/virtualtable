import React, { PropTypes, Component } from 'react'

const ToolSet = (props) => {

  return (
    <div className='tools-wrapper'>
      <button onClick={props.createSquare}>create square</button>
      <button onClick={props.createCircle}>create circle</button>
    </div>
  )
}

export default ToolSet
