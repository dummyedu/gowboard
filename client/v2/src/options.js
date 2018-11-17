import React, { Component } from 'react';

import styled from 'styled-components';

import { swapString } from './utils';

const Span3 = styled.span`
  font-size: 15px;
  color: #000000;
	font-family: 'Permanent Marker', cursive;
	font-weight: normal;
	line-height: 30px;
	text-align: center;
`;

const GreenButton = styled.div`
  text-align:center;
	font-family: Cabin, Georgia, serif;
	font-size: 12px;
  font-weight: 600;
	font-style: normal;
	color: white;
  background:#07422f;
  width: 100px;
  height: 35px;
	line-height: 35px;
	vertical-align: middle;
  border-radius:15px;
  &:hover {
    background: #128761;
  }
  margin-bottom: 15px;
`;

// const Br2 = styled.br`
//   display: block;
//   margin: 2px 0;
// `

const Br5 = styled.br`
  display: block;
  margin: 5px 0;
`

const TableBanner1 = styled.table`
	border-radius: 8px; 
	border: 2px solid #07422f;
	width: 120;
	padding: 1;
`

class Options extends Component {
  render() {
    const { question } = this.props;
    return (
      <td>
        <TableBanner1><tr><td>
          <center>
            <Span3><u>Move options:</u></Span3>
            <Br5 />
            {
              question.options.map((op, i) => {
                const desc = swapString(op);
                return <GreenButton key={i} onClick={this.props.onSelect.bind(null, i)}>{desc}</GreenButton>
              })
            }
          </center>
        </td></tr></TableBanner1>
        <Br5 />
        <GreenButton onClick={() => this.props.onSelect(question.answer)}>Show answer</GreenButton>
      </td>
    );
  }
};

export default Options;
