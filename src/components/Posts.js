import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost, updatePost } from '../redux/postsSlice';
import { nanoid } from '@reduxjs/toolkit'

const Posts = () => {

    
    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");


    const [updateTitle, setUpdateTitle] = useState("");
    const [updateDesc, setUpdateDesc] = useState("");

    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(null);

    const dispatch = useDispatch();

    
    const addP = () => {
        dispatch(addPost({id: nanoid(), title, description}));
    }

    const posts = useSelector((state) => state.posts.items);


    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem("posts"));
        if (savedPosts && savedPosts.length > 0) {
            savedPosts.forEach(post => {dispatch(addPost(post))});
        }
    }, [dispatch]);

    useEffect(() => {
        if (posts.length > 0) {
            localStorage.setItem("posts", JSON.stringify(posts));
        } else {
            localStorage.removeItem("posts");
        }
    }, [posts]);
    
  
    return (
    <>
        <h1>Crud App</h1>
        <div className='form'>
            <input type='text'
            placeholder="Enter the Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}/>

            <input type='text'
            placeholder="Enter the Desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}/>

            <button className='add'
            disabled={title === '' || description === ''}
            onClick={() => {addP(); setTitle(""); setDescription("")}}>
                Add Post
            </button>
        </div>

        <div className='posts'>
            {posts.length > 0 ? posts.map((post) => 
                (<div key={post.id} className='post'>
                    <h2 className='title'>{post.title}</h2>
                    <p className='desc'>{post.description}</p>
                    <button className='edit' onClick={() => {setEdit(true); setId(post.id)}}>Edit</button>
                    <button className='delete' onClick={() => dispatch(deletePost(post.id))}>Delete</button>
                    <br/>

                    {edit && id === post.id && (<>
                        <input
                            type="text"
                            placeholder='Edit post title'
                            onChange={(e) => setUpdateTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Edit post description'
                            onChange={(e) => setUpdateDesc(e.target.value)}
                        />
                        <button className='save'
                            disabled={updateTitle === '' || updateDesc === ''}
                            onClick={() => {
                                dispatch(updatePost({id: post.id, title: updateTitle, description: updateDesc}));
                                setEdit(false);
                                setUpdateTitle('');
                                setUpdateDesc('');
                            }}>Save</button>
                        </> )}
                </div>)): "No posts here"
            }
        </div>
    </>
    
  )
}

export default Posts