"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { getSingleNote } from "@/lib/api/clientApi"
import { Note } from "@/types/note"
import css from './NoteDetails.module.css'

const NoteDetailsClient = () => {

    const { id } = useParams<{ id: string }>()
    const { data: note, isLoading, error } = useQuery<Note>({
        queryKey: ['note', id],
        queryFn: () => getSingleNote(id),
        refetchOnMount: false
    })
    return (
        <><div>
            {isLoading && <p>Loading, please wait...</p>}
            {error && <p>Something went wrong</p>}
        </div>

            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note && note.title}</h2>
                    </div>
                    {note && <p className={css.content}>{note.content}</p>}
                    {note && <p className={css.date}>{(note.updatedAt ? note.updatedAt : note.createdAt)}</p>}
                </div>
            </div></>


    )
}
export default NoteDetailsClient