import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import Button from "./ui/Button";
import useLocalStorage from "use-local-storage";

export default function ThemeButton() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

 useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  function handleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }


  return (
    <Button onClick={handleTheme}>
      {theme !== "dark" ? (
        <Sun className="w-5 h-5 text-gray-600 dark:text-primary" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-primary" />
      )}
    </Button>
  );
}
