import { createPost_API, deletePost_API, getPosts_API, plusLikePost_API, updatePost_API } from '../api/postsApis';
import { RootDispatch } from '../redux/actionTypes'; 

// 액션생성자는 액션을 반환하는 함수이다
export const getAllPosts = () => async (dispatch: RootDispatch) => {
    try {
        const { data } = await getPosts_API();
        dispatch({ type: 'GET_ALL_POSTS', payload: data });

    } catch (error) {
        console.log(error);
    }
}   

export const createPost = (post: PostFormData) => async (dispatch: RootDispatch) => {
    try {
        const { data } = await createPost_API(post);
        dispatch({ type: 'CREATE_POST', payload: data });

    } catch (error) {
       console.log(error);
    }
}

export const updatePost = (id: string, updatedForm: PostFormData) => async (dispatch: RootDispatch) => {
    try {
        const { data } = await updatePost_API(id, updatedForm);
        console.log(data);
        dispatch({ type: 'UPDATE_POST', payload: { id: data.id, post: data.post } });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id: string) => async (dispatch: RootDispatch) => {
    try {
        await deletePost_API(id);

        dispatch({ type: 'DELETE_POST', payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const plusLiketPost = (id: string) => async (dispatch: RootDispatch) => {
    try {
        const { data } = await plusLikePost_API(id);

        dispatch({ type: 'PLUS_LIKE_POST', payload: { id, post: data } });
    } catch (error) {
        console.log(error);
    }
}