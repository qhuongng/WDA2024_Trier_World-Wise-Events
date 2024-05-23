import styled from "styled-components";

export const QuizResultItemWrapper = styled.div`
  background: #e1daff;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  margin-top: 1rem;
`;

export const IncorrectQuizResultItemWrapper = styled.div`
  background: #f8d4ea;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  margin-top: 1rem;
`;

export const QuizResultItemQuestion = styled.div`
  font-family: Inter;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2000bb;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: visible;
  width: 100%;
  max-width: 100%;
`;

export const IncorrectQuizResultItemQuestion = styled.div`
  font-family: Inter;
  font-size: 1.1rem;
  font-weight: 600;
  color: #bb0070;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: visible;
  width: 100%;
  max-width: 100%;
`;

export const QuizResultItemAnswer = styled.div`
  color: #434343;
  font-family: Inter;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

export const QuizResultItemCorrectAnswer = styled.div`
  color: #434343;
  font-family: Inter;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;