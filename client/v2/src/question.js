import React, { Component } from 'react';
import styled from 'styled-components';

import BoardCanvas from './canvas/boardcanvas';

const Span2 = styled.span`
  font-size: 25px;
  color: #000000;
	font-family: 'Permanent Marker', cursive;
	font-weight: normal;
	line-height: 30px;
	text-align: center;
`;

class Question extends Component {
  render() {
    return (
      <table width='600'><tr><td>
      <div id='shadowBox'>
        <center>
          <table cellpadding='5'>
            <tr>
              <td>
                <Span2>
                  <u>Starting board layout</u>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Span2>
                <br /><br />
                <div>Based on the board layout below please select</div>
                <div>the best move from the move options below.</div>
              </td>
              <td>
                <BoardCanvas blockSize={30} board={this.props.board} />
              </td>
            </tr>
          </table>
        </center>
      </div>
      <br />
    </td></tr></table>
    );
  }
};

export default Question;
