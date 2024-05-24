import { Link } from "react-router-dom";
import styled from "styled-components";

export const LoginWrapper = styled.div`
  background: #e1daff;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginBox = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  min-width: 50%;
`;

export const LoginTitle = styled.div`
  font-size: 2rem;
  color: #2000bb;
  font-weight: 600;
  text-align: center;
`;

export const LoginButton = styled.button`
  box-sizing: border-box;
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
  }

  &:active {
  background: #00008b;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    width: 100%;
  }
`;

export const LoginLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  img {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
  }
  div {
    color: #2000bb;
    font-weight: 800;
    font-size: 1.5rem;
  }
`;

export const LoginError = styled.div`
  color: #bb0070;
  margin: 0.5rem 0;
`;

export const LoginLink = styled(Link)`
  background: #fff;
  color: #2000bb;
  font-family: Inter;
  font-weight: 600;
  border: 1px solid #2000bb;
  border-radius: 12px;
  padding: 0.5rem 3rem;
  font-size: 1rem;
  margin-top: 2rem;
  margin-right: 2rem;
  box-sizing: border-box;

  cursor: pointer;

  &:hover {
    border: 1px solid #4a00e0;
    color: #4a00e0;
  }

  &:active {
    border: 1px solid #00008b;
    color: #00008b;
  }
`;

export const LoginButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
