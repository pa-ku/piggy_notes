import { Plus, Trash2,Search } from "lucide-react";
import { Note } from "../types";
import Button from "./ui/Button";


interface SidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  onNoteSelect: (id: string) => void;
  onNewNote: () => void;
  onDeleteNote: (id: string) => void;
  onReorderNotes: (draggedId: string, targetId: string) => void;
}

export function Sidebar({
  notes,
  activeNoteId,
  onNoteSelect,
  onNewNote,
  onDeleteNote,
  onReorderNotes,
}: SidebarProps) {
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    noteId: string
  ) => {
    e.dataTransfer.setData("text/plain", noteId);
    e.currentTarget.classList.add("opacity-50");
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("opacity-50");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("bg-gray-100", "dark:bg-gray-700");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("bg-gray-100", "dark:bg-gray-700");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-gray-100", "dark:bg-gray-700");
    const draggedId = e.dataTransfer.getData("text/plain");
    onReorderNotes(draggedId, targetId);
  };



  return (
    <div className="w-64 rounded-3xl m-3 bg-gray-50  dark:bg-background-light p-4 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-primary">
          PiggyNote
        </h1>
        <div className="flex gap-2">
        <Button >
            <Search className="w-5 h-5 text-gray-600 dark:text-primary"></Search>
          </Button>
        
          <Button onClick={onNewNote}>
            <Plus className="w-5 h-5 text-primary-600 dark:text-primary" />
          </Button>
        </div>
      </div>
      <div className="flex-1  overflow-y-auto">
        {notes.map((note) => (
          <div
            key={note.id}
            draggable
            onDragStart={(e) => handleDragStart(e, note.id)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, note.id)}
            onClick={() => onNoteSelect(note.id)}
            className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer group transition-colors ${
              activeNoteId === note.id
                ? "bg-blue-100 dark:bg-background-dark dark:text-primary"
                : "hover:bg-gray-100 dark:hover:bg-background-light "
            }`}
          >
            <div className="flex-1" >
              <div className="flex items-center">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                  {note.title || "Untitled"}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNote(note.id);
              }}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
