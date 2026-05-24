import { Todo } from './types.js';

class Database {
  private todos: Todo[] = [];

  async getAll(): Promise<Todo[]> {
    return [...this.todos];
  }

  async getById(id: string): Promise<Todo | undefined> {
    return this.todos.find(todo => todo.id === id);
  }

  async create(todo: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo> {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  async update(id: string, updates: Partial<Todo>): Promise<Todo | undefined> {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return undefined;

    this.todos[index] = {
      ...this.todos[index],
      ...updates,
    };
    return this.todos[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return false;

    this.todos.splice(index, 1);
    return true;
  }
}

export const db = new Database();