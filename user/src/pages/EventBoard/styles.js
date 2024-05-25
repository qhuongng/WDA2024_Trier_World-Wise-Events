import styled from "styled-components";
import { Link } from "react-router-dom";

export const EventBoardWrapper = styled.div`
  padding: 36px;
  background: #fff;
  min-height: 100vh;
  font-family: Inter;
`;

export const EventBoardTop = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 30rem;
`;

export const EventIntroductionWrapper = styled.div`
  background: #f1f1f1;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter;
`;

export const EventIntroductionLeft = styled.div`
  height: 100%;
  width: 45%
  box-sizing: border-box;
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .title {
    color: #2000bb;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .country {
    color: #434343;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .time {
    color: #434343;
    font-size: 1rem;
  }

  .ongoing-glyph {
    margin: 0 0.5rem;
  }

  .ongoing {
    font-weight: 600;
    color: #bb0070;
  }

  .description {
    color: #434343;
    font-size: 1rem;
    margin: 2rem 0;
  }

  button {
    background: #2000bb;
    border-radius: 2rem;
    color: white;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 700;
    border: none;
  }
`;

export const EventIntroductionImage = styled.div`
  height: 30rem;
  
  &>img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const EventCommentsListWrapper = styled.div`
  flex: 1;
  height: auto;
  margin-top: 15px;
  columns: 4;
`;

export const EventCommentWrapper = styled.div`
  border-radius: 16px 16px 0 0;
  background: #e1daff;
  width: 100%;
  padding: 1.5rem;
  .text {
    margin: 1rem 0;
    font-size: 1rem;
    color: #434343;
  }
`;

export const EventCommentPerson = styled.div`
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    object-fit: cover;
    margin-right: 0.75rem;
  }
  .name {
    font-weight: 600;
    color: #434343;
  }
`;

export const EventReplyCommentWrapper = styled.div`
  background: #f1f1f1;
  padding: 1.5rem;
  border-radius: 0 0 16px 16px;
`;

export const EventReplyInputGroup = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
`;

export const EventReplyButton = styled.button`
  box-sizing: border-box;
  background: #bb0070;
  font-family: Inter;
  font-weight: 600;
  border: none;
  border-radius: 2rem;
  width: 2rem;
  height: 2rem;
  color: #fff;
  font-size: 1rem;
  margin-left: 1rem;

  cursor: pointer;

  &:hover {
  background: #e0639d;
  }

  &:active {
  background: #9e005f;
  }
`;

export const EventPost = styled.div`
  break-inside: avoid;
  margin: 0 0 1rem;
`;

export const EventIntroductionQuizButton = styled(Link)`
  background: #2000bb;
  font-family: Inter;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  padding: 0.5rem 3rem;
  color: #fff;
  font-size: 1rem;
  margin-top: 1rem;
  margin-right: auto;

  cursor: pointer;

  &:hover {
    background: #4a00e0;
    color: #fff;
  }

  &:active {
    background: #00008b;
    color: #fff;
  }
`;

export const EventCreatePost = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
`;

export const ModalButton = styled.button`
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

export const ModalSecondaryButton = styled.button`
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

export const EventQuizLeaderboardWrapper = styled.div`
  background: #f8d4ea;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  min-width: 23%;
  margin-left: 1rem;
  padding: 36px 0;
`;

export const EventQuizLeaderboardItemGroup = styled.div`
  background: #f8d4ea;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 0 36px;
`;

export const EventQuizLeaderboardTitle = styled.div`
  font-size: 2rem;
  color: #bb0070;
  font-weight: 700;
  margin-bottom: 2rem;
  padding: 0 36px;
`;

export const EventQuizLeaderboardItem = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

export const EventQuizLeaderboardRank = styled.div`
  font-size: 1.5rem;
  color: #bb0070;
  font-weight: 700;
  margin-right: 1rem;
`;

export const EventQuizLeaderboardScore = styled.div`
  font-size: 1.1rem;
  color: #bb0070;
  font-weight: 700;
`;

export const EventQuizLeaderboardStats = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const EventQuizLeaderboardTime = styled.div`
  font-size: 1rem;
  color: #434343;
`;

export const EventQuizLeaderboardName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #434343;
`;