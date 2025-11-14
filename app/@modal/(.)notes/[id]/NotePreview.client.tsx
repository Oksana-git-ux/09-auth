'use client'

import NewModal from '@/components/Modal/NewModal'
import { useQuery } from '@tanstack/react-query'
import { getSingleNote } from '@/lib/api/clientApi'
import { useRouter } from 'next/navigation'
import { keepPreviousData } from '@tanstack/react-query'



interface Props {
    noteId: string
}

export default function NotePreview({ noteId }: Props) {
    const router = useRouter();
    const close = () => router.back();


    const { data, isError, isFetching } = useQuery({
        queryKey: ['note', noteId],
        queryFn: () => getSingleNote(noteId),
        refetchOnMount: false,
        placeholderData: keepPreviousData
    })
    return (
        <NewModal onClose={close}>
            {isFetching && <p>Loading...</p>}
            {isError && <p>Something went wrong...</p>}
            <h2>{data?.title}</h2>
            <p>{data?.content}</p>
            <p>Tag: {data?.tag}</p>
            {data?.updatedAt ? <p>Updated at: {data?.updatedAt}</p> : <p>Created at: {data?.createdAt}</p>}

        </NewModal>
    )
}