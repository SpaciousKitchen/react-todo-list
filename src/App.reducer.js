import React, { useReducer, useRef, useCallback, useState } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoEdit from './components/TodoEdit';
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': // 새로 추가
      // { type: 'INSERT', todo: { id: 1, text: 'todo', checked: false } }
      return todos.concat(action.todo);
    case 'REMOVE': // 제거
      // { type: 'REMOVE', id: 1 }
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE': // 토글
      // { type: 'REMOVE', id: 1 }
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    case 'EDIT': // 수정
      // { type: 'REMOVE', id: 1 }
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.editText } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  const [editMode, setEditMode] = useState(false);
  const [initTodo, setInitTodo] = useState('');

  // 고유 값으로 사용 될 id
  // ref 를 사용하여 변수 담기
  const nextId = useRef(2501);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1; // nextId 1 씩 더하기
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  const onEdit = useCallback((id, editText) => {
    dispatch({ type: 'EDIT', id, editText });
  }, []);

  const onClickEdit = useCallback((todoOne) => {
    setEditMode((pre) => !pre);
    setInitTodo(todoOne);
  }, []);

  return (
    <TodoTemplate>
      {editMode ? (
        <TodoEdit
          onEdit={onEdit}
          setEditMode={setEditMode}
          initTodo={initTodo}
        />
      ) : (
        <TodoInsert onInsert={onInsert} />
      )}

      <TodoList
        todos={todos}
        onRemove={onRemove}
        onClickEdit={onClickEdit}
        onToggle={onToggle}
      />
    </TodoTemplate>
  );
};

export default App;
