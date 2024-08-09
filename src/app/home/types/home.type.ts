export interface IPost {
    "userId": number;
    "id": number;
    "title": string;
    "body": string;
}

export interface IPostForm {
    "title": string;
    "body": string;
    "userId": number;
}

export interface IComment {
    body: string;
    email: string;
    id: number;
    name: string;
    postId: number;
}