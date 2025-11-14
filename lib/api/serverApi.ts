import { cookies } from "next/headers"
import { NextServer } from "./api"
import type { User } from "@/types/user"
import { Note } from "@/types/note"
// fetchNotes
export const fetchServerNotes = async (page: number, perPage: number, search?: string, tag?: string): Promise<Note[]> => {
    const cookieStore = await cookies()
    const res = await NextServer.get('/notes',
        {
            params: {
                page,
                perPage,
                search,
                tag
            },
            headers: {
                Cookie: cookieStore.toString()
            }
        })
    return res.data
}

// fetchNoteById
export const fetchServerNoteById = async (id: string): Promise<Note> => {
    const cookieStore = await cookies()
    const res = await NextServer.get(`/notes/${id}`, {
        headers: {
            Cookie: cookieStore.toString()
        }
    })
    return res.data
}


export const checkServerSession = async () => {

    const cookieStore = await cookies()
    const res = await NextServer.get('/auth/session', {
        headers: {
            Cookie: cookieStore.toString()
        }
    })
    return res
}


export const getServerMe = async (): Promise<User> => {

    const cookieStore = await cookies()
    const res = await NextServer.get('/users/me', {
        headers: {
            Cookie: cookieStore.toString()
        }
    })
    return res.data
}