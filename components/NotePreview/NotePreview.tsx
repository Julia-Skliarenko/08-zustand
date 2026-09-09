'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  note: Note;
  onClose?: () => void;
}

export default function NotePreview({ note, onClose }: NotePreviewProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <div className={css.container}>
      <div className={css.item}>
        <button className={css.backBtn} onClick={handleBack}>
          Back
        </button>

        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>

        <span className={css.tag}>{note.tag}</span>

        <p className={css.content}>{note.content}</p>

        <span className={css.date}>{note.createdAt}</span>
      </div>
    </div>
  );
}