import React from "react";
import { AddTodo } from "../components/AddTodo";
import { TodoItems } from "../components/TodoItems";

export function Todolist () {

   return (
      <>
         <h1>Todolist</h1>

         <div className="todolist">
            <AddTodo />

            <TodoItems />
         </div>
      </>
   );
}