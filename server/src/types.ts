export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type FilterType = 'all' | 'active' | 'completed';

export type SortType = 'date-asc' | 'date-desc';