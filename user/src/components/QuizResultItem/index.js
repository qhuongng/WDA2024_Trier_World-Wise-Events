import React from "react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
    QuizResultItemWrapper,
    QuizResultItemQuestion,
    IncorrectQuizResultItemWrapper,
    IncorrectQuizResultItemQuestion,
    QuizResultItemAnswer,
    QuizResultItemCorrectAnswer
} from "./styles";

const QuizResultItem = ({ qaPair, answer }) => {
    if (qaPair.correctAnswer !== answer) {
        return (
            <IncorrectQuizResultItemWrapper>
                <IncorrectQuizResultItemQuestion>
                    {qaPair.text}
                    <CloseOutlined style={{ marginLeft: '1rem', color: '#bb0070' }} />
                </IncorrectQuizResultItemQuestion>
                <QuizResultItemAnswer>Your answer: {answer}</QuizResultItemAnswer>
                <QuizResultItemCorrectAnswer>Correct answer: {qaPair.correctAnswer}</QuizResultItemCorrectAnswer>
            </IncorrectQuizResultItemWrapper>
        );
    } else {
        return (
            <QuizResultItemWrapper>
                <QuizResultItemQuestion>
                    {qaPair.text}
                    <CheckOutlined style={{ marginLeft: '1rem', color: '#2000bb' }} />
                </QuizResultItemQuestion>
                <QuizResultItemAnswer>Your answer: {answer}</QuizResultItemAnswer>
            </QuizResultItemWrapper>
        );
    }
};

export default QuizResultItem;
