import React, { useReducer, useRef, useCallback, useState } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoEdit from './components/TodoEdit';
import LoginInputTemplate from './components/LoginInputTemplate';
import './App.css';
import firebase from './firebase';

const todo_db = firebase.database().ref('todolist');

const init = {
  userInfo: null,
  todos: [],
};

function appReducer(state = init, action) {
  switch (action.type) {
    case 'LOGIN': // 새로 추가
      return {
        ...state,
        userInfo: { userId: action.userId },
      };
    case 'LOGOUT': // 새로 추가
      return {
        ...state,
        userInfo: null,
      };
    case 'INSERT': // 새로 추가
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      };
    case 'REMOVE': // 제거
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case 'TOGGLE': // 토글
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
        ),
      };
    case 'EDIT': // 수정
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, text: action.editText } : todo,
        ),
      };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(appReducer, init);
  const [editMode, setEditMode] = useState(false);
  const [loginMode, setLoginMode] = useState(false);
  const [initTodo, setInitTodo] = useState('');

  // 고유 값으로 사용 될 id
  // ref 를 사용하여 변수 담기
  const nextId = useRef(2501);
  console.log(state);

  const onLogin = useCallback((userId) => {
    dispatch({ type: 'LOGIN', userId });
  }, []);

  const onLogout = useCallback((userId) => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        userId: state.userInfo?.userId,
        checked: false,
      };
      dispatch({ type: 'INSERT', todo });
      nextId.current += 1; // nextId 1 씩 더하기
    },
    [state.userInfo],
  );

  const onRemove = useCallback(
    (id, userId) => {
      if (!state.userInfo || userId !== state.userInfo?.userId) {
        alert('본인의 투두 리스트만 삭제 가능합니다.');
        return;
      }
      dispatch({ type: 'REMOVE', id });
    },
    [state.userInfo],
  );

  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  const onEdit = useCallback((id, editText) => {
    dispatch({ type: 'EDIT', id, editText });
  }, []);

  const onClickEdit = useCallback(
    (todoOne, userId) => {
      if (!state.userInfo || userId !== state.userInfo?.userId) {
        alert('본인의 투두 리스트만 삭제 가능합니다.');
        return;
      }
      setEditMode((pre) => !pre);
      setInitTodo(todoOne);
    },
    [state.userInfo],
  );

  const onClickLogin = useCallback((todoOne) => {
    setLoginMode((pre) => !pre);
  }, []);

  return (
    <>
      <div className="loginTemplate">
        {state.userInfo ? (
          <button className="loginButton" onClick={onLogout}>
            로그아웃
          </button>
        ) : (
          <button className="loginButton" onClick={onClickLogin}>
            로그인
          </button>
        )}

        {loginMode ? (
          <LoginInputTemplate onLogin={onLogin} setLoginMode={setLoginMode} />
        ) : (
          <></>
        )}
      </div>
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
          userInfo={state.userInfo}
          todos={state.todos}
          onRemove={onRemove}
          onClickEdit={onClickEdit}
          onToggle={onToggle}
        />
      </TodoTemplate>
    </>
  );
};

export default App;
