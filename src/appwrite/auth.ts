import config from "@config/config";
import { Account, Avatars, Client, ID } from "appwrite";

interface createAccountParams {
    email: string;
    password: string;
    name: string;
}

interface loginParams {
    email: string;
    password: string;
}

class AuthService {
    client = new Client();
    account;
    avatars;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
        this.avatars = new Avatars(this.client);
    }

    // signup
    async createAccount({ email, password, name }: createAccountParams) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) {
                return await this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error", error);
            throw error;
        }
    }

    // login/signin
    async login({ email, password }: loginParams) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Appwrite service :: login :: error", error);
            throw error;
        }
    }

    // get current user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            throw error;
        }
    }

    // logout
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
            throw error;
        }
    }

    // avatar
    getAvatarInitials(name = "") {
        try {
            const response = this.avatars.getInitials(name);
            return response.href;
        } catch (error) {
            console.log(
                "Appwrite service :: getAvatarInitials :: error",
                error
            );
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
