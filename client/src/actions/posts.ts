import { createPost_API, deletePost_API, getPosts_API, plusLikePost_API, searchPosts_API, submitComment_API, updatePost_API } from '../api/postsApis';
import { RootDispatch } from '../redux/actionTypes'; 

// 액션생성자는 액션을 반환하는 함수이다
export const getPosts = (curPage: number) => async (dispatch: RootDispatch) => {
    try {
        dispatch({ type: 'IS_LOADING_API_POST', payload: true });
        const { data } = await getPosts_API(curPage);
        dispatch({ type: 'GET_POSTS', payload: data.pagePosts });
        dispatch({ type: 'UPDATE_TOTAL_POSTS_COUNT', payload: data.totalCount })
        dispatch({ type: 'IS_LOADING_API_POST', payload: false });

    } catch (error) {
        console.log(error);
    }
}   

export const searchPosts = (title: string, tags: string) => async (dispatch: RootDispatch) => {
    try {
        dispatch({ type: 'SEARCH_POSTS', payload: [] });            // 이전 검색 기록이 있으면 초기화
        dispatch({ type: 'IS_LOADING_API_POST', payload: true });
        const { data } = await searchPosts_API(title, tags);
        console.log(data);
        dispatch({ type: 'GET_POSTS', payload: [] });
        dispatch({ type: 'SEARCH_POSTS', payload: data.posts });
        dispatch({ type: 'UPDATE_TOTAL_POSTS_COUNT', payload: data.totalCount })
        dispatch({ type: 'IS_LOADING_API_POST', payload: false });
        
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post: PostFormData, creator: string) => async (dispatch: RootDispatch) => {
    try {
        const { data } = await createPost_API({ ...post, creator });
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

export const plusLiketPost = (id: string, googleEmail?: string) => async (dispatch: RootDispatch) => {
    try {
        const { data } = await plusLikePost_API(id, googleEmail);

        dispatch({ type: 'PLUS_LIKE_POST', payload: { id, post: data } });
    } catch (error) {
        console.log(error);
    }
}

export const submitComment = (id: string, value: string) => async (dispatch: RootDispatch) => {
    try {
        const { data } = await submitComment_API(id, value);

        dispatch({ type: 'SUBMIT_COMMENT', payload: data });

        return data;
    } catch (error) {
        console.log(error);
    }
}