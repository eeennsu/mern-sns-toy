export const SET_LOGIN_USER = 'SET_LOGIN_USER' as const;
export const SET_LOGOUT_USER = 'SET_LOGOUT_USER' as const;

export type Role = 'USER' | 'ADMIN' | null;

type SetLoginAction = {
    type: typeof SET_LOGIN_USER;
    payload: {
        role: Role
    }
}

type SetLogoutAction = {
    type: typeof SET_LOGOUT_USER;
    payload: null;              // 일단 null
}

export type UserAction = SetLoginAction | SetLogoutAction;