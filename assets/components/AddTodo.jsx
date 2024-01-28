import React, { useState } from 'react';
import { addTask } from "../redux";
import { useDispatch } from "react-redux";
import { Checked } from "../svg/Checked";
import EventBus from "../hooks/EventBus";
import { IconClose } from "../svg/IconClose";

export function AddTodo () {
   const [newTask, setNewTask] = useState({value: '', isChecked: false})
   const dispatch = useDispatch()

   const handleNewTaskValue = (e) => {
      setNewTask(oldTask => {
         return {...oldTask, value: e.target.value}
      })
   };
   const toggleNewTask = (e) => {
      setNewTask(oldTask => {
         return {...oldTask, isChecked: !oldTask.isChecked}
      })
   };
   const handleAddTask = () => {
      if (newTask.value.length < 5) {
         EventBus.emit('ToastMessage', [{type: 'info', messages: ['Veuillez entrer plus de cinq caractères.']}])
      } else {
         dispatch(addTask(newTask))
      }
   }


   return (
      <div className="add-todo">
         <div className={"checkbox"} onClick={toggleNewTask}>
            {newTask.isChecked && <Checked />}
         </div>

         <input type="text" value={newTask.value} onChange={handleNewTaskValue} />

         <IconClose onClick={handleAddTask} className={'btn btn-add'} />
      </div>
   )
}