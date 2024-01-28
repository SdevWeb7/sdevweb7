import { configureStore, createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
   name: 'todo',
   initialState: [
      {value: 'Tache1', isChecked: false},
      {value: 'Tache2', isChecked: true}
   ],
   reducers: {
      addTask: (state, action) => {
         state.push({
            value: action.payload.value,
            isChecked: action.payload.isChecked,
         });
      },
      toggleTask: (state, action) => {
         const task = state.find(t => t.value === action.payload)
         task.isChecked = !task.isChecked
      },
      deleteTask: (state, action) => {
         return state.filter(t => t.value !== action.payload)
      }
   }
})

export const { addTask, deleteTask, toggleTask } = todoSlice.actions

export const store = configureStore({
   reducer: {
      todo: todoSlice.reducer
   }
})