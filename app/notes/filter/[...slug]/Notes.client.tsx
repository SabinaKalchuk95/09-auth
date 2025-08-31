'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import css from './Notes.module.css';
import { useState, useEffect } from 'react';
import NotesList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import { Toaster } from 'react-hot-toast';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const itemsPerPage = 12;
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [currentPage, setCurrentPage] = useState(1);

  // Додаємо useEffect, щоб скинути сторінку при зміні тега
  useEffect(() => {
    setCurrentPage(1);
  }, [tag]);

  const { data: notes, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', { search: debouncedSearch, page: currentPage, perPage: itemsPerPage, tag }],
    queryFn: () =>
      fetchNotes({
        search: debouncedSearch,
        page: currentPage,
        perPage: itemsPerPage,
        tag: tag === 'All' ? undefined : tag,
      }),
  });

  const handleInputChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const notesToDisplay = notes?.notes || [];
  const totalPages = notes?.totalPages || 0;

  return (
    <>
      <Toaster />
      <header className={css.toolbar}>
        <div className={css.search}>
          <SearchBox value={search} onSearch={handleInputChange} />
        </div>
        <Link href="/notes/action/create" className={css.createButton}>
          Create note +
        </Link>
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes.</p>}
      {isSuccess &&
        (notesToDisplay.length > 0 ? (
          <NotesList notes={notesToDisplay} />
        ) : (
          <p>No notes found.</p>
        ))}
      {totalPages > 1 && (
        <Pagination
          totalNumberOfPages={totalPages}
          currentActivePage={currentPage}
          setPage={setCurrentPage}
        />
      )}
    </>
  );
}