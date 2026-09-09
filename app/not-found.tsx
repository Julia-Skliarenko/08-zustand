import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "The requested page does not exist",
};

export default function NotFound() {
  return (
    <main style={{ padding: "4rem", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>Could not find requested resource</p>
    </main>
  );
}