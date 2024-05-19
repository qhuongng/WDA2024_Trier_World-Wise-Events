import React from "react";
import { InputItem, InputLabel, InputWrapper } from "./styles";

const Input = (props) => {
  const { type, placeholder, label, id, name, value, onChange, onBlur } = props;
  return (
    <InputWrapper>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <InputItem
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </InputWrapper>
  );
};

export default Input;