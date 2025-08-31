import { fetchNoteByIdServer as fetchNoteById } from '@/lib/api/serverApi';

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import NotesDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const res = await fetchNoteById(id);
  return {
    title: `Note Details: ${res?.title}`,
    description: res?.content.slice(0, 30),
    openGraph: {
      title: `Note Details: ${res?.title}`,
      description: res?.content.slice(0, 30),
      url: `https://09-auth-pied-pi.vercel.app/notes/${res?.id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'notehub image',
        },
      ],
    },
  };
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesDetailsClient />
    </HydrationBoundary>
  );
}
