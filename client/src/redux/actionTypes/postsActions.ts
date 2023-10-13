export const GET_ALL_POSTS = 'GET_ALL_POSTS' as const;
export const CREATE_POST = 'CREATE_POST' as const;
export const UPDATE_POST = 'UPDATE_POST' as const;
export const CHANGE_POST_ID_AT_FORM = 'CHANGE_POST_ID_AT_FORM' as const;
export const DELETE_POST = 'DELETE_POST' as const;
export const PLUS_LIKE_POST = 'PLUS_LIKE_POST' as const;

type GetAllPostAction = {
    type: typeof GET_ALL_POSTS;
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

export type PostsAction = GetAllPostAction | CreatePostAction | UpdatePostAction | DeletePostAction | PlusPostLikeAction;