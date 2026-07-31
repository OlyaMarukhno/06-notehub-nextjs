'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useParams } from 'next/navigation';
import css from './NoteDetailsPage.module.css';

export default function NoteDetailsClient() {
  const params = useParams();
  const noteId = params.id as string;

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p className={css.loading}>Loading, please wait...</p>;
  if (isError || !note) return <p className={css.error}>Something went wrong.</p>;

  return (
    <main className={css.container}>
      <div className={css.card}>
        <h1 className={css.title}>{note.title}</h1>
        <span className={css.tag}>{note.tag}</span>
        <p className={css.content}>{note.content}</p>
        <div className={css.footer}>
          <span className={css.date}>{note.createdAt}</span>
        </div>
      </div>
    </main>
  );
}