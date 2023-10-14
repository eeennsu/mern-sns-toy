import { PostsAction } from "../actionTypes/postsActions";

type PostsStateType = {
    isLoadingPost: boolean;
    posts: Post[];
    selectedPost?: Post;
}

const initialState: PostsStateType = {
    isLoadingPost: false,
    posts: [],
    selectedPost: undefined,
}

const postsReducer = (state: PostsStateType = initialState, { type, payload }: PostsAction): PostsStateType => {

    switch(type) {
        case 'GET_ALL_POSTS': 
            return {
                ...state,
                posts: payload
            };
        
        case 'CREATE_POST':
            return {
                ...state,
                posts: [...state.posts , payload]
            };

        case 'UPDATE_POST': 
            // 방법1
            // const updatedPostIndex = state.findIndex(post => post._id === payload.id);
    
            // // slice는 새로운 배열, splice는 기존 배열 변경
            // return [
            //     ...state.slice(0, updatedPostIndex),
            //     payload.post,
            //     ...state.slice(updatedPostIndex + 1)
            // ];   

            // 방법2, 반복문을 돌아서 id 경로와 일치하는 것만 변경
            return {
                ...state,
                posts: state.posts.map((post) => post._id === payload.id ? payload.post : post)
            };
        
        case 'DELETE_POST': 
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== payload)   // id와 같은것을 거르기
            };

            // 전달받은 것으로 교체v
        case 'PLUS_LIKE_POST': 
            return {
                ...state,
                posts: state.posts.map((post) => post._id === payload.id ? payload.post : post)
            };

        case 'IS_LOADING_API_POST' : 
            return {
                ...state,
                isLoadingPost: payload               // payload에는 triigger 
            }

        case 'SELECT_POST_ID':         
            return {
                ...state,
                selectedPost: state.posts.find((post) => post._id === payload)
            }
            
        default: 
            return state;
    }
}

export default postsReducer;