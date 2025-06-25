import type { FilterState } from "../types";
import styles from "./search-and-filters.module.css";

interface SearchAndFiltersProps {
  filters: FilterState;
  categories: string[];
  types: string[];
  onFilterChange: (
    filters: FilterState | ((prev: FilterState) => FilterState),
  ) => void;
}

export const SearchAndFilters = ({
  filters,
  categories,
  types,
  onFilterChange,
}: SearchAndFiltersProps) => {
  return (
    <div className={styles.section}>
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <svg
            className={styles.searchIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search modules..."
            value={filters.search}
            onInput={(e) =>
              onFilterChange((prev) => ({
                ...prev,
                search: (e.target as HTMLInputElement).value,
              }))
            }
            className={styles.searchInput}
          />
          {filters.search && (
            <button
              type="button"
              onClick={() =>
                onFilterChange((prev) => ({ ...prev, search: "" }))
              }
              className={styles.clearSearch}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className={styles.filterTabs}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} htmlFor="category-select">
            Category
          </label>
          <div className={styles.customSelect}>
            <select
              id="category-select"
              value={filters.category}
              onChange={(e) =>
                onFilterChange((prev) => ({
                  ...prev,
                  category: (e.target as HTMLSelectElement).value,
                }))
              }
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <svg
              className={styles.selectArrow}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel} htmlFor="type-select">
            Type
          </label>
          <div className={styles.customSelect}>
            <select
              id="type-select"
              value={filters.type}
              onChange={(e) =>
                onFilterChange((prev) => ({
                  ...prev,
                  type: (e.target as HTMLSelectElement).value,
                }))
              }
            >
              <option value="all">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <svg
              className={styles.selectArrow}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
