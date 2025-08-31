'use server';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { FetchNotesRes } from './clientApi';
import { cookies } from 'next/headers';

export const serverSession = async () => {
  const cookieStore = cookies();
  const response = await nextServer.get('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });
  return response;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = cookies();
  const response = await nextServer.get<User>('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

export const getNotesServer = async (
  page = 1,
  search = '',
  tag = ''
): Promise<FetchNotesRes> => {
  const cookieStore = cookies();
  const perPage = 12;
  const params: Record<string, string | number> = { page, perPage };
  const headers = { Cookie: cookieStore.toString() };

  if (search.trim()) params.search = search.trim();
  if (tag.trim().toLowerCase() !== 'all' && tag.trim() !== '') params.tag = tag.trim();

  const response = await nextServer.get<FetchNotesRes>('/notes', { params, headers });
  return response.data;
};
