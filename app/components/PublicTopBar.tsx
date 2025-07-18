import { Link } from "@remix-run/react";
import { ThemeToggle } from "./themeToggle";

export default function PublicTopBar() {
    return (
        <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow">
            <Link to='/' className="text-lg font-bold text-gray-800 dark:text-white">
                Remix Kanban
            </Link>

            <div className="flex items-center gap-4">
                <Link to='/login' className="text-sm text-gray-700 dark:text-gray-300 hover:underline">
                    Log In
                </Link>
                <Link to='/signup' className="text-sm text-gray-700  dark:text-gray-300 hover:underline">
                    Sign Up
                </Link>
                <ThemeToggle />
            </div>
        </header>
    )
}