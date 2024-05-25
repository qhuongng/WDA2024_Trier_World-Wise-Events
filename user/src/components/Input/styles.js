import styled from "styled-components";

export const InputItem = styled.input`
  background: #e1daff;
  border: none;
  border-radius: 10px;
  padding: 0.5rem;
  width: 100%;
  font-family: Inter;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Inter;
  width: 100%;
`;

export const InputLabelGroup = styled.label`
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InputLabel = styled.label`  
`;

export const InputShowPasswordButton = styled.button`
  background: transparent;
  font-family: Inter;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  color: #2000bb;
  font-size: 1rem;

  cursor: pointer;

  &:hover {
    color: #4a00e0;
  }

  &:active {
    color: #00008b;
  }
`;