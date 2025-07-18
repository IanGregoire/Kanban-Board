import { useThemeStore } from "~/stores/useThemeStore";

export const ThemeToggle = () => {
  const toggleTheme = useThemeStore((state: any) => state.toggleTheme);
  const theme = useThemeStore((state: any) => state.theme);

  return (
    <button onClick={toggleTheme} className="px-3 py-2 text-sm font-medium rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:br-gray-600 rounded">
      {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
};
