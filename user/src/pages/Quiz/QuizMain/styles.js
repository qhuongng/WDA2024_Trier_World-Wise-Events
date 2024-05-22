import styled from "styled-components";

export const QuizMainWrapper = styled.div`
  background: #fff;
  height: 100vh;
  padding: 36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const QuizMainBox = styled.div`
  background: #e1daff;
  height: 60%;
  width: 100%;
  padding: 48px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
  border-radius: 12px;
`;

export const QuizMainTitle = styled.div`
  font-size: 2rem;
  color: #2000bb;
  font-weight: 700;
  margin: 0 auto 1rem 0;
`;

export const QuizMainQuestion = styled.div`
  font-size: 1.5rem;
  color: #2000bb;
  font-weight: 600;
  margin: 0 auto 3rem 0;
`;

export const QuizMainProgress = styled.div`
  font-size: 1.5rem;
  color: #2000bb;
  font-weight: 600;
`;

export const QuizMainSubtitle = styled.div`
  font-size: 1rem;
  color: #434343;
  font-weight: 600;
  margin: 0 auto 1rem 0;
`;

export const QuizMainDesc = styled.div`
  font-size: 0.8rem;
  color: #434343;
  margin: 2rem auto 1rem 0;
`;

export const QuizMainButton = styled.button`
  background: #2000bb;
  font-family: Inter;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  padding: 0.5rem 3rem;
  color: #fff;
  font-size: 1rem;

  cursor: pointer;

  &:hover {
    background: #4a00e0;
  }

  &:active {
    background: #00008b;
  }
`;

export const QuizMainIndexerButton = styled.button`
  background: transparent;
  font-family: Inter;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  padding: 0.5rem;
  color: #2000bb;
  font-size: 1rem;

  cursor: pointer;

  &:hover {
    color: #4a00e0;
  }

  &:active {
    color: #00008b;
  }
`;


export const QuizMainSecondaryButton = styled.button`
  background: transparent;
  font-family: Inter;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  padding: 0.5rem 3rem;
  color: #434343;
  font-size: 1rem;

  cursor: pointer;

  &:hover {
    color: #4a00e0;
  }

  &:active {
    color: #00008b;
  }
`;

export const QuizMainBottomMenu = styled.div`
  height: 15%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

export const QuizMainButtonGroup = styled.div`
  height: 55%;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const QuizMainIndexer = styled.div`
  height: 55%;
  width: 13%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
