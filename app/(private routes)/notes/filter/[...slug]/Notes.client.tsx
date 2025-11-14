"use client";


import css from "./NotesPage.module.css";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import Loader from "@/components/Loader/Loader";
import { keepPreviousData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


interface Props {
tag?: string;
}


export default function NotesClient({ tag }: Props) {
const safeTag = tag ?? undefined;


const [page, setPage] = useState(1);
const [searchValue, setSearchValue] = useState("");
const [inputValue, setInputValue] = useState("");


const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
const value = e.target.value;
setInputValue(value);
handleSearch(value);
};


const handleSearch = useDebouncedCallback((value) => {
setSearchValue(value);
setPage(1);
}, 700);


const { data, isFetching } = useQuery({
queryKey: ["notes", page, searchValue, safeTag],
queryFn: () => fetchNotes(page, 12, searchValue, safeTag),
refetchOnMount: false,
placeholderData: keepPreviousData,
});


const router = useRouter();


const notes = data?.notes ?? [];
const totalPages = data?.totalPages ?? 1;


return (
<div className={css.app}>
<header className={css.toolbar}>
<SearchBox value={inputValue} onChange={handleInputValue} />


{totalPages > 1 && <Pagination totalPages={totalPages} page={page} setPage={setPage} />}


<button className={css.button} onClick={() => router.push("/notes/action/create")}>
Create note +
</button>
</header>


{isFetching && <Loader />}


{notes.length > 0 ? <NoteList notes={notes} /> : <p>Empty...</p>}
</div>
);
}