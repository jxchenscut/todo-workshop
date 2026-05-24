import express from 'express';
import cors from 'cors';
import { db } from './db.js';
import type { Todo } from './types.js';

const router = express.Router();

// 获取所有任务
router.get('/todos', async (_req, res) => {
  try {
    const todos = await db.getAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: '获取任务列表失败' });
  }
});

// 添加任务
router.post('/todos', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: '任务标题不能为空' });
    }

    const todo = await db.create({
      title: title.trim(),
      completed: false,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: '添加任务失败' });
  }
});

// 更新任务
router.patch('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates: Partial<Todo> = {};

    if (req.body.title !== undefined) {
      updates.title = req.body.title;
    }
    if (req.body.completed !== undefined) {
      updates.completed = req.body.completed;
    }

    const todo = await db.update(id, updates);
    if (!todo) {
      return res.status(404).json({ error: '任务不存在' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: '更新任务失败' });
  }
});

// 删除任务
router.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: '任务不存在' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: '删除任务失败' });
  }
});

export default router;