import { CodeResponse } from '@react-oauth/google';

export const SET_LOGIN_USER = 'SET_LOGIN_USER' as const;
export const SET_LOGOUT_USER = 'SET_LOGOUT_USER' as const;

export type Role = 'USER' | 'ADMIN' | null;

export type User = {
    role: Role,
    email: string,
    imgUrl: string,
    googleResponse: CodeResponse | null,        // 일반 로그인일 수도 있으므로 null
}

type SetLoginAction = {
    type: typeof SET_LOGIN_USER;
    payload: User
}

type SetLogoutAction = {
    type: typeof SET_LOGOUT_USER;
    payload: null;              // 일단 null
}

export type UserAction = SetLoginAction | SetLogoutAction;