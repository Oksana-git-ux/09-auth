"use client";

import css from './NotesPage.module.css';
import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import { useDebouncedCallback } from 'use-debounce';
import Loader from '@/components/Loader/Loader';
import { useRouter } from 'next/navigation';

interface Props {
    tag?: string;
}

export default function NotesClient({ tag }: Props) {
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const router = useRouter();

    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        handleSearch(value);
    };

    const handleSearch = useDebouncedCallback((value: string) => {
        setSearchValue(value);
        setPage(1);
    }, 700);

    const { data, isFetching, error } = useQuery({
        queryKey: ['notes', page, searchValue, tag],
        queryFn: async () => {
            // ✅ Логи для дебагу
            console.log('Fetching notes with:', { page, searchValue, tag });
            const res = await fetchNotes(page, 12, searchValue, tag);
            console.log('Notes fetched:', res);
            return res;
        },
        refetchOnMount: false,
    });

    // Безпечна перевірка
    const notes = data?.notes ?? [];
    const totalPages = data?.totalPages ?? 1;

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={inputValue} onChange={handleInputValue} />

                {totalPages > 1 && (
                    <Pagination totalPages={totalPages} page={page} setPage={setPage} />
                )}

                <button
                    className={css.button}
                    onClick={() => router.push('/notes/action/create')}
                >
                    Create note +
                </button>
            </header>

            {isFetching && <Loader />}

            {error && (
                <p>
                    Could not fetch the list of notes.{' '}
                    {error instanceof Error ? error.message : ''}
                </p>
            )}

            {!error && notes.length > 0 ? (
                <NoteList notes={notes} />
            ) : (
                !isFetching && <p>No notes found.</p>
            )}
        </div>
    );
}