import type { Note } from "@/types/note"
import { NextServer } from "./api"
import { User } from "@/types/user"
// const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN



export interface FetchNotesResponse {
    notes: Note[],
    totalPages: number
}

export const fetchNotes = async (page: number, perPage: number, search?: string, tag?: string): Promise<FetchNotesResponse> => {
    const res = await NextServer.get<FetchNotesResponse>('/notes', {
        params: {
            page,
            perPage,
            search,
            tag
        },

    })
    return (
        res.data
    )
}

export const getSingleNote = async (id: string): Promise<Note> => {
    const res = await NextServer.get<Note>(`/notes/${id}`, {

    })
    return res.data
}

export interface requestBodyData {
    "title": string,
    "content": string,
    "tag": string
}

export const createNote = async (requestBody: requestBodyData): Promise<Note> => {
    const res = await NextServer.post<Note>('/notes',
        requestBody,

    )
    return res.data
}

export const deleteNote = async (id: string): Promise<Note> => {
    const res = await NextServer.delete<Note>(`/notes/${id}`, {

    })
    return res.data
}

export type registerRequest = {
    email: string,
    password: string
}

export const register = async (data: registerRequest): Promise<User> => {
    const res = await NextServer.post('/auth/register', data)
    return res.data
}


export const login = async (data: registerRequest): Promise<User> => {
    const res = await NextServer.post('/auth/login', data)
    return res.data

}

// checkSession

type CheckSessionRequest = {
    success: boolean;
};

export const checkSession = async () => {
    const res = await NextServer.get<CheckSessionRequest>('/api/auth/session');
    return res.data.success;
};

// logout

export const logout = async (): Promise<void> => {
    await NextServer.post('/auth/logout')

}

// getMe

export const getMe = async (): Promise<User> => {
    const { data } = await NextServer.get<User>('/users/me');
    return data;
};
// updateMe

interface UpdateMeRequest {
    username: string
}
export const updateMe = async (dataUser: UpdateMeRequest): Promise<User> => {
    const res = await NextServer.patch('/users/me', dataUser)
    return res.data
}