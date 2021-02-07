import React, { useState, useCallback } from 'react';
import './SignUpTemplate.scss';
import firebase from '../firebase';
const todo_user_db = firebase.database().ref('todoUser');
const SignUpTemplate = ({ setSignUpMode }) => {
  const [valueId, setValueId] = useState('');
  const [valuePassword, setValuePassword] = useState('');

  const onChangeId = useCallback((e) => {
    setValueId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setValuePassword(e.target.value);
  }, []);

  const onSignUpCancel = useCallback(() => {
    setSignUpMode((pre) => !pre);
  }, [setSignUpMode]);

  const onSubmit = useCallback(
    (e) => {
      todo_user_db.ref
        .orderByChild('userId')
        .equalTo(valueId)
        .once('value', async (snapshot) => {
          const todoUserData = await snapshot.val();
          if (todoUserData) {
            alert('이미 존재하는 아이디입니다.');
            return;
          } else {
            todo_user_db.push({ userId: valueId, password: valuePassword });
            alert('회원가입 완료');
            setSignUpMode((pre) => !pre);
            return;
          }
        });

      e.preventDefault();
    },
    [setSignUpMode, valueId, valuePassword],
  );

  return (
    <div className="Overlay">
      <form className="ContainSignUp" onSubmit={onSubmit}>
        <label>회원가입</label>
        <input placeholder="아이디" onChange={onChangeId} />
        <br />
        <input
          placeholder="비밀번호"
          type="password"
          onChange={onChangePassword}
        />
        <br />
        <div>
          <button onClick={onSignUpCancel}> 취소</button>
          <button type="submit">가입</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpTemplate;
