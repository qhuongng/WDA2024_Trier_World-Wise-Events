import styled from "styled-components";

export const RegisterWrapper = styled.div`
  background: #e1daff;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RegisterBox = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  min-width: 50%;
`;

export const RegisterTitle = styled.div`
  font-size: 2rem;
  color: #2000bb;
  font-weight: 600;
  text-align: center;
`;

export const RegisterButton = styled.button`
  background: #2000bb;
  border: none;
  border-radius: 50px;
  padding: 0.5rem 2rem;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 2rem;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    width: 100%;
  }
`;

export const RegisterLogo = styled.div`
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

export const RegisterError = styled.div`
  color: red;
  margin: 0.5rem 0;
`;
