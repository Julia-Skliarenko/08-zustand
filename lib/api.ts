import axios from 'axios';
import type { Note } from '@/types/note';

const apiClient = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(
  page: number = 1,
  perPage: number = 12,
  search?: string,
  tag?: string
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage };
  
  if (search && search.trim() !== '') {
    params.search = search.trim();
  }

  if (tag && tag.trim() !== '') {
    params.tag = tag.trim();
  }

  const response = await apiClient.get<FetchNotesResponse>('/notes', { params });
  return response.data;
}

export async function createNote(newNote: CreateNotePayload): Promise<Note> {
  const response = await apiClient.post<Note>('/notes', newNote);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await apiClient.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await apiClient.get<Note>(`/notes/${id}`);
  return response.data;
}