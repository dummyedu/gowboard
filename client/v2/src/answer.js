import React, { Component } from 'react';

import styled from 'styled-components';

const TableBanner2 = styled.table`
	border-radius: 8px; 
	border: 2px solid #000000;
	padding: 1;
`

class Answer extends Component {
  render() {
    return (
      <td>
        <TableBanner2><tr><td>
          <span id='textbox0'>
            Hello,<br /><br />
            Please select a "Move Option" from the left side of the screen or click "Show answer" to reveal the best move.
            <br /><br />
          </span>
          <span id='textbox1'>
            You selected answer 5E -> 6E &nbsp;&nbsp;&nbsp; <b>(This is the best answer! GREAT JOB!)</b><br /><br />
          </span>
        </td></tr></TableBanner2>
      </td>
    );
  }
};

export default Answer;
