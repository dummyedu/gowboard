import React, { Component } from 'react';

import styled from 'styled-components';
import Question from './question';
import Options from './options';
import Answer from './answer';
import Loading from './loading';
import { getQuestion, getQuestionWithBoard } from './request';
import { isImagePrepared } from './canvas/prepare';
import Clipboard from 'react-clipboard.js';
import clippyImg from './assets/clippy.png';

const Span1 = styled.span`
  font-size: 55px;
  color: #000000;
	font-family: 'Permanent Marker', cursive;
	font-weight: normal;
	line-height: 30px;
	text-align: center;
`;

const ClippyImage = styled.img`
  width: 15px;
  height: 15px;
`;

const RightButton = styled.button`
  float: right;
`

const RightDiv = styled.div`
  text-align: right;
`

const ClippyInput = styled.input`
  width: 800px;
`

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { loading: false, selection: -1, complete: false, sharing: false };
  }

  shareBoard() {
    const url = `${window.location.origin}/index.html?board=${this.state.question.board.join('')}`;
    this.setState({ sharing: url });
    console.log(url);
  }

  loadNextQuestion(difficulty) {
    if (this.state.loading) {
      return;
    }
    this.setState({ loading: true, selection: -1 });
    const promise = this.props.shareBoard ? getQuestionWithBoard(this.props.shareBoard) : getQuestion(difficulty);
    promise
      .then((question) => {
        this.setState({ error: null, loading: false, question });
      })
      .then((e) => {
        this.setState({ error: e, loading: false });
      })
  }

  componentWillMount() {
    this.loadNextQuestion(2);
    let id = 0;
    id = setInterval(() => {
      if (isImagePrepared()) {
        clearInterval(id);
        this.setState({ complete: true });
      }
    }, 100);
  }

  onSelectAnswer(selection) {
    this.setState({ selection });
  }

  render() {
    const question = this.state.question;
    return (
      <div>
        <br></br>
        <center>
          <Span1>
            <u>Gems of War trainer</u>
          </Span1>
          <br /><br /><br /><br />
          {
            (this.state.loading || !question || !this.state.complete) ? <Loading /> : (<div>
              {
              this.props.shareBoard ? null : <div>
                <button onClick={() => this.loadNextQuestion(1)}>Easy</button>
                <button onClick={() => this.loadNextQuestion(3)}>Normal</button>
                <button onClick={() => this.loadNextQuestion(5)}>Hard</button>
                <button onClick={() => this.loadNextQuestion(10)}>Doom</button>
                {/* <button onClick={() => this.loadNextQuestion(20)}>Versatile</button> */}
                {
                  this.state.sharing ? (<RightDiv>
                    <ClippyInput id="foo" value={this.state.sharing} />
                    <Clipboard data-clipboard-text={this.state.sharing}>
                      <ClippyImage src={clippyImg} alt="Copy to clipboard" />
                    </Clipboard>
                  </RightDiv>) : (<RightButton onClick= {() => this.shareBoard()}>Share board</RightButton>)
                }
              </div>
              }
              <Question board={question.board}/>
              <table cellpadding='20'>
                <tr valign='top'>
                  <Options
                    question={question.questions}
                    onSelect={this.onSelectAnswer.bind(this)}
                  />
                  <Answer
                    correct={question.questions.answer === this.state.selection}
                    board={question.board}
                    selection={question.questions.options[this.state.selection]}
                  />
                </tr>
              </table>
            </div>)
          }
        </center>
      </div>
    );
  }
}

export default App;
