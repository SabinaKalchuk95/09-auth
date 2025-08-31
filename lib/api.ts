// lib/api.ts
import axios from 'axios';
import type { Note } from '@/types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api/';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
if (!token) console.warn('⚠️ NoteHub token is missing. Check .env.local');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// ----- Типы -----
export type NoteTag = Note['tag'];

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

// ----- API функции -----

// Получить список заметок
export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search.trim();
  if (tag) params.tag = tag;

  const res = await axios.get<FetchNotesResponse>('/notes', { params });
  return res.data;
};

// Получить одну заметку по ID
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};

// Создать новую заметку
export const createNote = async (newNote: NewNote): Promise<Note> => {
  const res = await axios.post<Note>('/notes', newNote);
  return res.data;
};

// Удалить заметку по ID
export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${id}`);
  return res.data;
};
