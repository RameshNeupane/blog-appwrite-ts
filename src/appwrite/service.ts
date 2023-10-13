import config from "@config/config";
import { IPostToDB } from "src/types/posts.types";
import { Client, Databases, ID, Query, Storage } from "appwrite";

class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    /*********************************
     *
     * POST SERVICES
     *
     **********************************/

    // create post
    async createPost(
        slug: string,
        { title, content, featuredImage, status, userId }: IPostToDB
    ) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    // update post
    async updatePost(
        slug: string,
        { title, content, featuredImage, status, userId }: IPostToDB
    ) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            throw error;
        }
    }

    // delete post
    async deletePost(slug: string) {
        try {
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            throw error;
        }
    }

    // get a single post
    async getPost(slug: string) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            throw error;
        }
    }

    // get all posts having status 'active'
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            throw error;
        }
    }

    /*********************************
     *
     * FILE SERVICES
     *
     **********************************/

    // upload file
    async uploadFile(file: File) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            throw error;
        }
    }

    // delete file
    async deleteFile(fileId: string) {
        try {
            return await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            throw error;
        }
    }

    // preview file
    getFilePreview(fileId: string) {
        try {
            return this.storage.getFilePreview(config.appwriteBucketId, fileId);
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error", error);
            throw error;
        }
    }
}

const service = new Service();

export default service;
