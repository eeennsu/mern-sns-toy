export const GET_POSTS = 'GET_POSTS' as const;
export const CREATE_POST = 'CREATE_POST' as const;
export const UPDATE_POST = 'UPDATE_POST' as const;
export const SEARCH_POSTS = 'SEARCH_POSTS' as const;

export const CHANGE_POST_ID_AT_FORM = 'CHANGE_POST_ID_AT_FORM' as const;
export const DELETE_POST = 'DELETE_POST' as const;
export const PLUS_LIKE_POST = 'PLUS_LIKE_POST' as const;
export const IS_LOADING_API_POST = 'IS_LOADING_API_POST' as const;
export const SELECT_POST_ID = 'SELECT_POST_ID' as const;

export const SUBMIT_COMMENT = 'SUBMIT_COMMENT' as const;
export const RESET_ALL_POSTS_SUB_INFOS = 'RESET_ALL_POSTS_SUB_INFOS' as const;

type GetAllPostAction = {
    type: typeof GET_POSTS;
    payload: Post[];             // post array
}

type CreatePostAction = {
    type: typeof CREATE_POST;
    payload: Post;              // post
}

type UpdatePostAction = {
    type: typeof UPDATE_POST;
    payload: {
        id: string;
        post: Post
    };
}

type DeletePostAction = {
    type: typeof DELETE_POST;
    payload: string;            // id
}

type PlusPostLikeAction = {
    type: typeof PLUS_LIKE_POST;
    payload: {
        id: string;
        post: Post
    };            // post
}

type IsLoadingAPIPostAction = {
    type: typeof IS_LOADING_API_POST;
    payload: boolean;
}

type SelectPostAction = {
    type: typeof SELECT_POST_ID;
    payload: string | null;  // id
}

type SerachPostsAction = {
    type: typeof SEARCH_POSTS;
    payload: Post[];
}

type ResetAllPostsSubInfoAction = {
    type: typeof RESET_ALL_POSTS_SUB_INFOS;
    payload: null;
}

type SubmitCommentAction = {
    type: typeof SUBMIT_COMMENT;
    payload: Post;
}

export type PostsAction = GetAllPostAction | CreatePostAction | UpdatePostAction | DeletePostAction | PlusPostLikeAction | IsLoadingAPIPostAction | SelectPostAction | SerachPostsAction | SubmitCommentAction | ResetAllPostsSubInfoAction;