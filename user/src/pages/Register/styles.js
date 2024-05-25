import { Link } from "react-router-dom";
import styled from "styled-components";

export const RegisterWrapper = styled.div`
  background: #e1daff;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Inter;
`;

export const RegisterBox = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  min-width: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const RegisterTitle = styled.div`
  font-size: 1.4rem;
  color: #2000bb;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
`;

export const RegisterButton = styled.button`
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
export const Option = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    width: 100%;
  }
`;

export const RegisterForm = styled.form`
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    width: 100%;
  }
`;

export const RegisterLogo = styled(Link)`
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
    font-size: 2rem;
  }
`;

export const RegisterError = styled.div`
  color: #bb0070;
  margin: 0.5rem 0;
`;

export const RegisterLink = styled(Link)`
  background: #fff;
  color: #2000bb;
  font-family: Inter;
  font-weight: 600;
  border: 1px solid #2000bb;
  border-radius: 12px;
  padding: 0.5rem 0;
  font-size: 1rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

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

export const RegisterOptionButton = styled.button`
  background: #fff;
  color: #2000bb;
  font-family: Inter;
  font-weight: 600;
  border: 1px solid #2000bb;
  border-radius: 12px;
  padding: 0.5rem 0;
  font-size: 1rem;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

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

export const RegisterButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
