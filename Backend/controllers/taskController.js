import prisma from '../config/db.js';

export const createTask = async (req, res) => {
    const { projectId } = req.params;
    const { title, description, status, assignedUserId } = req.body;
  
    try {
      const task = await prisma.task.create({
        data: { title, description, status, projectId, assignedUserId },
      });
  
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Error creating task', error: error.message });
    }
};

export const getTasks = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await prisma.task.findMany({
      where: { projectId },
      include: { assignedUser: true },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, assignedUserId } = req.body;

  try {
    const task = await prisma.task.update({
      where: { id },
      data: { title, description, status, assignedUserId },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({ where: { id } });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};

export const filterTasks = async (req, res) => {
  const { status, assignedUserId } = req.query;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        status: status ? status : undefined,
        assignedUserId: assignedUserId ? assignedUserId : undefined,
      },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering tasks' });
  }
};
