import { configureStore, createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
   name: 'todo',
   initialState: [
      {value: 'Vous pouvez tester la todolist', isChecked: true},
      {value: 'Mais il faudra vous connecter', isChecked: false},
      {value: 'Pour persister les données', isChecked: true}
   ],
   reducers: {
      setTasks: (state, action) => {
         return action.payload;
      },
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

export const { setTasks, addTask, deleteTask, toggleTask } = todoSlice.actions

export const store = configureStore({
   reducer: {
      todo: todoSlice.reducer
   }
})