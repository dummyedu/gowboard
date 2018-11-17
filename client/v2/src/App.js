import React, { Component } from 'react';

import styled from 'styled-components';
import Question from './question';
import Options from './options';
import Answer from './answer';
import Loading from './loading';
import { getQuestion } from './request';

const Span1 = styled.span`
  font-size: 55px;
  color: #000000;
	font-family: 'Permanent Marker', cursive;
	font-weight: normal;
	line-height: 30px;
	text-align: center;
`;

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { loading: false, selection: -1 };
  }

  loadNextQuestion() {
    if (this.state.loading) {
      return;
    }
    this.setState({ loading: true });
    getQuestion(2)
      .then((question) => {
        this.setState({ error: null, loading: false, question });
      })
      .then((e) => {
        this.setState({ error: e, loading: false });
      })
  }

  componentWillMount() {
    this.loadNextQuestion();
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
            (this.state.loading || !question) ? <Loading /> : (<div>
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
