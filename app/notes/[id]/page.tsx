import type { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    const titleText = `${note.title}`;
    const descriptionText = note.content.slice(0, 100);
    
    return {
      title: {
        absolute: titleText,
      },
      description: descriptionText,
      openGraph: {
        title: titleText,
        description: descriptionText,
        url: `https://notehub-public.goit.study/notes/${id}`, // или ваш актуальный URL
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: titleText,
          },
        ],
      },
    };
  } catch {
    return {
      title: {
        absolute: "Note Details",
      },
      description: "View note details",
      openGraph: {
        title: "Note Details",
        description: "View note details",
        url: `https://notehub-public.goit.study/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "Note Details",
          },
        ],
      },
    };
  }
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

 return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}