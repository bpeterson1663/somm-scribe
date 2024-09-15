import { connectorConfig } from "@firebasegen/somm-scribe-connector";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getDataConnect } from "firebase/data-connect";
// import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from "firebase/firestore/lite";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

type Prefix = "account" | "wine";

interface UploadImageResponse {
  photoUrl: string;
  error: string;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app)
export const db = getFirestore(app);

export const auth = getAuth();

export const storage = getStorage();

export const dc = getDataConnect(app, connectorConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = async () => await signInWithPopup(auth, googleProvider);

export async function uploadImage(file: Blob, prefix: Prefix, id: string): Promise<UploadImageResponse> {
  const fileType = file.type.split("/")[1];
  const fileRef = ref(storage, `${prefix}-${id}.${fileType}`);
  try {
    await uploadBytes(fileRef, file);
    const photoUrl = await getDownloadURL(fileRef);
    return {
      photoUrl,
      error: "",
    };
  } catch (err: any) {
    console.error(err);
    return {
      photoUrl: "",
      error: err.message,
    };
  }
}

export async function removeImage(url: string) {
  const fileRef = ref(storage, url);
  try {
    await deleteObject(fileRef);
    return {
      success: true,
      message: "image removed successfully",
    };
  } catch (err: any) {
    return {
      success: false,
      message: `error occured removing image ${err}`,
    };
  }
}
