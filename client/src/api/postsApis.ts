import axiosInst from './axiosInst';

export const getPosts_API = () => axiosInst.get<Post[]>('posts');

export const getOnePost_API = (id: string) => axiosInst.get<Post>(`posts/${id}`);

export const createPost_API = (newPost: PostFormData) => axiosInst.post('posts', newPost);

export const updatePost_API = (id: string, updatedForm: PostFormData) => axiosInst.patch<{ id: string; post: Post }>(`posts/${id}`, updatedForm);

export const deletePost_API = (id: string) => axiosInst.delete(`posts/${id}`);

export const plusLikePost_API = (id: string) => axiosInst.patch<Post>(`posts/${id}/likePost`);