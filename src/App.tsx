import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Sidebar } from "./components/Sidebar";
import { Editor } from "./components/Editor";
import { Note } from "./types";
import ConfirmModal from "./components/ConfirmModal";

export default function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      // Ensure all notes have a position
      if (!parsedNotes.some((note: Note) => "position" in note)) {
        return parsedNotes.map((note: Note, index: number) => ({ ...note, position: index }));
      }
      return parsedNotes;
    }
    return [];
  });
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const activeNote = notes.find((note) => note.id === activeNoteId) || null;

  const handleNewNote = () => {
    const maxPosition = Math.max(0, ...notes.map((note) => note.position));
    const newNote: Note = {
      id: uuidv4(),
      title: "Untitled",
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      position: maxPosition + 1,
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const handleDeleteNote = (id: string) => {
    setNoteToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (noteToDelete) {
      setNotes(notes.filter((note) => note.id !== noteToDelete));
      if (activeNoteId === noteToDelete) {
        setActiveNoteId(notes[0]?.id || null);
      }
      setShowDeleteConfirm(false);
      setNoteToDelete(null);
    }
  };

  const handleReorderNotes = (draggedId: string, targetId: string) => {
    if (draggedId === targetId) return;

    const orderedNotes = [...notes].sort((a, b) => a.position - b.position);
    const draggedNote = orderedNotes.find((note) => note.id === draggedId);
    const targetNote = orderedNotes.find((note) => note.id === targetId);

    if (!draggedNote || !targetNote) return;

    const draggedPosition = draggedNote.position;
    const targetPosition = targetNote.position;

    const updatedNotes = orderedNotes.map((note) => {
      if (note.id === draggedId) {
        return { ...note, position: targetPosition };
      }
      if (draggedPosition < targetPosition) {
        if (
          note.position <= targetPosition &&
          note.position > draggedPosition
        ) {
          return { ...note, position: note.position - 1 };
        }
      } else {
        if (
          note.position >= targetPosition &&
          note.position < draggedPosition
        ) {
          return { ...note, position: note.position + 1 };
        }
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  return (
    <div
      className={`flex h-screen bg-white dark:bg-background-dark transition-colors`}
    >
      <Sidebar
        notes={[...notes].sort((a, b) => a.position - b.position)}
        activeNoteId={activeNoteId}
        onNoteSelect={setActiveNoteId}
        onNewNote={handleNewNote}
        onDeleteNote={handleDeleteNote}
        onReorderNotes={handleReorderNotes}
      />
      <div className="flex-1 flex flex-col">
        <Editor note={activeNote} onUpdate={handleUpdateNote} />
      </div>

      {showDeleteConfirm && (
       <ConfirmModal setShowDeleteConfirm={setShowDeleteConfirm} confirmDelete={confirmDelete}></ConfirmModal>
      )}
    </div>
  );
}
