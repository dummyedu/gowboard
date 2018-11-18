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

const ShadowDiv = styled.div`
  border: 1px solid;
  padding: 10px;
  box-shadow: 5px 10px 8px 10px #888888;
`

class ShareDesc extends Component {
  
  render() {
    return (
      <table width='600'><tr><td>
      <ShadowDiv>
        <center>
          <table cellpadding='5'>
            <tr>
              <td>
                <Span2>
                  <u>The board</u>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Span2>
                <br /><br />
                <div>Watch the result</div>
              </td>
              <td>
                <BoardCanvas blockSize={40} board={this.props.board} />
              </td>
            </tr>
          </table>
        </center>
      </ShadowDiv>
      <br />
    </td></tr></table>
    );
  }
};

export default ShareDesc;
