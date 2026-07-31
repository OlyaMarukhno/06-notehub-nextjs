'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose?: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<NoteTag>('Personal');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      if (onClose) onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content, tag: tag as NoteTag });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.title}>Create Note</h2>

      <div className={css.field}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={css.input}
        />
      </div>

      <div className={css.field}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value as NoteTag)}
          className={css.select}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Todo">Todo</option>
          <option value="Meeting">Meeting</option>
          <option value="Idea">Idea</option>
        </select>
      </div>

      <div className={css.field}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className={css.textarea}
        />
      </div>

      <div className={css.actions}>
        <button type="submit" disabled={mutation.isPending} className={css.submitButton}>
          {mutation.isPending ? 'Saving...' : 'Save Note'}
        </button>
      </div>
    </form>
  );
}