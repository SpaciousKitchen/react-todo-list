import React, { useState, useCallback } from 'react';
import './LoginInputTemplate.scss';

const LoginInputTemplate = ({ onLogin = { onLogin }, setLoginMode }) => {
  const [valueId, setValueId] = useState('');
  const [valuePassword, setValuePassword] = useState('');

  const onChangeId = useCallback((e) => {
    setValueId(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setValuePassword(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      console.log(valueId, valuePassword);
      setLoginMode((pre) => !pre);
      onLogin(valueId, valuePassword);
      e.preventDefault();
    },
    [onLogin, setLoginMode, valueId, valuePassword],
  );

  return (
    <div className="Overlay">
      <form className="ContainLogin" onSubmit={onSubmit}>
        <label>로그인을 하세요!</label>
        <input placeholder="아이디" onChange={onChangeId} />
        <br />
        <input
          placeholder="비밀번호"
          type="password"
          onChange={onChangePassword}
        />
        <br />
        <div>
          <button>취소</button>
          <button type="submit">확인</button>
        </div>
      </form>
    </div>
  );
};

export default LoginInputTemplate;
