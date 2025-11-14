import NotFoundClient from '@/components/NotFoundClient/NotFoundClient';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Not found page',
    description: 'Page does not exist',
    openGraph: {
        title: 'Not found page',
        description: 'Page does not exist',
        url: 'https://08-zustand-one-murex.vercel.app/',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: "NoteHub"
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: "NoteHub",
        description: "Create your note",
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
}

const NotFound = () => {


    return (
        <NotFoundClient />
    );
};

export default NotFound