import type { DocumentData } from "firebase/firestore/lite";

export interface AccountT {
  firstName: string;
  lastName: string;
  avatar?: string;
  displayName?: string;
  authId: string;
}

export interface UserT {
  _id: string;
  email: string;
  name: string;
}

export interface AuthUserT {
  uid: string;
  email: string;
}

export interface ApiResponseT {
  message: string;
  success: boolean;
  data?: AuthUserT;
}

export interface FirebaseApiResponseT {
  message: string;
  success: boolean;
  data?: DocumentData;
}

export interface UserExtendT extends UserT {
  password: string;
}

export type SignUpT = Omit<UserExtendT, "_id">;

export interface LoginT {
  email: string;
  password: string;
}

export type FetchStatusT = "idle" | "loading" | "success" | "error";

export type CurrentUser = AuthUserT | null;

export type MessageT = string | null;
