import { PageAction } from '../actionTypes/pageActionsTypes';

type PageStateType = {
    curPage: number;
    totalCount: number;
    isPageLoading: boolean;
    isPageError: boolean;
}

const initialState: PageStateType = {
    curPage: 1,
    totalCount: 0,
    isPageLoading: false,
    isPageError: false
}

const pageReducer = (state: PageStateType = initialState, { type, payload }: PageAction): PageStateType => {

    switch(type) {        
        case 'CHANGE_CUR_PAGE': {
            return {
                ...state,
                curPage: payload,
            }
        }

        case 'UPDATE_TOTAL_POSTS_COUNT': {
            return {
                ...state,
                totalCount: payload
            }
        }

        case 'IS_PAGE_LOADING':
            return {
                ...state,
                isPageLoading: payload,
            }

        case 'IS_PAGE_ERROR': 
            return {
                ...state,
                isPageError: payload
            }
       
        default: return state
    }
}

export default pageReducer;