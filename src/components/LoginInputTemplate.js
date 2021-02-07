import React, { useState, useCallback } from 'react';
import './LoginInputTemplate.scss';
import firebase from '../firebase';
const todo_user_db = firebase.database().ref('todoUser');

const LoginInputTemplate = ({ onLogin = { onLogin }, setLoginMode }) => {
  const [valueId, setValueId] = useState('');
  const [valuePassword, setValuePassword] = useState('');

  const onChangeId = useCallback((e) => {
    setValueId(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setValuePassword(e.target.value);
  }, []);
  const onLoginCancel = useCallback(
    (todoOne) => {
      setLoginMode((pre) => !pre);
    },
    [setLoginMode],
  );

  const onSubmit = useCallback(
    (e) => {
      todo_user_db.ref.on('value', (snapshot) => {
        const todoUserData = snapshot.val();
        for (let id in todoUserData) {
          if (
            todoUserData[id].userId === valueId &&
            todoUserData[id].password === valuePassword
          ) {
            alert('로그인 성공');
            onLogin(valueId);
            setLoginMode((pre) => !pre);
            return;
          }
        }

        alert('로그인 실패');
      });
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
          <button onClick={onLoginCancel}> 취소</button>
          <button type="submit">확인</button>
        </div>
      </form>
    </div>
  );
};

export default LoginInputTemplate;
