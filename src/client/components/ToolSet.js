import React, { PropTypes, Component } from 'react'

const ToolSet = (props) => {

  return (
    <div className='tools-wrapper'>
      <button onClick={props.createSquare}><div className='tool tools-square'></div></button>
      <button onClick={props.createCircle}><div className='tool tools-circle'></div></button>
      <button onClick={props.createImage}><div className='tool tools-circle'></div></button>
    </div>
  )
}

export default ToolSet
