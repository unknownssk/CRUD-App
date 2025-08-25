import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: [],

}

export const postsSlice = createSlice({
    name: 'Posts',
    initialState,

    reducers: {
        addPost: function(state, action){
            state.items.push(action.payload)
        },
        deletePost: function(state, action){
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updatePost: function(state, action){
            state.items.forEach(item => {
                if(item.id === action.payload.id){
                    item.title = action.payload.title
                    item.description = action.payload.description
                }
            })
        },
    },
})

export const {addPost, deletePost, updatePost} = postsSlice.actions

export default postsSlice.reducer