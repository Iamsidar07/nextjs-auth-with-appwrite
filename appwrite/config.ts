import config from "@/config/config";
import { Client, Account, ID } from "appwrite";

// type for register user
type CreateUserAccount = {
    username: string,
    email: string,
    password: string,
}

// type for login user

type LoginUserAccount = {
    email: string,
    password: string,
}

const appwriteClient = new Client(); // talks to appwrite

appwriteClient.setEndpoint(config.appwriteEndpoint).setProject(config.appwriteProjectId);

export const account = new Account(appwriteClient);

// create class when working with appwrite

export class AppwriteService {
    // create a user in appwrite database
    async createUserAccount({ username, email, password }: CreateUserAccount) {
        console.log({ username, email, password });
        // database talking so try-catch
        try {
            const id = ID.unique();
            const user = await account.create(id, email, password, username);
            if (user) {
                return this.loginUserAccount({ email, password });
            } else {
                return user
            }

        } catch (error: any) {
            console.log(error);
            // throw new Error(error);
        }
    }
    async loginUserAccount({ email, password }: LoginUserAccount) {
        try {
            const user = await account.createEmailSession(email, password);
            return user;
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }
    async isLoggedInUserAccount(): Promise<Boolean> {
        try {
            const user = await this.getCurrentUserAccount();
            return Boolean(user);
        } catch (error: any) {
            console.log(error);
        }
        return false;
    }
    async getCurrentUserAccount() {
        try {
            const user = await account.get();
            if(!user) return null;
            return user;
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }
    async logoutUserAccount() {
        try {
            const user = await account.deleteSession("current");
            return user;
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }

}

const appwriteService = new AppwriteService();

export default appwriteService;