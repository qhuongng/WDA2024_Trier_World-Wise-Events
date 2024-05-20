import styled from "styled-components";

export const EventCardWrapper = styled.div`
  /* Visual */
  background: #e1daff;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  height: 16rem;
`;

export const OngoingEventCardWrapper = styled.div`
  /* Visual */
  background: #f8d4ea;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  height: 16rem;
`;

export const EventCardImage = styled.div`
  /* Box-model */
  position: relative;

  /* Visual */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 18.75rem;
  margin: 1rem 1rem 0 1rem;
  border-radius: 12px;
`;

export const EventCardTitle = styled.div`
  /* Typography */
  color: #000;
  font-family: Inter;
  font-size: 1rem;
  font-weight: 600;
  color: #2000bb;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 100%;
`;

export const OngoingEventCardTitle = styled.div`
  /* Typography */
  color: #000;
  font-family: Inter;
  font-size: 1rem;
  font-weight: 600;
  color: #bb0070;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 100%;
`;

export const EventCardDesc = styled.div`
  /* Typography */
  color: #434343;
  font-family: Inter;
  font-size: 0.8rem;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 100%;
`;

export const EventCardDuration = styled.div`
  /* Typography */
  color: #434343;
  font-family: Inter;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

export const EventCardInfo = styled.div`
  /* Visual */
  margin: 1rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  height: 8rem;
`;