import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useBlocker } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions, createResult, resetResultSent } from '../../../features/quiz/quizSlice';
import { getOneEvent } from '../../../features/event/eventSlice';
import { getAuthUser } from "../../../utils/authStorage";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  QuizMainBox,
  QuizMainTitle,
  QuizMainQuestion,
  QuizMainWrapper,
  QuizMainButton,
  QuizMainTopMenu,
  QuizMainBottomMenu,
  QuizMainButtonGroup,
  QuizMainSecondaryButton,
  QuizMainIndexerButton,
  QuizMainIndexer,
  QuizMainProgress
} from './styles';
import { Radio, Space, ConfigProvider, Statistic, Modal } from 'antd';

const { Countdown } = Statistic;

const useBeforeUnload = ({ when, message }) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = message;
      return message;
    }

    if (when) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [when, message]);
}

const QuizMain = () => {
  const user = getAuthUser();

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const event = useSelector((state) => state.event.singleEvent) || null;
  const questions = useSelector((state) => state.quiz.questions) || null;
  const resultSent = useSelector((state) => state.quiz.resultSent);

  const [deadline, setDeadline] = useState(Date.now() + 1000 * 60 * 20);
  const [countdownKey, setCountdownKey] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [answers, setAnswers] = useState(new Array(15).fill(''));
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [qaPairs, setQaPairs] = useState([]);
  const [radioValue, setRadioValue] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [abandon, setAbandon] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [pendingNavigation, setPendingNavigation] = useState(null);

  const [count, setCount] = useState(null);
  const [score, setScore] = useState(null);
  const [result, setResult] = useState(null);

  useBlocker((transition) => {
    if (!abandon) {
      setPendingNavigation(transition);
      showModal('Leave quiz', 'Leave the current quiz? Your progress will NOT be saved.', false);
    } else {
      transition.retry();
    }
  }, !abandon);

  const showModal = (title, content, isSubmitting) => {
    setModalTitle(title);
    setModalContent(content);

    if (isSubmitting)
      setAbandon(false);
    else
      setAbandon(true);

    setModalOpen(true);
  };

  const countMatches = (correctAnswers, answers) => {
    let count = 0;
    // count the matches
    for (let i = 0; i < correctAnswers.length; i++) {
      if (correctAnswers[i] === answers[i]) {
        count++;
      }
    }
    return count;
  }

  const calcScore = (count) => {
    // calculate bonus time score
    let bonus = 1 + ((1200 - timeElapsed) / 1200);
    return count * bonus * 10;
  }

  const handleOk = () => {
    setModalOpen(false);

    if (pendingNavigation) {
      setAbandon(true);
      pendingNavigation.retry();
    }
    else {
      setCount(countMatches(correctAnswers, answers));
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    setAbandon(false);
    setPendingNavigation(null);
  };

  const onRadioChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion - 1] = e.target.value;
    setAnswers(newAnswers);
    setRadioValue(e.target.value);
  };

  useEffect(() => {
    dispatch(getOneEvent(id));
    dispatch(getQuestions(id));
  }, [dispatch, id]);

  useEffect(() => {
    setRadioValue(answers[currentQuestion - 1]);
  }, [currentQuestion, answers]);

  useEffect(() => {
    setQaPairs(
      questions?.map(question => ({
        text: question.text,
        correctAnswer: question.correctAnswer
      })));

    setCorrectAnswers(questions?.map(question => question.correctAnswer));
    setDeadline(Date.now() + 1000 * 60 * 20);
    setCountdownKey(Date.now());
  }, [questions]);

  useEffect(() => {
    if (count !== null) {
      let score = calcScore(count);
      setScore(score);
      setResult({
        idEvent: id,
        idUser: user._id,
        score: parseInt(score),
        time: parseInt(timeElapsed)
      });
    }
  }, [count]);

  useEffect(() => {
    if (result !== null) {
      dispatch(createResult(result));
    }
  }, [dispatch, result]);

  useEffect(() => {
    if (resultSent) {
      navigate('results',
        {
          state:
          {
            event: event.eventName,
            timeElapsed: timeElapsed,
            questions: qaPairs,
            userAnswers: answers,
            score: score,
            count: count
          }
        });

      dispatch(resetResultSent());
    }
  }, [resultSent, navigate, event, qaPairs, timeElapsed, answers, dispatch]);

  useBeforeUnload({
    when: abandon === false,
    message: 'You have unsaved changes. Are you sure you want to leave?',
  });

  return (
    <QuizMainWrapper>
      <QuizMainTopMenu>
        {event && <QuizMainTitle>Quiz: {event.eventName}</QuizMainTitle>}
        <Countdown
          valueStyle={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '2rem', color: '#2000bb' }}
          value={deadline}
          format='mm:ss'
          onFinish={handleOk}
          onChange={(time) => setTimeElapsed(((1000 * 60 * 20) - time) / 1000)} />
      </QuizMainTopMenu>

      {questions ? (
        <>
          <QuizMainBox>
            <QuizMainQuestion>{questions[currentQuestion - 1].text}</QuizMainQuestion>

            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#2000bb',
                  borderRadius: 12,
                  colorBgContainer: '#ffffff',
                },
              }}>
              <Radio.Group onChange={onRadioChange} value={radioValue}>
                <Space size={'large'} direction='vertical'>
                  {questions[currentQuestion - 1].answers.map((answer) => <Radio style={{ fontFamily: 'Inter', fontSize: '1.1rem' }} value={answer} key={answer}>{answer}</Radio>)}
                </Space>
              </Radio.Group>
            </ConfigProvider>
          </QuizMainBox>

          <QuizMainBottomMenu>
            <QuizMainIndexer>
              <QuizMainIndexerButton
                onClick={() => {
                  setCurrentQuestion(currentQuestion === 1 ? 1 : currentQuestion - 1);
                }}>
                <LeftOutlined />
              </QuizMainIndexerButton>

              <QuizMainProgress>{currentQuestion} / {questions.length} </QuizMainProgress>

              <QuizMainIndexerButton
                onClick={() => {
                  setCurrentQuestion(currentQuestion === questions.length ? questions.length : currentQuestion + 1);
                }}>
                <RightOutlined />
              </QuizMainIndexerButton>
            </QuizMainIndexer>

            <QuizMainButtonGroup>
              <QuizMainSecondaryButton
                onClick={() => showModal('Leave quiz', 'Leave the current quiz? Your progress will NOT be saved.', false)}>
                Leave</QuizMainSecondaryButton>
              <QuizMainButton
                onClick={() => showModal('Submit quiz', 'You are about to submit this quiz. Are you sure?', true)}>
                Submit</QuizMainButton>
            </QuizMainButtonGroup>
          </QuizMainBottomMenu>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#2000bb',
            borderRadius: 12,
            titleColor: '#2000bb',
          },
        }}>
        <Modal
          style={{ fontFamily: 'Inter' }}
          title={modalTitle}
          open={modalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <QuizMainSecondaryButton onClick={handleCancel}>
              Cancel
            </QuizMainSecondaryButton>,
            <QuizMainButton onClick={handleOk}>
              OK
            </QuizMainButton>
          ]}>
          <p>{modalContent}</p>
        </Modal>
      </ConfigProvider>
    </QuizMainWrapper>
  );
};

export default QuizMain;
