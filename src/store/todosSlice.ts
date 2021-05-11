import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// 1. Webpack runs a dev server for ONLY FE files, to hot reload them
// 2. This server runs on localhost:8080 so you an access it from your browser
// 3. What we can on the FE is for example this, axios.get('/todos');
// 4. To host this server, you need NODE.JS APPLICATION RUNNING LOCALLY
// 5. This app would run on for example localhost:3000/todos
//Todo: export the error and loading state and use it for try & catch

// fullfilled
// rejected
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (_, { rejectWithValue }) => {
        try {
            /* throw new Error('blabla'); */
            const response = await axios.get('http://localhost:3000/todos')

            return response.data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    },
)

//Add Todos
//Add #2
export const postTodos = createAsyncThunk(
    'todos/postTodos',
    async (todos, { rejectWithValue }) => {
        console.log('Todos: ', todos)

        try {
            const {
                data: newTodo,
            } = await axios.post('http://localhost:3000/todos', { todos })

            return newTodo
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    },
)

// Get All Todos
// Add #3
export const getAllTodos = () => {
    createAsyncThunk('todos/postTodos', async (_, { rejectWithValue }) => {
        try {
            const { data: todos } = await axios.post(
                'http://localhost:3000/todos',
            )

            return todos
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    })
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        text: '',
        todos: [],
        open: false,
        editOpen: false,
        editedTodoId: undefined,
        updatedText: '',
        error: '',
        isLoading: true,
    },

    reducers: {
        handleAddTodo: (state, action) => {
            state.todos.push(action.payload)
            state.text = ''
        },
        changeText: (state, action) => {
            state.text = action.payload
        },
        completeCheckBox: (state, action) => {
            state.todos = action.payload
        },
        deleteTodoItem: (state, action) => {
            state.todos = action.payload
        },
        deleteOpenAndClose: (state, action) => {
            state.open = action.payload
        },
        editOpenAndClose: (state, action) => {
            state.editOpen = action.payload
        },
        editTodoId: (state, action) => {
            state.editedTodoId = action.payload
        },
        editItem: (state, action) => {
            state.todos = action.payload
        },
        setUpdatedText: (state, action) => {
            state.updatedText = action.payload
        },
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.isLoading = true
            state.error = ''
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.todos = action.payload
            state.isLoading = false
        },
        [fetchTodos.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        },
        [postTodos.pending]: (state) => {
            state.isLoading = true
            state.error = ''
        },
        [postTodos.fulfilled]: (state, action) => {
            state.isLoading = false
        },
        [postTodos.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        },
        [getAllTodos.pending]: (state) => {
            state.isLoading = true
            state.error = ''
        },
        [getAllTodos.fulfilled]: (state, action) => {
            state.todos = action.payload
            state.isLoading = false
        },
        [getAllTodos.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        },
    },
})

// TODO check out reselect library with redux toolkit
export const selectText = (state) => state.todos.text
export const selectTodos = (state) => state.todos.todos
export const selectOpen = (state) => state.todos.open
export const selectEditedTodoId = (state) => state.todos.editedTodoId
export const selectUpdatedText = (state) => state.todos.updatedText
export const selectEditOpen = (state) => state.todos.editOpen
export const selectError = (state) => state.todos.error
export const selectLoading = (state) => state.todos.isLoading

export default todosSlice

/*  error: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: state.todos
      };
    },

    loading: (state, action) => {
      return {
        ...state,
        isLoading: true,
      }
    },

    loaded: (state, action) => {
      return {
        ...state,
        isLoading: false,
        todos: state.todos
      }
    } */
