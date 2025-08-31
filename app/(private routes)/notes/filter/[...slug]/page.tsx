import NotesClient from './Notes.client';
import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getNotesServer } from '@/lib/api/serverApi';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];

  return {
    title: `Notes: ${tag ? `${tag}` : 'all'}`,
    description: `Note: ${tag || 'all'} — created in Notehub.`,
    openGraph: {
      title: `Notes: ${tag ? `${tag}` : 'all'}`,
      description: `Note: ${tag || 'all'} — created in Notehub.`,
      url: `https://08-zustand-pied-one.vercel.app/notes/filter/${(slug ?? []).join('/')}`,
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
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;

  const initialPage = 1;
  const initialSearch = '';

  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', initialSearch, initialPage, tag],
    queryFn: () => getNotesServer(initialPage, initialSearch, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
