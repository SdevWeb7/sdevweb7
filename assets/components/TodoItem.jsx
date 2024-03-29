import React from "react";
import { Reorder, useDragControls } from "framer-motion"
import { Checked } from "../svg/Checked";
import { IconClose } from "../svg/IconClose";
import eventBus from "../hooks/EventBus";
import { deleteTask, toggleTask } from "../redux";
import { useDispatch } from "react-redux";
import { useAppStore } from "../store";

export function TodoItem ({ value }) {
   const user = useAppStore.use.user()
   const controls = useDragControls()
   const dispatch = useDispatch()

   const handleToggleTask = () => {
      if (user && Object.keys(user).length > 0) {
         fetch('/toggle_todo', {
            method: 'POST',
            body: value.value
         }).then(r => {
            if (!r.ok) {
               eventBus.emit('ToastMessage', [{type: 'error', messages: ['Problème serveur']}])
            } else {
               dispatch(toggleTask(value.value))
            }
         })
      } else {
         dispatch(toggleTask(value.value))
      }
   }

   const handleDeleteTask = () => {
      if (user && Object.keys(user).length > 0) {
         fetch('/delete_todo', {
            method: 'POST',
            body: value.value
         }).then(r => {
            if (!r.ok) {
               eventBus.emit('ToastMessage', [{type: 'error', messages: ['Problème serveur']}])
            } else {
               dispatch(deleteTask(value.value))
            }
         })
      } else {
         dispatch(deleteTask(value.value))
      }
   };

   return (
      <Reorder.Item
         value={value}
         dragListener={false}
         dragControls={controls}
         className={`todo`}
      >
         <div
            className="checkbox"
            onClick={handleToggleTask}>
            {value.isChecked && <Checked />}
         </div>

         <p>{value.value}</p>

         <IconClose onClick={handleDeleteTask} className={'btn btn-close'} />

         <div
            onPointerDown={(e) => controls.start(e)}
            className={'dragger'}>▒ ▒</div>
      </Reorder.Item>
   )
}