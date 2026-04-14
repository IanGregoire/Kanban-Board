import { s } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { useState } from "react";

type Label = {
    id: number,
    name: string,
    color: string,
    category?: string;
};

type Column = {
    id: number;
    title: string;
};

type Props = {
    searchQuery: string;
    setSearchQuery: (value: string) => void;

    selectedLabels: number[];
    setSelectedLabels: (labels: number[])  => void;

    selectedColumn: number | null;
    setSelectedColumn: (id: number | null) => void;

    labels: Label[];
    columns: Column[];
};

export function FilterBar({
    searchQuery,
    setSearchQuery,
    selectedLabels = [],
    setSelectedLabels,
    selectedColumn,
    setSelectedColumn,
    labels = [],
    columns = [],
}: Props) {
    const [showLabels, setShowLabels] = useState(false);

    const toggleLabel = (id: number) => {
        if(selectedLabels.includes(id)) {
            setSelectedLabels(selectedLabels.filter(l => l !== id));
        } else {
            setSelectedLabels([...selectedLabels, id]);
        }
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedLabels([]);
        setSelectedColumn(null);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-3 items-center">
                    {/*Search*/}
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-3 py-2 border rounded w-64 bg-white dark:bg-gray-800 dark:border-gray-600"
                    />
                    {/*Column Filter*/}
                    <select
                        value={selectedColumn ?? ""}
                        onChange={(e) => 
                            setSelectedColumn(e.target.value ? Number(e.target.value) : null)
                        }
                        className="px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600"
                    >
                        <option value="">All Columns</option>
                        {columns.map((col) => (
                            <option key={col.id} value={col.id}>
                                {col.title}
                            </option>
                        ))}
                    </select>
                    {/*Label Filtering Toggle*/}
                    <button
                        onClick={() => setShowLabels(!showLabels)}
                        className="px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700"
                    >
                        Labels
                    </button>
                    {/*Clear*/}
                    <button
                        onClick={clearFilters}
                        className="px-3 py-2 text-sm text-red-600 hover:underline"
                    >
                        Clear
                    </button>
                </div>

                {/*Active Filters*/}
                <div className="flex flex-wrap gap-2">
                    {selectedLabels.map((id) => {
                        const label = labels.find(l => l.id ===id);
                        if(!label) return null;

                        return (
                            <span
                                key={id}
                                className="text-xs px-2 py-1 rounded text-white"
                                style={{ backgroundColor: label.color }}
                            >
                                {label.name}
                            </span>
                        );
                    })}
                </div>
            </div>
                {/*Label Dropdwon*/}
                {showLabels && (
                    <div className="w-full mt-2 p-4 border rounded bg-white dark:bg-gray-800 dark:border-gray-600">
                        <div className="flex flex-wrap gap-3">
                            {labels.map((label) => (
                                <label
                                    key={label.id}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedLabels.includes(label.id)}
                                        onChange={() => toggleLabel(label.id)}
                                    />
                                    <span
                                        className="text-xs px-2 py-1 rounded text-white"
                                        style={{ backgroundColor: label.color }}
                                    >
                                        {label.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
        </div>
    )
}