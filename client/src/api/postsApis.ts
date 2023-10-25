import axiosInst from './axiosInst'; 

export const getPosts_API = (curPage: number) => axiosInst.get<Response_getPosts_API>('posts', { params: { curPage }});

export const getOnePost_API = (id: string) => axiosInst.get<Post>(`posts/${id}`);

export const createPost_API = (newPost: PostFormData & { creator: string}) => axiosInst.post('posts', newPost);

export const updatePost_API = (id: string, updatedForm: PostFormData) => axiosInst.patch<{ id: string; post: Post }>(`posts/${id}`, updatedForm);

export const deletePost_API = (id: string) => axiosInst.delete(`posts/${id}`);

export const plusLikePost_API = (id: string) => axiosInst.patch<Post>(`posts/${id}/likePost`);