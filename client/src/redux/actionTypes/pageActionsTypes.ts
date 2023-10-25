export const CHANGE_CUR_PAGE = 'CHANGE_CUR_PAGE' as const;
export const UPDATE_TOTAL_POSTS_COUNT = 'UPDATE_TOTAL_POSTS_COUNT' as const;
export const IS_PAGE_LOADING = 'IS_PAGE_LOADING' as const;
export const IS_PAGE_ERROR = 'IS_PAGE_ERROR' as const;

type ChangeCurPage = {
    type: typeof CHANGE_CUR_PAGE;
    payload: number;
}

type UpdateTotalPostsCount = {
    type: typeof UPDATE_TOTAL_POSTS_COUNT;
    payload: number;
}

type IsLoading = {
    type: typeof IS_PAGE_LOADING;
    payload: boolean;
}

type IsError = {
    type: typeof IS_PAGE_ERROR;
    payload: boolean;
}

export type PageAction = ChangeCurPage | UpdateTotalPostsCount | IsLoading | IsError;