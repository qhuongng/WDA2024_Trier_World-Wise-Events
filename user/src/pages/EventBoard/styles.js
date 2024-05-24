import styled from "styled-components";
import { Link } from "react-router-dom";
import { Link } from "react-router-dom";

export const EventBoardWrapper = styled.div`
  padding: 36px;
  background: #fff;
`;

export const EventIntroductionWrapper = styled.div`
  background: #f1f1f1;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EventIntroductionLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-right: 2rem;

  .title {
    color: #2000bb;
    font-size: 2rem;
    font-weight: 800;
  }

  .country {
    color: #434343;
    font-size: 1rem;
    font-weight: 700;
  }

  .time {
    color: #434343;
    font-size: 1rem;
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
  height: 25rem;
  max-width: 50%;
  margin-left: 1rem;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
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
    font-weight: 700;
    color: #434343;
  }
`;

export const EventReplyCommentWrapper = styled.div`
  background: #f1f1f1;
  padding: 1.5rem;
  border-radius: 0 0 16px 16px;
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
  margin-top: 2rem;
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
