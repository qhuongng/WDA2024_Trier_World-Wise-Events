import styled from "styled-components";
import { Pagination, Row } from "antd";

export const EventsWrapper = styled.div`
  background: #fff;
  height: 100vh;
  padding: 36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const EventsTitle = styled.div`
  font-size: 2rem;
  color: #2000bb;
  font-weight: 700;
  margin: 0 auto 1rem 0;
`;

export const EventsMessage = styled.div`
  font-size: 1rem;
  color: #434343;
  margin: 0 auto auto 0;
`;

export const EventsPaginator = styled(Pagination)`
  padding: 1.5rem 0;
`;

export const EventsRow = styled(Row)`
  margin-bottom: auto;

  & > div {
    width: 100%;
  }
`;