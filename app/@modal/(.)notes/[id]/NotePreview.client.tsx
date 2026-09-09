'use client';


import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !note) return <div>Failed to load note.</div>;

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
  <div>
    <h2>{note.title}</h2>
    <span>{note.tag}</span>
    <p>{note.content}</p>
  </div>
</Modal>
  );
}