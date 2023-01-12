import React, { useState } from 'react';
import { Checkbox } from '../../atoms/checkbox';
import { Category } from '../../atoms/category';
import styles from './todo.module.scss';
import useFetch from '../../hooks/useFetch';
import { BsTrash } from 'react-icons/bs';
import { MdOutlineEdit } from 'react-icons/md';
import { AiOutlineSave } from 'react-icons/ai';

interface ITodo {
  task: string;
  isCompleted: boolean;
  id: number;
  category: string;
  color?: string;
  setNewTodoAdded: any;
}

const Todo: React.FC<ITodo> = ({
  task,
  id,
  isCompleted,
  category,
  color,
  setNewTodoAdded,
}) => {
  const [completed, setCompleted] = useState(isCompleted);
  const [editedValue, setEditedValue] = useState(task);
  const [edit, setEdit] = useState(true);
  const { makeRequest } = useFetch();

  const changeTaskState = async () => {
    setCompleted(!completed);
    const url = `http://localhost:5000/todos/${id}`;
    const body = { completed: !completed };
    makeRequest(url, 'PUT', body);
  };
  const deleteTodo = async () => {
    const url = `http://localhost:5000/todos/${id}`;
    makeRequest(url, 'delete');
    setNewTodoAdded(true);
  };

  const handleEdit = () => {
    setEdit(false);
  };

  const handleSave = () => {
    const url = `http://localhost:5000/todos/${id}`;
    const body = { name: editedValue };
    makeRequest(url, 'PUT', body);
    setEdit(!edit);
  };
  const actions = [
    {
      icon: edit ? <MdOutlineEdit /> : <AiOutlineSave />,
      action: edit ? handleEdit : handleSave,
      name: 'edit',
    },
    {
      icon: <BsTrash />,
      action: deleteTodo,
      name: 'delete',
    },
  ];

  const { Todo__Checked, Todo__Task, Todo__Task__Checked } = styles;
  return (
    <div className={`${styles.Todo} ${completed && Todo__Checked}`}>
      <Checkbox checked={completed} onChecked={changeTaskState} />
      <input
        className={`${Todo__Task} ${completed && Todo__Task__Checked}`}
        disabled={edit}
        value={editedValue}
        onChange={(event) => setEditedValue(event.target.value)}
      />

      <Category
        categoryName={category}
        color={color ? color : 'transparent'}
        categoryId={0} //FIXME
      />
      <div>
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              action.action();
            }}
          >
            {action.icon}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Todo;
