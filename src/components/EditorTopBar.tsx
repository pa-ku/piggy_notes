import { Lock, User } from "lucide-react";
import Button from "./ui/Button";
import ThemeButton from "./ThemeButton";

export default function EditorTopBar({
  isPreview,
  setIsPreview,
  localTitle,
  handleTitleChange,
}: {
  isPreview: boolean;
  setIsPreview: (isPreview: boolean) => void;
  localTitle: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <div className=" flex border-gray-200 pt-5 justify-between dark:border-background-dark p-4">
        <div className="flex items-center gap-2 justify-center">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className={`p-2 rounded-md text-sm ${
              isPreview
                ? "bg-gray-200 dark:bg-background-light text-gray-800 dark:text-primary"
                : " text-gray-600 dark:text-gray-300  dark:hover:bg-background-light"
            }`}
          >
            {isPreview ? <Lock size={15} /> : <Lock size={15} />}
          </button>
          <input
            type="text"
            value={localTitle}
            onChange={handleTitleChange}
            placeholder="Untitled"
            className="w-full text-xl font-bold focus:outline-none bg-transparent dark:text-white"
          />
        </div>
        <nav className="space-x-2">
          <ThemeButton></ThemeButton>
        
          <Button >
            <User className="w-5 h-5 text-gray-600 dark:text-primary"></User>
        </Button>
        </nav>

      </div>
    </>
  );
}
