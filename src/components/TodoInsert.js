import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert, onEdit }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue(''); // value 값 초기화
      e.preventDefault();
    },
    [onInsert, value],
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
