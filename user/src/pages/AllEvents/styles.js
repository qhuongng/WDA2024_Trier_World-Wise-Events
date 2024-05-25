import styled from "styled-components";
import { Pagination, Row } from "antd";

export const EventsWrapper = styled.div`
  background: #fff;
  padding: 36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100vh;
`;

export const EventsTitle = styled.div`
  font-size: 2rem;
  color: #2000bb;
  font-weight: 700;
  margin: 0 auto 1rem 0;
`;

export const CoverHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  width: 30%; 
  margin-top: -2rem;
  margin-right: 1rem;
`;

export const EventsMessage = styled.div`
  font-size: 1rem;
  color: #434343;
  margin: 0 auto auto 0;
`;

export const EventsPaginator = styled(Pagination)`
  padding: 3rem 0 0 0;
`;

export const EventsRow = styled.div`
  margin: 2rem 0;
  width: 100%;
`;

export const InputSearchButton = styled.button`
  box-sizing: border-box;
  background: #bb0070;
  font-family: Inter;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  width: 2.5rem;
  height: 2rem;
  color: #fff;
  font-size: 1rem;
  margin-left: 1rem;
  margin-top: 1rem;

  cursor: pointer;

  &:hover {
  background: #e0639d;
  }

  &:active {
  background: #9e005f;
  }
`;