import styled from "styled-components";

export const QuizEndWrapper = styled.div`
  background: #fff;
  padding: 36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const QuizEndTitle = styled.div`
  font-size: 2rem;
  color: #2000bb;
  font-weight: 700;
  margin: 0 auto 1rem 0;
`;

export const QuizEndTopBar = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0;
  font-weight: 600;
  justify-content: space-between;
  align-items: flex-end;
  font-family: Inter;
`;

export const QuizEndMessage = styled.div`
  color: #434343;
  font-size: 1.1rem;
`;

export const QuizEndStats = styled.div`
  display: flex;
`;

export const QuizEndMinorStats = styled.div`
  height: 100%
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 1rem;
  background: #f0f0f0;
  border-radius: 12px;
  padding: 1rem;
`;

export const QuizEndCorrectCount = styled.div`
  font-size: 1.1rem;
  color: #434343;
  font-weight: 700;
`;

export const QuizEndTimeTaken = styled.div`
  font-size: 1.1rem;
  color: #434343;
  font-weight: 700;
`;

export const QuizEndScore = styled.div`
  font-size: 2rem;
  color: #2000bb;
  background: #e1daff;
  border-radius: 12px;
  font-weight: 800;
  padding: 1rem;
`;