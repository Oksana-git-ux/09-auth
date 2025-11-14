// import { getSingleNote } from "@/lib/api/clientApi"
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query"
import NoteDetailsClient from "./NoteDetails.client"
import { fetchServerNoteById } from "@/lib/api/serverApi"
import { Metadata } from "next"

interface GenerateMetadataProps {
    params: { id: string }
}

export const generateMetadata = async ({ params }: GenerateMetadataProps): Promise<Metadata> => {
    const { id } = params
    const res = await fetchServerNoteById(id)
    return {
        title: res.title,
        description: res.content.slice(0, 30),
        openGraph: {
            title: res.title,
            description: res.content.slice(0, 30),
            url: `http://localhost:3000/notes/${id}`,
            images:
                [
                    {
                        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                        width: 1200,
                        height: 630,
                        alt: res.title,
                    }
                ]
        },
        twitter: {
            card: 'summary_large_image',
            title: res.title,
            description: res.content.slice(0, 30),
            images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
        },
    }
}


interface Props {

    params: Promise<{ id: string }>
}

const NoteDetails = async ({ params }: Props) => {
    const { id } = await params
    const queryClient = new QueryClient
    queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchServerNoteById(id)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>)


}
export default NoteDetails