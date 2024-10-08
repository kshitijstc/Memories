import axios from 'axios';
// axios is used to make requests to the server and make api calls

// ----------------------------------------------------------
const API = axios.create({ baseURL: 'https://memories-24-7.onrender.com' });
// const API = axios.create({ baseURL: 'http://localhost:5000/'});

//----------------------------------------------------------
// For middleware
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (formData) => API.post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost= (id) => API.patch(`/posts/${id}/likePost`);
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });