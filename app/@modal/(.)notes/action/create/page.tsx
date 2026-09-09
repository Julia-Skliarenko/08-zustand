'use client';

import { useRouter } from 'next/navigation';
import { NoteForm } from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';

export default function CreateNoteModalPage() {
  const router = useRouter();

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <NoteForm />
    </Modal>
  );
}