import React, { useState, useCallback } from 'react';
import { MdSend } from 'react-icons/md';
import './TodoEdit.scss';

const TodoEdit = ({ onEdit, setEditMode, initTodo }) => {
  const [value, setValue] = useState(initTodo.text);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
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
