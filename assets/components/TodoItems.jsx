import React, { useState } from "react";
import { deleteTask, toggleTask } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { Checked } from "../svg/Checked";
import { IconClose } from "../svg/IconClose";

export function TodoItems () {
   const [filter, setFilter] = useState('all');
   const tasks = useSelector(state => state.todo)
   const dispatch = useDispatch()

   const handleToggleTask = (value) => {
      dispatch(toggleTask(value))
   }

   const handleDeleteTask = (value) => {
      dispatch(deleteTask(value))
   };


   const filteredTodos = tasks.filter(todo => {
      switch (filter) {
         case 'completed':
            return todo.isChecked;
         case 'todo':
            return !todo.isChecked;
         default:
            return true;
      }
   });
   return (<>
      {filteredTodos.map(t =>
         <div
            key={Date.now() * Math.floor(Math.random() * 100)}
            className="todo">

            <div
               className="checkbox"
               onClick={() => handleToggleTask(t.value)}>
               {t.isChecked && <Checked />}
            </div>

            <p>{t.value}</p>

            <IconClose onClick={() => handleDeleteTask(t.value)} className={'btn'} />

         </div>
      )}

      <div className="filter">
         <button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'active' : ''}>
            Tout
         </button>

         <button
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'active' : ''}>
            Fait
         </button>

         <button
            onClick={() => setFilter('todo')}
            className={filter === 'todo' ? 'active' : ''}>
            A faire
         </button>
      </div>

   </>)
}