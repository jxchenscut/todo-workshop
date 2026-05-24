import React, { useState, useEffect } from 'react';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import type { Todo } from './types';

const API_URL = '/api/todos';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  const fetchTodos = async () => {
    if (useLocalStorage) {
      const stored = localStorage.getItem('todos');
      setTodos(stored ? JSON.parse(stored) : []);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('获取任务列表失败');
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error('获取任务失败，切换到本地存储:', err);
      setError('连接服务器失败，已切换到本地存储模式');
      setUseLocalStorage(true);
      const stored = localStorage.getItem('todos');
      setTodos(stored ? JSON.parse(stored) : []);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title: string) => {
    const newTodo: Omit<Todo, 'id' | 'createdAt'> = {
      title,
      completed: false,
    };

    if (useLocalStorage) {
      const todo: Todo = {
        ...newTodo,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      const updatedTodos = [...todos, todo];
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('添加任务失败');
      }

      const todo = await response.json();
      setTodos([...todos, todo]);
    } catch (err) {
      console.error('添加任务失败，切换到本地存储:', err);
      setUseLocalStorage(true);
      const todo: Todo = {
        ...newTodo,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      const updatedTodos = [...todos, todo];
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updatedTodo = { ...todo, completed: !todo.completed };

    if (useLocalStorage) {
      const updatedTodos = todos.map((t) => (t.id === id ? updatedTodo : t));
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: updatedTodo.completed }),
      });

      if (!response.ok) {
        throw new Error('更新任务失败');
      }

      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (err) {
      console.error('更新任务失败，切换到本地存储:', err);
      setUseLocalStorage(true);
      const updatedTodos = todos.map((t) => (t.id === id ? updatedTodo : t));
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };

  const updateTodo = async (id: string, title: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo || todo.title === title) return;

    const updatedTodo = { ...todo, title };

    if (useLocalStorage) {
      const updatedTodos = todos.map((t) => (t.id === id ? updatedTodo : t));
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('更新任务失败');
      }

      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (err) {
      console.error('更新任务失败，切换到本地存储:', err);
      setUseLocalStorage(true);
      const updatedTodos = todos.map((t) => (t.id === id ? updatedTodo : t));
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };

  const deleteTodo = async (id: string) => {
    if (useLocalStorage) {
      const updatedTodos = todos.filter((t) => t.id !== id);
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('删除任务失败');
      }

      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      console.error('删除任务失败，切换到本地存储:', err);
      setUseLocalStorage(true);
      const updatedTodos = todos.filter((t) => t.id !== id);
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const pendingTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div className="min-h-screen bg-bg-dark p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center animate-fade-in">
          <h1 className="display-xl text-white mb-2">任务看板</h1>
          <p className="body-md text-text-muted">
            待办: {pendingTodos.length} | 已完成: {completedTodos.length} | 总计: {todos.length}
          </p>
        </header>

        {error && (
          <div className="mb-4 p-3 bg-status-pending/20 border border-status-pending/30 text-status-pending rounded-card-sm animate-fade-in">
            {error}
          </div>
        )}

        {useLocalStorage && (
          <div className="mb-4 p-3 bg-status-warning/20 border border-status-warning/30 text-status-warning rounded-card-sm animate-fade-in">
            当前使用本地存储模式
          </div>
        )}

        <div className="glass-card rounded-card p-6 mb-8 animate-slide-up">
          <AddTodo onAdd={addTodo} />
        </div>

        {loading ? (
          <div className="text-center py-12 text-text-soft">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 body-md text-text-soft">加载中...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-status-pending shadow-glow"></div>
                <h2 className="title-lg text-white">待办</h2>
                <span className="status-badge status-badge-pending">{pendingTodos.length}</span>
              </div>
              <TodoList
                todos={pendingTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
                emptyMessage="暂无待办任务"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-status-in-progress shadow-glow-amber"></div>
                <h2 className="title-lg text-white">进行中</h2>
                <span className="status-badge status-badge-in-progress">0</span>
              </div>
              <TodoList
                todos={[]}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
                emptyMessage="暂无进行中任务"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-status-completed shadow-glow-teal"></div>
                <h2 className="title-lg text-white">已完成</h2>
                <span className="status-badge status-badge-completed">{completedTodos.length}</span>
              </div>
              <TodoList
                todos={completedTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
                emptyMessage="暂无已完成任务"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;