import { Client, Query, Databases, Storage ,ID} from "appwrite";
import { config } from "../Config/config";

export class Services{
   client;
   databases;
   storage;
   constructor(){
    this.client = new Client()
      .setEndpoint(config.APPWRITE_URL)
      .setProject(config.PROJECT_ID)

      this.databases = new Databases(this.client);
      this.storage = new Storage(this.client);
      
       
   }

   async createPost({tittle, content, featureImage, status, UserId}){
      try {
         return await this.databases.createDocument(
            config.DATABASE_ID,
            config.ARTICLES_COLLECTION_ID,
         ID.unique(),
            {
               tittle,
               content,
               featureImage,
               status,
               UserId,
            }
         )
      } catch (error) {
         console.log("Appwrite service :: createPost :: error", error);
      }
   }

   async updatePost(slug, {tittle, content, featureImage, status}){
      try {
         return await this.databases.updateDocument(
            config.DATABASE_ID,
            config.ARTICLES_COLLECTION_ID,
            slug,
            {
               tittle,
               content,
               featureImage,
               status,
            }
         )
      } catch (error) {
         console.log("Appwrite service :: updatePost :: error", error);
      }
   }

   async getPost(slug){
      try {
         return await this.databases.getDocument(
            config.DATABASE_ID,
            config.ARTICLES_COLLECTION_ID,
            slug
         )
      } catch (error) {
         console.log("Appwrite service :: getPost :: error", error);
      }
   }
   async deletePost(slug){
      try {
         await this.databases.deleteDocument(
            config.DATABASE_ID,
            config.ARTICLES_COLLECTION_ID,
            slug
         )
         return true;
      } catch (error) {
         console.log("Appwrite service :: deletePost :: error", error);
         return false;
      }
   }

   async getPosts(queries = [Query.equal("status", "active")]){
      try {
         return await this.databases.listDocuments(
            config.DATABASE_ID,
            config.ARTICLES_COLLECTION_ID,
            queries
         )
      } catch (error) {
         console.log("Appwrite service :: getPosts :: error", error);
         return false;
      }
   }

   async getHiddenPosts(queries = [Query.equal("status", "inactive")]){
      try {
         return await this.databases.listDocuments(
            config.DATABASE_ID,
            config.ARTICLES_COLLECTION_ID,
            queries
         )
      } catch (error) {
         console.log("Appwrite service :: getPosts :: error", error);
         return false;
      }
   }

   async uploadFile(file){
      try {
         return await this.storage.createFile(
            config.BUCKET_ID,
            ID.unique(),
            file
         )
      } catch (error) {
         console.log("Appwrite service :: uploadFile :: error", error);
         return false;
      }
   }

   async deleteFile(fileId){
      try {
         await this.storage.deleteFile(
            config.BUCKET_ID,
            fileId
         )
         return true;
      } catch (error) {
         console.log("Appwrite service :: deleteFile :: error", error);
         return false;
      }
   }

   getFilePreview(fileId){
      
         return this.storage.getFilePreview(
            config.BUCKET_ID,
            fileId
         )

   }   

   async getUserProfile(UserId) {
      try {
          return await this.databases.getDocument(
              config.DATABASE_ID,
              config.USERS_COLLECTION_ID,
              UserId
          );
      } catch (error) {
          console.error("Appwrite service :: getUserProfile :: error", error);
          throw error;
      }
  }

  
}



const services = new Services();
export default services;