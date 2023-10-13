export const IS_LOADING_API_POST = 'IS_LOADING_API_POST' as const;

type IsLoadingAPIPostAction = {
    type: typeof IS_LOADING_API_POST;
    payload: boolean;
}

export type IsLoadingPostAction = IsLoadingAPIPostAction;