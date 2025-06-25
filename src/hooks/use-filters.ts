import { useState } from "preact/hooks";
import type { FilterState, ModuleReplacement } from "../types";

export const useFilters = (replacements: ModuleReplacement[]) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    type: "all",
  });

  const categories = [...new Set(replacements.map((r) => r.category))].sort();
  const types = [...new Set(replacements.map((r) => r.type))].sort();

  const filteredReplacements = replacements.filter((r) => {
    const search = filters.search.toLowerCase();
    return (
      (r.moduleName.toLowerCase().includes(search) ||
        r.replacement?.toLowerCase().includes(search)) &&
      (filters.category === "all" || r.category === filters.category) &&
      (filters.type === "all" || r.type === filters.type)
    );
  });

  return {
    filters,
    categories,
    types,
    filteredReplacements,
    setFilters,
  };
};
