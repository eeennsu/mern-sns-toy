type PostFormData = {
    title: string;
    message: string;
    creator: string;
    tags: string[] | string;
    selectedFile: string;
}

type Post = PostFormData & {
    _id: string;
    likeCount: number;
    createdAt: Date | string;
}

type UserFormType = {
    user_email: string;
    user_pw: string;
}
