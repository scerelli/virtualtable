import React, { PropTypes, Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { fabric } from 'fabric'

import ToolSet from '../ToolSet'

const SQUARE_SIZE = 70
const GRID_SIZE = 6000
export default class Canvas extends Component {
  @observable canvas = null

  constructor(props, context, canvas) {
    super(props, context)
    this.canvas = canvas
    this.canvasNode = null

    this.buildGrid = this.buildGrid.bind(this)
    this.createCircle = this.createCircle.bind(this)
    this.createSquare = this.createSquare.bind(this)
    this.getCanvasPosition = this.getCanvasPosition.bind(this)
  }

  componentDidMount () {
    this.canvas = new fabric.Canvas('c', {
      width: GRID_SIZE,
      height: GRID_SIZE,
      selection: false
    })

    this.buildGrid()

    this.canvas.on('object:moving', options => {
      options.target.set({
        left: Math.round(options.target.left / SQUARE_SIZE) * SQUARE_SIZE,
        top: Math.round(options.target.top / SQUARE_SIZE) * SQUARE_SIZE
      })
    })
  }

  buildGrid () {
    for (var i = 0; i < (GRID_SIZE / SQUARE_SIZE); i++) {
      this.canvas.add(new fabric.Line([ i * SQUARE_SIZE, 0, i * SQUARE_SIZE, GRID_SIZE], { stroke: '#ccc', selectable: false }));
      this.canvas.add(new fabric.Line([ 0, i * SQUARE_SIZE, GRID_SIZE, i * SQUARE_SIZE], { stroke: '#ccc', selectable: false }))
    }
  }

  createCircle () {
    const { left, top } = this.getCanvasPosition()

    this.canvas.add(new fabric.Circle({
      left,
      top,
      radius: SQUARE_SIZE,
      stroke: '#9f9',
      fill: 'rgba(0,0,0,0.4)',
      originX: 'left',
      originY: 'top',
      centeredRotation: true
    }))
  }

  createSquare () {
    const { left, top } = this.getCanvasPosition()

    this.canvas.add(new fabric.Rect({
      left,
      top,
      width: SQUARE_SIZE,
      height: SQUARE_SIZE,
      fill: '#faa',
      originX: 'left',
      originY: 'top',
      centeredRotation: true
    }))
  }

  getCanvasPosition () {
    let scrollLeft = parseInt(this.refs.canvasWrapper.scrollLeft)
    let scrollTop = parseInt(this.refs.canvasWrapper.scrollTop)

    scrollTop = scrollTop < (GRID_SIZE - 100)
    ? this.adjustPosition(scrollTop + 100)
    : GRID_SIZE

    scrollLeft = scrollLeft < (GRID_SIZE - 100)
    ? this.adjustPosition(scrollLeft + 100)
    : GRID_SIZE

    return {
      top: scrollTop,
      left: scrollLeft
    }
  }

  adjustPosition (num) {
    while(num % SQUARE_SIZE !== 0) {
      num = num + 1
    }

    return num
  }

  render () {
    return (
      <div className='main' ref='canvasWrapper'>
        <ToolSet
          createCircle={this.createCircle}
          createSquare={this.createSquare} />
        <canvas ref='c' id='c' />
      </div>
    )
  }
}
