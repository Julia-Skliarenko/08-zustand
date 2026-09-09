import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note in NoteHub",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Create a new note in NoteHub",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Open Graph Image",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main} style={{ margin: '0 auto' }}>
      <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
        <h1 className={css.title} style={{ textAlign: 'center' }}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}