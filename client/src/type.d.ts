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