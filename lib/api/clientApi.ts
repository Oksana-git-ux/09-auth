import type { Note } from "@/types/note";
import { NextServer } from "./api";
import { User } from "@/types/user";


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface requestBodyData {
  title: string;
  content: string;
  tag: string;
}

export type registerRequest = {
  email: string;
  password: string;
};

interface UpdateMeRequest {
  username: string;
}

type CheckSessionRequest = {
  success: boolean;
};


export const fetchNotes = async (
  page: number,
  perPage: number,
  search?: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const res = await NextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search: search ?? "",
      tag: tag ?? "",
    },
  });
  return res.data;
};

export const getSingleNote = async (id: string): Promise<Note> => {
  const res = await NextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (requestBody: requestBodyData): Promise<Note> => {
  const res = await NextServer.post<Note>("/notes", requestBody);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await NextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};


export const register = async (data: registerRequest): Promise<User> => {
  const res = await NextServer.post("/auth/register", data);
  return res.data;
};

export const login = async (data: registerRequest): Promise<User> => {
  const res = await NextServer.post("/auth/login", data);
  return res.data;
};

export const checkSession = async (): Promise<boolean> => {
  const res = await NextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const logout = async (): Promise<void> => {
  await NextServer.post("/auth/logout");
};

export const getMe = async (): Promise<User> => {
  const res = await NextServer.get<User>("/users/me");
  return res.data;
};

export const updateMe = async (dataUser: UpdateMeRequest): Promise<User> => {
  const res = await NextServer.patch("/users/me", dataUser);
  return res.data;
};