import { api } from "./api";
import { User } from "../../types/user";
import { Note } from "@/types/note";
import { logErrorResponse } from "../../app/api/_utils/utils";

export interface FetchNotesRes {
  notes: Note[];
  totalPages: number;
  totalNotes: number;
}

export async function registerUser(email: string, password: string): Promise<User> {
  try {
    const { data } = await api.post("/auth/register", { email, password });
    return data;
  } catch (error) {
    logErrorResponse(error);
    throw error;
  }
}

export async function loginUser(email: string, password: string): Promise<User> {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  } catch (error) {
    logErrorResponse(error);
    throw error;
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    logErrorResponse(error);
    throw error;
  }
}

// Для клієнтських компонентів Notes
export async function fetchNotes(page = 1, search = "", tag = ""): Promise<FetchNotesRes> {
  try {
    const perPage = 12;
    const params: Record<string, string | number> = { page, perPage };
    if (search) params.search = search;
    if (tag && tag.toLowerCase() !== "all") params.tag = tag;
    const { data } = await api.get("/notes", { params });
    return data;
  } catch (error) {
    logErrorResponse(error);
    throw error;
  }
}

export async function fetchNoteById(id: string): Promise<Note> {
  try {
    const { data } = await api.get(`/notes/${id}`);
    return data;
  } catch (error) {
    logErrorResponse(error);
    throw error;
  }
}

export async function getMe(): Promise<User> {
  try {
    const { data } = await api.get("/users/me");
    return data;
  } catch (error) {
    logErrorResponse(error);
    throw error;
  }
}

// обновляем сигнатуру функции
export async function updateMe(payload: { username: string }): Promise<User> {
  try {
    const { data } = await api.put("/users/me", payload);
    return data;
  } catch (error) {
    logErrorResponse(error);
    throw error;
  }
}

