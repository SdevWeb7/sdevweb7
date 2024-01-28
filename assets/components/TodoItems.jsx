import React, { useEffect, useState } from "react";
import { deleteTask, setTasks, toggleTask } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { Checked } from "../svg/Checked";
import { IconClose } from "../svg/IconClose";
import { useAppStore } from "../store";
import eventBus from "../hooks/EventBus";

export function TodoItems () {
   const user = useAppStore.use.user()
   const [filter, setFilter] = useState('all');
   const tasks = useSelector(state => state.todo)
   const dispatch = useDispatch()

   useEffect(() => {
      if (user && Object.keys(user).length > 0) {
         dispatch(setTasks(user.todos))
      }
   }, [user])

   const handleToggleTask = (value) => {
      if (user && Object.keys(user).length > 0) {
         fetch('/toggle_todo', {
            method: 'POST',
            body: value
         }).then(r => {
            if (!r.ok) {
               eventBus.emit('ToastMessage', [{type: 'error', messages: ['Problème serveur']}])
            } else {
               dispatch(toggleTask(value))
            }
         })
      } else {
         dispatch(toggleTask(value))
      }
   }

   const handleDeleteTask = (value) => {
      if (user && Object.keys(user).length > 0) {
         fetch('/delete_todo', {
            method: 'POST',
            body: value
         }).then(r => {
            if (!r.ok) {
               eventBus.emit('ToastMessage', [{type: 'error', messages: ['Problème serveur']}])
            } else {
               dispatch(deleteTask(value))
            }
         })
      } else {
         dispatch(deleteTask(value))
      }
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
            Toutes
         </button>

         <button
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'active' : ''}>
            Faite(s)
         </button>

         <button
            onClick={() => setFilter('todo')}
            className={filter === 'todo' ? 'active' : ''}>
            A faire(s)
         </button>
      </div>

   </>)
}