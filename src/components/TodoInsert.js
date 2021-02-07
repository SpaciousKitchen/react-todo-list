import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';
import faker from 'faker';
import firebase from '../firebase';
const todo_db = firebase.database().ref('todolist');

const TodoInsert = ({ onInsert, userInfo }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      const todo = {
        id: faker.random.uuid(),
        //firebase에서 id 자동형성이 안되므로 임의로 넣어줌
        text: value,
        userId: userInfo ? userInfo?.userId : '',
      };

      todo_db.push(todo);//파이어베이스 데이터 추가
      todo.checked = false;
      setValue(''); // value 값 초기화
      onInsert(todo);
      e.preventDefault();
    },
    [onInsert, userInfo, value],
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      {value ? (
        <textarea value={value} onChange={onChange} />
      ) : (
        <input
          placeholder="할 일을 입력하세요"
          value={value}
          onChange={onChange}
        />
      )}
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
