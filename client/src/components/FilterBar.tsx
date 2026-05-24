import React from 'react';
import type { FilterType, SortType } from '../types';

interface FilterBarProps {
  filter: FilterType;
  sort: SortType;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  sort,
  onFilterChange,
  onSortChange,
}) => {
  return (
    <div className="card-filter-bar flex flex-col sm:flex-row gap-3 justify-between items-center">
      <div className="flex gap-2 flex-wrap">
        {(['all', 'active', 'completed'] as FilterType[]).map((filterType) => (
          <button
            key={filterType}
            onClick={() => onFilterChange(filterType)}
            className={`px-4 py-2 rounded-pill transition-all duration-150 ${
              filter === filterType
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-soft text-muted hover:bg-hairline hover:text-ink'
            }`}
          >
            {filterType === 'all' && '全部'}
            {filterType === 'active' && '进行中'}
            {filterType === 'completed' && '已完成'}
          </button>
        ))}
      </div>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortType)}
        className="body-md px-4 py-2.5 bg-canvas border border-border-strong rounded-md focus:outline-none focus:border-primary focus:shadow-focus-ring transition-colors duration-150 cursor-pointer"
      >
        <option value="date-asc">创建时间 (旧→新)</option>
        <option value="date-desc">创建时间 (新→旧)</option>
      </select>
    </div>
  );
};