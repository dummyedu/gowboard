import React, { Component } from 'react';

import styled from 'styled-components';

import BoardCanvas from './canvas/boardcanvas';
import { swapString } from './utils';

const TableBanner2 = styled.table`
	border-radius: 8px; 
	border: 2px solid #000000;
	padding: 1;
`;

const BoardDiv = styled.div`
  float: left;
`;

const hintComponent = (<span>
  Hello,<br /><br />
  Please select a "Move Option" from the left side of the screen or click "Show answer" to reveal the best move.
  <br /><br />
</span>);

const answerTextComponent = (selection, correct) => {
  return (<span>
    You selected answer {swapString(selection)} &nbsp;&nbsp;&nbsp;
    { correct ? <span><b>(This is the best answer! GREAT JOB!)</b></span> : null }
    <br /><br />
    {
      selection.details.map((d, i) => (<BoardDiv>
        <br />
        Screen #{i}
        <br />
        <BoardCanvas blockSize={40} board={d.array} />
      </BoardDiv>))
    }
    
    {/* <div style="float: left;"><br>Screen #1<br><img src=pics\a1.png></div> */}
  </span>);
};

class Answer extends Component {
  render() {
    const { correct, board, selection } = this.props;
    return (
      <td>
        <TableBanner2><tr><td>
          {
            selection ? answerTextComponent(selection, correct) : hintComponent
          }
        </td></tr></TableBanner2>
      </td>
    );
  }
};

export default Answer;
