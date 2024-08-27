import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="p-2 rounded-full bg-gray-200/30 hover:bg-gray-300 transition-colors duration-200"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <FaSun size={24} color="yellow" />
      ) : (
        <FaMoon size={24} color="black" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
