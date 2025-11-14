import { fetchServerNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { Metadata } from "next";

interface GenerateMetaDataProps {
    params: Promise<{ slug: string[] }>;
}


export const generateMetadata = async ({ params }: GenerateMetaDataProps): Promise<Metadata> => {
    const { slug } = await params;
    const tag = slug?.[0] && slug[0] !== 'all' ? slug[0] : 'All notes';

    return {
        title: `Tag: ${tag}`,
        description: `Add new ${tag} note!`,
        openGraph: {
            title: `Tag: ${tag}`,
            description: `Add new ${tag} note!`,
            url: `https://09-auth-seven-flax.vercel.app/notes/filter/${tag}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: tag,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `Tag: ${tag}`,
            description: `Add new ${tag} note!`,
            images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
        },
    };
};


interface Props {
    params: Promise<{ slug: string[] }>;
}


const NotesByCategory = async ({ params }: Props) => {
    const { slug } = await params;
    const tag = slug?.[0] && slug[0] !== 'all' ? slug[0] : undefined;

    const queryClient = new QueryClient();

    try {
        await queryClient.prefetchQuery({
            queryKey: ['notes', 1, '', tag],
            queryFn: async () => {
                const res = await fetchServerNotes(1, 12, '', tag);
                return res || { notes: [], totalPages: 1 };
            },
        });
    } catch (error) {
        console.error('Error prefetching notes:', error);
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    );
};

export default NotesByCategory;