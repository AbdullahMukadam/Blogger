 export const config = {
    APPWRITE_URL: String(import.meta.env.VITE_APPWRITE_URL),
    PROJECT_ID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    ARTICLES_COLLECTION_ID : String(import.meta.env.VITE_APPWRITE_ARTICLES_COLLECTION_ID),
    USERS_COLLECTION_ID : String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    DATABASE_ID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    BUCKET_ID : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
   }