import { useThemeStore } from "~/stores/useThemeStore";

export const ThemeToggle = () => {
  const toggleTheme = useThemeStore((state: any) => state.toggleTheme);
  const theme = useThemeStore((state: any) => state.theme);

  return (
    <button onClick={toggleTheme} className="px-3 py-1 text-sm rounded bg-gray-700 text-white">
      {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
};
