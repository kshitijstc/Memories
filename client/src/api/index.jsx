import axios from 'axios';
// axios is used to make requests to the server and make api calls

// ----------------------------------------------------------
// const API = axios.create({ baseURL: 'https://memories-24-7.onrender.com' });
const API = axios.create({ baseURL: 'http://localhost:5000/'});
// Whenever you uncomment and comment it make sure to change the image url in Post.jsx and in many other places also
// ----------------------------------------------------------

// For middleware
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});


// const url = 'https://memories-24-7.onrender.com/posts';


// Now we have to focus on adding redux capabilities to our application bcz all actions related to backend will be done using redux
// We do need to add a lot of files and folder but it will make our application more scalable and maintainable
// export const fetchPosts = () => axios.get(url);
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => {
  return API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}`);
};


// export const createPost = (newPost) => API.post("/posts", newPost);
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
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