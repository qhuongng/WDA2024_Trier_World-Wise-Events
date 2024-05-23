import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useBlocker } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../../../features/quiz/quizSlice';
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

  const [deadline, setDeadline] = useState(Date.now() + 1000 * 60 * 20);
  const [countdownKey, setCountdownKey] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [answers, setAnswers] = useState(new Array(15).fill(''));
  const [qaPairs, setQaPairs] = useState([]);
  const [value, setValue] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [abandon, setAbandon] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  const showModal = (title, content, isSubmitting) => {
    setModalTitle(title);
    setModalContent(content);

    if (isSubmitting) {
      setAbandon(false);
    }
    else {
      setAbandon(true);
    }

    setModalOpen(true);
  };

  const handleOk = () => {
    setModalOpen(false);
    blocker.proceed();

    if (!abandon) {
      navigate('results', { state: { id: id, timeElapsed: timeElapsed, questions: qaPairs, userAnswers: answers } })
    }
    else {
      navigate('/');
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    setAbandon(false);
    blocker.reset();
  };

  const onRadioChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion - 1] = e.target.value;
    setAnswers(newAnswers);
    setValue(e.target.value);
  };

  const onTimerFinish = () => {
    console.log('finished!');
  };

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      abandon === false &&
      currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    dispatch(getOneEvent(id));
    dispatch(getQuestions(id));
    setDeadline(Date.now() + 1000 * 60 * 20);
    setCountdownKey(Date.now());
  }, [dispatch, id]);

  useEffect(() => {
    setValue(answers[currentQuestion - 1]);
  }, [currentQuestion, answers]);

  useEffect(() => {
    setQaPairs(
      questions?.map(question => ({
        text: question.text,
        correctAnswer: question.correctAnswer
      })));
  }, [questions]);

  useBeforeUnload({
    when: abandon === false,
    message: 'You have unsaved changes. Are you sure you want to leave?',
  });

  useEffect(() => {
    if (blocker.state === 'blocked') {
      showModal('Leave quiz', 'Leave the current quiz? Your progress will NOT be saved.', false);
    }
  }, [blocker.state]);

  return (
    <QuizMainWrapper>
      <QuizMainTopMenu>
        {event && <QuizMainTitle>Quiz: {event.eventName}</QuizMainTitle>}
        <Countdown
          valueStyle={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '2rem', color: '#2000bb' }}
          value={deadline}
          format='mm:ss'
          onFinish={onTimerFinish}
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
              <Radio.Group onChange={onRadioChange} value={value}>
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
