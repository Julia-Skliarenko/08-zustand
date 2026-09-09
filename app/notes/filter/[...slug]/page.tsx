import NotesClient from './Notes.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slugArray = resolvedParams?.slug || [];
  const tagFromUrl = slugArray[0] || 'all';

  // Форматируем название для заголовка (например, 'work' -> 'Work' или 'all' -> 'All Tags')
  const formattedTag = tagFromUrl.toLowerCase() === 'all' 
    ? 'All Tags' 
    : tagFromUrl.charAt(0).toUpperCase() + tagFromUrl.slice(1);

  const titleText = `Notes - ${formattedTag}`;

  return {
    title: {
      absolute: titleText,
    },
    description: `Filter notes by tag: ${tagFromUrl}`,
    openGraph: {
      title: titleText,
      description: `Filter notes by tag: ${tagFromUrl}`,
      url: `https://notehub.com/notes/filter/${slugArray.join('/')}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub Open Graph Image',
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams?.slug || [];

  const tagFromUrl = slugArray[0] || 'all';

  const apiTag = tagFromUrl.toLowerCase() === 'all' ? '' : tagFromUrl;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, 12, '', apiTag],
    queryFn: () => fetchNotes(1, 12, '', apiTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={apiTag} />
    </HydrationBoundary>
  );
}