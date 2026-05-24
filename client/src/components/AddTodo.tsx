import React, { useState } from 'react';

interface AddTodoProps {
  onAdd: (title: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="添加新任务..."
        className="flex-1 body-lg px-4 py-3 bg-bg-dark border-2 border-border-default rounded-card-sm focus:outline-none focus:border-primary focus:shadow-glow text-white placeholder-text-soft transition-all duration-200"
      />
      <button
        type="submit"
        className="px-6 py-3 button bg-primary hover:bg-primary-hover text-white rounded-card-sm hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!title.trim()}
      >
        添加
      </button>
    </form>
  );
};