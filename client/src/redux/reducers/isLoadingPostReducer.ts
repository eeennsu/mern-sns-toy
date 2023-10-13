import { IsLoadingPostAction } from "../actionTypes/isLoadingPostAction";

const initialState: boolean = false; 

const isLoadingPostReducer = (state: boolean = initialState, { type, payload }: IsLoadingPostAction) => {

    switch(type) {
        case 'IS_LOADING_API_POST': 
            return payload;         // true 또는 false를 payload에 대입한다.
        
        default: 
            return state;
    }
}

export default isLoadingPostReducer;