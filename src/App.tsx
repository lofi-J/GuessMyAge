/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from "react";
import { css } from "@emotion/react";
import axios from "axios";
import Input from "./component/Input";

export type Tvalidate = {
  success: boolean;
  message: string;
}

const App = () => {
  const [input_name, setInputName] = useState('');
  const [validate, setValidate] = useState<Tvalidate>({success: false, message: ''});
  const [result, setResult] = useState('');
  const [country, setCountry] = useState<'US'|'KR'>('US');

  useEffect(() => {
    if(input_name === '') return;
    if(/[a-zA-Z]/g.test(input_name)) {
      setCountry('US');
    } else {
      setCountry('KR');
    }
  }, [input_name])

  const getApi = useCallback(() => {
    if(input_name.length <= 0) return;
    setResult('');

    const url = `https://api.agify.io?name=${input_name}&country_id=${country}`;
    axios.get(url).then((res) => {
      const {data, status} = res;
      if(status === 200) {
        if(data.age) {
          setResult(data.age);
        } else {
          setResult('측정 불가');
        }
      } else {
        alert("Server Error");
      }
    });
  }, [country, input_name]);


  return (  
    <div css={AppCss}>
      <div className="wrap">
        <h1 className="title">Guess My Age!</h1>
        <form onSubmit={getApi}>
          <label>Input your name!</label>
          <Input 
            placeholder="name"
            setInputValue={setInputName}
            setValidate={setValidate}
          />
          <span className={validate.success ? 'success msg' : 'error msg'}>{validate.message}</span>
          <button css={ButtonCss(input_name.length <= 0)}
            disabled={input_name.length <= 0}
            onClick={(e) => {
              e.preventDefault();
              getApi()
            }}>
          Guess
          </button>
        </form>
        <span className="result">{`Age: ${result}`}</span>
      </div>
    </div>
  );
}

export default App;

const AppCss = css`
  font-family: 'Playpen Sans', cursive;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 5rem;
  }
  .title {
    font-size: 3rem;
    padding: 10rem 0;
    width: 100%;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    label {
      font-weight: 200;
      font-size: 2rem;
      margin-bottom: 3rem;
    }
    .success {
      color: #94fb94;
    }
    .error {
      color: #e58282;
    }
    .msg {
      padding: 2rem 0 0 0;
    }
  }
  .result {
    margin: 2rem 0;
  }
`;

const ButtonCss = (is_disable: boolean) => css`
  cursor: pointer;
  width: 100%;
  color: #fff;
  background-color: #000000;
  border: 1px solid transparent;
  padding: 1rem;
  border-radius: 8px;
  margin: 2rem 0;
  :hover {
    background-color: ${is_disable ? "#000" : "#232323"};
    border: 1px solid black;
  }
`;