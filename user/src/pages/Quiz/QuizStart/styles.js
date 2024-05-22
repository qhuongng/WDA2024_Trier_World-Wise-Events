import styled from "styled-components";
import { Link } from "react-router-dom";

export const QuizStartWrapper = styled.div`
  background: #fff;
  height: 100vh;
  padding: 36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const QuizStartBox = styled.div`
  background: #e1daff;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 12px;
`;

export const QuizStartInfo = styled.div`
  height: 100%;
  width: 45%
  box-sizing: border-box;
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const QuizStartTitle = styled.div`
  font-size: 2rem;
  color: #2000bb;
  font-weight: 700;
  margin: 0 auto 1rem 0;
`;

export const QuizStartSubtitle = styled.div`
  font-size: 1rem;
  color: #434343;
  font-weight: 600;
  margin: 0 auto 1rem 0;
`;

export const QuizStartDesc = styled.div`
  font-size: 0.8rem;
  color: #434343;
  margin: 2rem auto 1rem 0;
`;

export const QuizStartButton = styled(Link)`
  background: #2000bb;
  font-family: Inter;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  padding: 0.5rem 3rem;
  color: #fff;
  font-size: 1rem;
  margin-top: 2rem;

  cursor: pointer;

  &:hover {
    background: #4a00e0;
    color: #fff;
  }

  &:active {
    background: #00008b;
    color:#fff;
  }
`;

export const QuizStartImage = styled.div`
  background-size: cover;
  width: 200%;
  height: 100%;
  border-radius: 0 12px 12px 0;
`;