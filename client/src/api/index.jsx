import axios from 'axios';
// axios is used to make requests to the server and make api calls
const url = 'https://memories-24-7.onrender.com/posts';

export const fetchPosts = () => axios.get(url);
// Now we have to focus on adding redux capabilities to our application bcz all actions related to backend will be done using redux
// We do need to add a lot of files and folder but it will make our application more scalable and maintainable
export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);