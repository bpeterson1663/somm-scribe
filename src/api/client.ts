import { getAuth } from "firebase/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type RequestOptions = RequestInit & {
  authToken?: string;
};

export async function apiClient<TResponse>(
  endpoint: string,
  options: RequestOptions = {},
  authToken?: string
): Promise<TResponse> {

  const { headers, method, ...rest } = options;
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`API error (${res.status}): ${errorBody}`);
  }

  return res.json();
}

export async function authApiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error("No authenticated user found");
  }

  const token = await user.getIdToken();
  return apiClient<T>(endpoint, {
    ...options,
  },
  token);
}