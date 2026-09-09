'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { Pagination } from '@/components/Pagination/Pagination';
import { SearchBox } from '@/components/SearchBox/SearchBox';
import { NoteList } from '@/components/NoteList/NoteList';
import css from './NotesPage.module.css';

interface NotesClientProps {
  initialTag: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const activeTag = initialTag.toLowerCase() === 'all' ? '' : initialTag;

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, perPage, debouncedSearch, activeTag],
    queryFn: () => fetchNotes(page, perPage, debouncedSearch, activeTag),
    placeholderData: (previousData) => previousData,
  });

  const notes = data?.notes || [];

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        
        <Pagination 
          currentPage={page} 
          totalPages={data?.totalPages || 1} 
          onPageChange={setPage} 
        />

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading notes.</p>}

      {(notes.length > 0 || isLoading) && <NoteList notes={notes} />}
      {notes.length === 0 && !isLoading && <p>No notes found.</p>}
    </div>
  );
}