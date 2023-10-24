type PostFormData = {
    title: string;
    message: string;
    tags: string[] | string;
    selectedFile: string;
}

type Post = PostFormData & {
    _id: string;
    creator: string;
    likes: string[];
    createdAt: Date | string;
}

type UserLoginFormType = {
    email: string;
    password: string;
}

type UserSignUpFormType =  & {
    firstName: string;
    lastName: string;
    emailID: string;
    emailDomain: string;
    password: string;
    repeatPassword: string;
    termsCheck: boolean;
}

type RequestSignUpUserType = {
    name: string;
    email: string;
    password: string
}

type GoogleUserInfo = {
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    locale: string;
    name: string;
    picture: string;
    sub: string;
}

type GoogleResponse = Omit<TokenResponse, "error" | "error_description" | "error_uri">

type DecodedUserToken = {
    email: string;
    password: string;
    iat: number;
    exp: number;
}