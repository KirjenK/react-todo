import React, { useState } from 'react';

import styles from './todo.module.css';

export default function Todo() {
  const [textArea, setTextArea] = useState('');

  const [errMsg, setErrMsg] = useState('');

  const [todos, setTodos] = useState(
    [],
  );

  const [selectDefaultValue, setselectDefaultValue] = useState('all');

  const [filtredTodos, setFiltredTodos] = useState(todos);

  const handleTextArea = (e) => {
    setTextArea(e.target.value);
  };

  const addTodo = (todo) => {
    if (!textArea.length) {
      setErrMsg('Длина Todo должна быть больше 0');
      setTimeout(() => {
        setErrMsg('');
      }, [1500]);
    }
    if (textArea.length > 10) {
      setErrMsg('Длина Todo должна быть меньше 10');
      setTimeout(() => {
        setErrMsg('');
      }, [1500]);
    }
    if (textArea && textArea.length < 10) {
      const newTodo = {
        id: Date.now(),
        title: todo,
        status: false,
      };
      setTodos([...todos, newTodo]);
      setFiltredTodos([...todos, newTodo]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(textArea);
    setTextArea('');
    setselectDefaultValue('all');
  };

  const changeStatus = (id) => {
    setTodos([
      ...todos.map((todo) => (todo.id === id ? { ...todo, status: !todo.status } : { ...todo })),
    ]);
    setFiltredTodos([
      ...todos.map((todo) => (todo.id === id ? { ...todo, status: !todo.status } : { ...todo })),
    ]);
  };

  // фильтрация (select)

  const filterTodos = (status) => {
    setselectDefaultValue(status);
    if (status === 'all') {
      setFiltredTodos(todos);
    }
    if (status === 'true' || status === 'false') {
      setFiltredTodos([...todos].filter((el) => el.status.toString() === status));
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Todo</h1>
      <div className={styles.todoContainer}>
        <form onSubmit={handleSubmit} className={styles.addTodoForm}>
          <textarea
            value={textArea}
            type="text"
            className={styles.todoTextArea}
            cols="50"
            rows="5"
            onChange={handleTextArea}
            placeholder="Введите текст.."
          />
          <button className={styles.addTodoBtn} type="submit">Добавить запись</button>
        </form>

        <div>
          <div className={styles.todoList}>
            <p>
              Всего задач:
              {' '}
              {todos.length}
            </p>
            Выполненных:
            {' '}
            {todos.filter((el) => el.status === true).length}
            {' '}
            Не выполненных:
            {' '}
            {todos.filter((el) => el.status === false).length}
          </div>
          <hr />
          <div>
            <select
              onChange={(e) => filterTodos(e.target.value)}
              value={selectDefaultValue}
            >
              <option disabled>Фильтрация по типу</option>
              <option value="all">
                Все
              </option>
              <option value="true">
                Выполненные Todo
              </option>
              <option value="false">
                Не выполненные Todo
              </option>

            </select>
          </div>
          {filtredTodos && filtredTodos.map((el) => (
            <li
              className={el.status ? `${styles.todo} ${styles.todoComplete}` : styles.todo}
              key={el.id}
              onClick={() => changeStatus(el.id)}
            >
              <p>{el.title}</p>
              {' '}
              <p>
                {el.status
                  ? <span>Выполнено</span>
                  : <span>В процессе</span>}
              </p>
            </li>
          ))}
          <p className={styles.errMsg}>{errMsg}</p>
        </div>
      </div>
    </div>
  );
}
