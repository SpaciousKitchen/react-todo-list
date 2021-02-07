import React, { useState, useCallback } from 'react';
import { MdSend } from 'react-icons/md';
import './TodoEdit.scss';
import firebase from '../firebase';
const todo_db = firebase.database().ref('todolist');
const TodoEdit = ({ onEdit, setEditMode, initTodo }) => {
  const [value, setValue] = useState(initTodo.text);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      todo_db
        .orderByChild('id')
        .equalTo(initTodo.id)
        .once('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            let nodeKey = childSnapshot.key;
            todo_db.child(nodeKey).update({ text: value });
          });
        });

      onEdit(initTodo.id, value);
      setValue(''); // value 값 초기화
      setEditMode((pre) => !pre);
      e.preventDefault();
    },
    [initTodo.id, onEdit, setEditMode, value],
  );

  return (
    <form className="TodoEdit" onSubmit={onSubmit}>
      <textarea value={value} onChange={onChange} />
      <button type="submit">
        <MdSend />
      </button>
    </form>
  );
};

export default TodoEdit;
