import React, { Component } from 'react';

import styled from 'styled-components';
import Question from './question';
import Options from './options';
import Answer from './answer';

const Span1 = styled.span`
  font-size: 55px;
  color: #000000;
	font-family: 'Permanent Marker', cursive;
	font-weight: normal;
	line-height: 30px;
	text-align: center;
`;

class App extends Component {
  render() {
    return (
      <div>
        <br></br>
        <center>
          <Span1>
            <u>Gems of War trainer</u>
          </Span1>
          <br /><br /><br /><br />

          <Question />

          <table cellpadding='20'>
            <tr valign='top'>
              <Options />
              <Answer />
            </tr>
          </table>
        </center>
      </div>
    );
  }
}

export default App;
