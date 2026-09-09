'use client';

import { use } from 'react';
import NotePreviewClient from './NotePreview.client';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { id } = use(params);

  return <NotePreviewClient id={id} />;
}