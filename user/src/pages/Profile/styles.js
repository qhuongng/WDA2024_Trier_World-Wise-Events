import styled from "styled-components";

export const ProfileWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #fff;
  padding: 36px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ProfileTitle = styled.div`
  font-size: 2rem;
  color: #2000bb;
  font-weight: 700;
  margin: 0 auto 1rem 0;
`;

export const ProfileSubtitle = styled.div`
  font-size: 1.2rem;
  color: #2000bb;
  font-weight: 700;
  margin: 0 auto 1rem 0;
`;

export const ProfilePhoto = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 6rem;
  background-size: cover;
  align-self: center;
  background-color: #e1daff;
  margin: 1rem 0;
`;

export const ProfileLeft = styled.div`
  display: flex;
  width: 25%;
  flex-direction: column;
`;

export const ProfileRight = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  margin-left: 5rem;
`;

export const ProfileButton = styled.button`
  background: #2000bb;
  font-family: Inter;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  padding: 0.5rem 3rem;
  color: #fff;
  font-size: 1rem;
  margin: auto;

  cursor: pointer;

  &:hover {
    background: #4a00e0;
    color: #fff;
  }

  &:active {
    background: #00008b;
    color: #fff;
  }

  &:disabled {
    background: #827ba6;
    color: #f1f1f1;
    cursor: not-allowed;
  }
`;

export const ProfileError = styled.div`
  color: #bb0070;
  margin: 0.5rem 0;
`;