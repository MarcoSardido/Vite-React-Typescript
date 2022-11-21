import React from 'react'
import { ITodo } from '../App'

interface ITodoProps {
    todoProp: ITodo;
    checkTodoFunc: (id: number) => void;
    deleteTodoFunc: (id: number) => void;
}

const Todo = ({ todoProp, checkTodoFunc, deleteTodoFunc }: ITodoProps) => {
    return (
        <div className={`todo ${todoProp.status}`}>
            <div className="title">{todoProp.task}</div>
            <div className="button-group">
                <button onClick={() => checkTodoFunc(todoProp.id)} className='done'>{todoProp.status === 'done' ? '✖' : '✔'}</button>
                <button onClick={() => deleteTodoFunc(todoProp.id)} className='delete'>🗑</button>
            </div>
        </div>
    )
}

export default Todo