import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
  MdEdit,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onClickEdit, onToggle, style }) => {
  const { id, userId, text, checked } = todo;

  return (
    <div className="TodoListItem-virtualized" style={style}>
      <div className="TodoListItem">
        <div
          className={cn('checkbox', { checked })}
          onClick={() => onToggle(id)}
        >
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id, userId)}>
          <MdRemoveCircleOutline />
        </div>
        <div className="edit" onClick={() => onClickEdit(todo, userId)}>
          <MdEdit />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);
