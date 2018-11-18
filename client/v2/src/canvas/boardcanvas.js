import React, { Component } from 'react';

import { renderToCanvas } from './prepare';

class BoardCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;
  }
  renderToCanvas() {
    if (this.canvas !== null && this.props.board !== this.renderedBoard
      && this.props.board !== null) {
        renderToCanvas(this.canvas, this.props.board, this.props.blockSize, true);
        this.renderedBoard = this.props.board;
      }
  }

  getCanvasSize() {
    return {
      width: this.props.blockSize * 9,
      height: this.props.blockSize * 9,
    }
  }

  componentDidMount() {
    const size = this.getCanvasSize();
    this.canvas.width = size.width;
    this.canvas.height = size.height;
    this.renderToCanvas();
  }

  render() {
    this.renderToCanvas();
    const size = this.getCanvasSize();
    return (<canvas ref={c => { this.canvas = c; }} style={{
      display: (this.props.board !== null) ? 'inline' : 'none',
      width: size.width,
      height: size.height,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
    }}/>);
  }
}

BoardCanvas.defaultProps = {
  board: null,
};

export default BoardCanvas;
