'use client';

import css from './NotesPage.module.css';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import { fetchNotes } from '@/lib/api/clientApi';
import NoteList from '@/components/NoteList/NoteList';

import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { Toaster } from 'react-hot-toast';

import Link from 'next/link';

interface NotesClientProps {
  tag: string | undefined;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 300);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () => fetchNotes(page, debouncedSearch, tag ?? ''),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 0;
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const handlePageChange = (value: number) => {
    setPage(value);
  };

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
            page={page}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && data && <NoteList notes={data.notes} />}
    </div>
  );
}