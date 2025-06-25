import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useState } from "preact/hooks";
import { ModuleCard } from "./components/module-card";
import { SearchAndFilters } from "./components/search-and-filters";
import { useFilters } from "./hooks/use-filters";
import { useModuleData } from "./hooks/use-module-data";
import "./app.css";

export const App = () => {
  const { replacements, refetch } = useModuleData();
  const { filters, categories, types, filteredReplacements, setFilters } =
    useFilters(replacements);

  const getColumnsCount = () => {
    if (typeof window === "undefined") return 3;
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1200) return 2;
    return 3;
  };

  const [columnsCount, setColumnsCount] = useState(getColumnsCount());

  useEffect(() => {
    const handleResize = () => {
      setColumnsCount(getColumnsCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rowsCount = Math.ceil(filteredReplacements.length / columnsCount);

  const virtualizer = useWindowVirtualizer({
    count: rowsCount,
    estimateSize: () => 500,
    overscan: 2,
    measureElement: (element) => {
      if (!element) return 500;
      return element.getBoundingClientRect().height;
    },
  });

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-main">
            <div className="header-left">
              <h1 className="header-title">Module Replacements</h1>
              <p className="header-subtitle">
                Find native alternatives and better replacements for npm
                packages
              </p>
              <div className="header-stats">
                <div className="stat">
                  <svg
                    className="stat-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <strong>{replacements.length}</strong> modules
                </div>
                <div className="stat">
                  <svg
                    className="stat-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <strong>{categories.length}</strong> categories
                </div>
              </div>
            </div>
            <div className="header-right">
              <SearchAndFilters
                filters={filters}
                categories={categories}
                types={types}
                onFilterChange={setFilters}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="results-info">
          <span className="results-count">
            <strong>{filteredReplacements.length}</strong> modules found
          </span>
          <button type="button" onClick={refetch} className="refresh-button">
            <svg
              className="icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        {filteredReplacements.length === 0 ? (
          <div className="no-results">
            <h3>No modules found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div
            className="modules-grid-virtualized"
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const startIndex = virtualRow.index * columnsCount;
              const endIndex = Math.min(
                startIndex + columnsCount,
                filteredReplacements.length,
              );
              const rowItems = filteredReplacements.slice(startIndex, endIndex);

              return (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                  className="modules-grid-row"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {rowItems.map((replacement, index) => (
                    <ModuleCard
                      key={`${replacement.moduleName}-${startIndex + index}`}
                      replacement={replacement}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
