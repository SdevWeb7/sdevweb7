import React, { useEffect, useState } from "react";
import { setTasks } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { useAppStore } from "../store";
import { TodoItem } from "./TodoItem";
import { Reorder } from 'framer-motion'

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

      <Reorder.Group
         axis="y"
         values={tasks}
         onReorder={() => setTasks(tasks)}>

         {filteredTodos.map(t => <TodoItem key={Date.now() * Math.floor(Math.random() * 100)} value={t} />)}
      </Reorder.Group>

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