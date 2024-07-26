import { Account, Client, ID, Databases, Avatars } from "appwrite";
import { config } from "../Config/config";

export class Auth {
    client = new Client();
    account;
    databases;
    avatars;

    constructor() {
        this.client
            .setEndpoint(config.APPWRITE_URL)
            .setProject(config.PROJECT_ID);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.avatars = new Avatars(this.client);
    }

    async createAccount({ email, password, name }) {
        try {

            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {

                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Appwrite service :: createAccount :: error", error);
            throw error;
        }
    }

    async updateAccount({email,password}){
        try{
           return await this.account.updateEmail(email,password);
        } catch(error){
            console.error("Appwrite service :: updateAccount :: error", error);
            throw error;

        }
    }

    //this is a testing method
    async saveUserToDB({ email, name, avatar, bio, UserId }) {
        try {
            return await this.databases.createDocument(
                config.DATABASE_ID,
                config.USERS_COLLECTION_ID,
                //USERS_COLLECTION
                ID.unique(),
                {
                    email,
                    name,
                    avatar,
                    bio,
                    UserId
                }
            );
        } catch (error) {
            console.log("Appwrite service :: saveUserToDB :: error", error);
        }
    }

    async getUser({ UserId }) {
        try {
            return await this.databases.getDocument(
                config.DATABASE_ID,
                config.USERS_COLLECTION_ID,
                UserId
            )
        } catch (error) {
            console.log(error)
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }

   
}

const authservice = new Auth();
export default authservice;

