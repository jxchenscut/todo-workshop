import React, { useState } from 'react';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="glass-card glass-card-hover rounded-card-sm p-4 shadow-card hover:shadow-card-hover transition-all duration-200 animate-fade-in group">
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-0.5 w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-status-completed border-status-completed'
              : 'border-border-default hover:border-border-soft'
          }`}
        >
          {todo.completed && (
            <svg className="w-3 h-3 text-bg-dark" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0" onDoubleClick={() => setIsEditing(true)}>
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full body-lg px-3 py-2 bg-bg-dark border-2 border-primary rounded-card-sm focus:outline-none focus:shadow-glow text-white placeholder-text-soft transition-all duration-200"
            />
          ) : (
            <div>
              <p
                className={`title-md transition-all duration-200 ${
                  todo.completed ? 'line-through text-text-muted' : 'text-white'
                }`}
              >
                {todo.title}
              </p>
              <p className="caption text-text-soft mt-1">{formatDate(todo.createdAt)}</p>
            </div>
          )}
        </div>

        {showDeleteConfirm ? (
          <div className="flex gap-2">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-3 py-1.5 text-sm rounded-pill border border-border-default text-text-muted hover:border-border-soft hover:text-white transition-colors duration-200"
            >
              取消
            </button>
            <button
              onClick={() => {
                onDelete(todo.id);
                setShowDeleteConfirm(false);
              }}
              className="px-3 py-1.5 text-sm rounded-pill bg-danger hover:bg-danger-hover text-white transition-colors duration-200"
            >
              确认
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-md hover:bg-border-default text-text-muted hover:text-danger transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};