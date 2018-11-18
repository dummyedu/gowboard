import React, { Component } from 'react';

import styled from 'styled-components';
import Loading from './loading';
import { getBoard } from './request';
import { isImagePrepared } from './canvas/prepare';
import BoardCanvas from './canvas/boardcanvas';
import ShareDesc from './sharedesc';

const Span1 = styled.span`
  font-size: 55px;
  color: #000000;
	font-family: 'Permanent Marker', cursive;
	font-weight: normal;
	line-height: 30px;
	text-align: center;
`;

const BoardDiv = styled.div`
  float: left;
`;

class Share extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { loading: true };
  }

  loadBoard() {
    getBoard(this.props.board)
      .then((answer) => {
        this.setState({ error: null, loading: false, answer });
      })
      .then((e) => {
        this.setState({ error: e, loading: false });
      })
  }

  componentWillMount() {
    this.loadBoard();
    let id = 0;
    id = setInterval(() => {
      if (isImagePrepared()) {
        clearInterval(id);
        this.setState({ complete: true });
      }
    }, 100);
  }

  render() {
    const selection = this.state.answer;
    console.log(this.props.board);
    return (
      <div>
        <br></br>
        <center>
          <Span1>
            <u>Gems of War trainer</u>
          </Span1>
          <br /><br /><br /><br />
          {
            (this.state.loading || !this.state.complete) ? <Loading /> : (<div>
              <ShareDesc board={this.props.board}/>
              <table cellpadding='20'>
                <tr valign='top'>
                {
                  selection.details.map((d, i) => (<BoardDiv>
                    <br />
                    Screen #{i}
                    <br />
                    <BoardCanvas blockSize={40} board={d.array} />
                  </BoardDiv>))
                }
                </tr>
              </table>
            </div>)
          }
        </center>
      </div>
    );
  }
}

export default Share;
