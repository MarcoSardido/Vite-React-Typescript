import React, { useRef, useState } from 'react'
import Todo from './components/Todo'
import './style.scss'

//! Interface
export type ITodo = {
  id: number;
  task: string;
  status: string;
}

const App = () => {
  //! State 
  const [todos, setTodos] = useState<ITodo[]>([])

  //! Ref
  const addTodoRef = useRef<HTMLInputElement | null>(null);

  //! Function
  const addTodo = () => {
    if (addTodoRef.current) {
      const taskName = addTodoRef.current.value;
      const uniqueID = Math.floor((Math.random() * 1000) + 1);

      setTodos([
        ...todos,
        { id: uniqueID, task: taskName, status: 'pending' }
      ])

      //? Clear input
      addTodoRef.current.value = '';
    }
  }

  const checkTodo = (id: number) => {
    setTodos(currTodo => {
      if (currTodo.find(findTodo => findTodo.id === id)) {
        return currTodo.map(todo => {
          if (todo.id === id) {
            if (todo.status === 'done') {
              return { ...todo, status: 'pending' }
            } else {
              return { ...todo, status: 'done' }
            }
          } else {
            return todo
          }
        })
      } else {
        return currTodo
      }
    })
  }

  const deleteTodo = (id: number) => {
    setTodos(currTodo => currTodo.filter(todo => todo.id !== id))
  }

  return (
    <>
      <div className="todo-app">
        <div className="todo-header">
          <div className="title">
            <p>Todo App</p>
            <p className="dev">by: MarcoSardido</p>
          </div>
          <div className="form">
            <input ref={addTodoRef} type="text" placeholder="Enter a todo..." />
            <button className='add' onClick={addTodo}>+</button>
          </div>
        </div>
        <div className="todo-body">
          {todos.length === 0 ? (
            <p style={{textAlign: 'center', fontWeight: 'bold'}}>No task available 🎉</p>
          ) : (
            todos.map((todo, index) => (
              <Todo key={index} todoProp={todo} checkTodoFunc={checkTodo} deleteTodoFunc={deleteTodo} />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default App