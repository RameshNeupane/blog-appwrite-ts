import { Models } from "appwrite";

export type PostFromDB = Models.Document;

export interface IPostToDB {
    title: string;
    content: string;
    featuredImage: string;
    status: "inactive" | "active";
    userId: string;
}

export interface IPostFormData {
    title: string;
    slug: string;
    content: string;
    image: FileList;
    status: "active" | "inactive";
}

export interface IAddNewPostData {
    data: IPostFormData;
    userId: string;
}

export interface IUpdatePostData {
    post: PostFromDB;
    data: IPostFormData;
}
