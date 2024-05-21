import React, { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  QuizMainBox,
  QuizMainTitle,
  QuizMainQuestion,
  QuizMainWrapper,
  QuizMainButton,
  QuizMainBottomMenu,
  QuizMainButtonGroup,
  QuizMainSecondaryButton,
  QuizMainIndexerButton,
  QuizMainIndexer,
  QuizMainProgress
} from './styles';
import { Radio, Space, ConfigProvider } from 'antd';

const questions = [
  {
    question: 'When is the Menton Lemon Festival held?',
    answers: [
      'Feb 12 - Feb 27',
      'Feb 13 - Feb 28',
      'Feb 12 - Feb 28',
      'Feb 13 - Feb 27'
    ],
    correctAnswer: 'Feb 12 - Feb 27'
  },
  {
    question: 'Where is the Menton Lemon Festival held?',
    answers: [
      'France',
      'Belgium',
      'Germany',
      'Vietnam'
    ],
    correctAnswer: 'France'
  },
]

const QuizMain = () => {
  const [value, setValue] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <QuizMainWrapper>
      <QuizMainTitle>Quiz: Menton Lemon Festival</QuizMainTitle>

      <QuizMainBox>
        <QuizMainQuestion>{questions[currentQuestion - 1].question}</QuizMainQuestion>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#2000bb',
              borderRadius: 12,
              colorBgContainer: '#ffffff',
              colorSplit: 'rgba(0,0,0,0)'
            },
          }}>
          <Radio.Group onChange={onChange} value={value}>
            <Space size={'large'} direction='vertical'>
              {questions[currentQuestion - 1].answers.map((answer) => <Radio value={answer}>{answer}</Radio>)}
            </Space>
          </Radio.Group>
        </ConfigProvider>
      </QuizMainBox>

      <QuizMainBottomMenu>
        <QuizMainIndexer>
          <QuizMainIndexerButton onClick={() => { setCurrentQuestion(currentQuestion === 1 ? 1 : currentQuestion - 1) }}>
            <LeftOutlined />
          </QuizMainIndexerButton>

          <QuizMainProgress>{currentQuestion} / {questions.length} </QuizMainProgress>

          <QuizMainIndexerButton onClick={() => { setCurrentQuestion(currentQuestion === questions.length ? questions.length : currentQuestion + 1) }}>
            <RightOutlined />
          </QuizMainIndexerButton>
        </QuizMainIndexer>

        <QuizMainButtonGroup>
          <QuizMainSecondaryButton>Leave</QuizMainSecondaryButton>
          <QuizMainButton>Submit</QuizMainButton>
        </QuizMainButtonGroup>
      </QuizMainBottomMenu>
    </QuizMainWrapper>
  );
};

export default QuizMain;
