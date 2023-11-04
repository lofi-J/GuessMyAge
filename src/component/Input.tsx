/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Dispatch, useState } from "react";
import { Tvalidate } from "../App";


interface IInput {
  placeholder?: string;
  setInputValue: Dispatch<React.SetStateAction<string>>;
  setValidate: Dispatch<React.SetStateAction<Tvalidate>>
}

const Input = ({
  placeholder, 
  setInputValue, 
  setValidate
}: IInput) => {

  const [local_value, setLocalValue] = useState('')

  return (
    <div css={Inputcss}>
      <input
      type="text"
      placeholder={placeholder}
      value={local_value}
      onChange={(event) => {
        setValidate({success: false, message: ''});
        if(/[^a-zA-Z가-힣ㄱ-ㅎ]/g.test(event.target.value)) {
          setValidate({success: false, message: 'Please enter letters only'});
        } else {
          setLocalValue(event.target.value);
          setInputValue(event.target.value);
          setValidate({success: true, message: "I'll guess your age!"})
        }
      }}
      onBlur={() => {
        if(local_value === '') { setValidate({success: false, message: ''}) }
        else {
          setValidate({success: true, message: "I'll guess your age!"});
        }
      }}
      />
    </div>
  );
}

export default Input;

const Inputcss = css`
  display: flex;
  input {
    font-size: 3rem;
    width: 100%;
    outline: none;
    color: #f4f4f4;
    border: 1px solid gray;
    border-radius: 8px;
    background-color: transparent;
    padding: 1rem;
  }
`;