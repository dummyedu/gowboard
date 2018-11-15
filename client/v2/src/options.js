import React, { Component } from 'react';

import styled from 'styled-components';

const Span3 = styled.span`
  font-size: 15px;
  color: #000000;
	font-family: 'Permanent Marker', cursive;
	font-weight: normal;
	line-height: 30px;
	text-align: center;
`;

class Options extends Component {
  render() {
    return (
      <td>
        <table id='tableBanner1'><tr><td>
          <center>
            <Span3><u>Move options:</u></Span3>
            <br className='br5' />
            <div className='greenButton1'>6B -> 6C</div>
            <br className='br2' />
            <div className='greenButton1'>6B -> 6C</div>
            <br className='br2' />
            <div className='greenButton1'>6B -> 6C</div>
            <br className='br2' />
            <div className='greenButton1'>6B -> 6C</div>
            <br className='br2' />
          </center>
        </td></tr></table>
        <br className='br5' />
        <div className='greenButton1'>Show answer</div>
      </td>
    );
  }
};

export default Options;
