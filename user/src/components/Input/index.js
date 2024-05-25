import React, { useState } from "react";
import { InputItem, InputLabel, InputWrapper, InputLabelGroup, InputShowPasswordButton } from "./styles";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Input = (props) => {
  const { type, placeholder, label, id, name, value, onChange, onBlur, disabled, onPressEnter } = props;
  const [visible, setVisible] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleVisibility = (e) => {
    e.preventDefault();

    if (inputType === 'text') {
      setInputType('password');
    }
    else if (inputType === 'password') {
      setInputType('text');
    }

    setVisible(!visible);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onPressEnter) {
      onPressEnter(e);
    }
  };

  return (
    <InputWrapper>
      <InputLabelGroup>
        <InputLabel htmlFor={label}>{label}</InputLabel>
        {type === 'password' ?
          <InputShowPasswordButton onClick={handleVisibility}>
            {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </InputShowPasswordButton>
          :
          <></>}
      </InputLabelGroup>

      <InputItem
        type={inputType}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
    </InputWrapper>
  );
};

export default Input;
