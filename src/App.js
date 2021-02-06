import React, { useRef, useState, useCallback } from 'react';
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

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);
  const [editMode, setEditMode] = useState(false);
  const [initTodo, setInitTodo] = useState('');

  // 고유 값으로 사용 될 id
  // ref 를 사용하여 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1; // nextId 1 씩 더하기
  }, []);

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onEdit = useCallback((id, editText) => {
    console.log();
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo,
      ),
    );
  }, []);

  const onClickEdit = useCallback((todoOne) => {
    setEditMode((pre) => !pre);
    setInitTodo(todoOne);
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
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
