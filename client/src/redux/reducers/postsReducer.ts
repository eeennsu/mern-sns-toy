import { PostsAction } from "../actionTypes/postsActions";

const initialState: Post[] = []; 

const postsReducer = (state: Post[] = initialState, { type, payload }: PostsAction) => {

    switch(type) {
        case 'GET_ALL_POSTS': 
            return payload;
        
        case 'CREATE_POST': 
            return [...state, payload];

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
            return state.map((post) => post._id === payload.id ? payload.post : post);
        
        case 'DELETE_POST': 
            return state.filter(post => post._id !== payload);      // id와 같은것을 거르기

            // 전달받은 것으로 교체
        case 'PLUS_LIKE_POST': 
            return state.map(post => post._id === payload.id ? payload.post : post);

        default: 
            return state;
    }
}

export default postsReducer;