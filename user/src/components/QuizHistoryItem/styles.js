import styled from "styled-components";

export const QuizHistoryItemWrapper = styled.div`
  background: #e1daff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  margin-top: 1rem;
  font-family: Inter;
`;

export const QuizHistoryItemEventName = styled.div`
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

export const QuizHistoryItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QuizHistoryItemScore = styled.div`
  font-size: 2rem;
  color: #2000bb;
  font-weight: 800;
`;

export const QuizHistoryItemTime = styled.div`
  color: #434343;
  font-family: Inter;
  font-size: 0.9rem;
  margin-top: 1rem;
`;