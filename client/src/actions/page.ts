import { RootDispatch } from '../redux/actionTypes'; 
import { getPosts } from './posts';

export const changePage = (curPage: number = 1, changeValue: number) => async (dispatch: RootDispatch) => {
    dispatch({ type: 'IS_PAGE_LOADING', payload: true });

    const changedPage = curPage + changeValue;

    dispatch({ type: 'CHANGE_CUR_PAGE', payload: changedPage });

    const getPostsDispatch = getPosts(changedPage);
    await getPostsDispatch(dispatch);
    
    dispatch({ type: 'IS_PAGE_LOADING', payload: false });
}

export const changeDirectPage = (directPage: number) => async (dispatch: RootDispatch) => {
    dispatch({ type: 'IS_PAGE_LOADING', payload: true });

    dispatch({ type: 'CHANGE_CUR_PAGE', payload: directPage });

    const getPostsDispatch = getPosts(directPage);
    await getPostsDispatch(dispatch);
    
    dispatch({ type: 'IS_PAGE_LOADING', payload: false });
}