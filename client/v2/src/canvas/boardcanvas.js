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
        renderToCanvas(this.canvas, this.props.board, this.props.blockSize);
        this.renderedBoard = this.props.board;
      }
  }

  componentDidMount() {
    this.canvas.width = this.props.blockSize * 8;
    this.canvas.height = this.props.blockSize * 8;
    this.renderToCanvas();
  }

  render() {
    this.renderToCanvas();
    return (<canvas ref={c => { this.canvas = c; }} style={{
      display: (this.props.board !== null) ? 'inline' : 'none',
      width: this.props.blockSize * 8,
      height: this.props.blockSize * 8,
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
