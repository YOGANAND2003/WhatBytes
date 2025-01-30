import prisma from '../config/db.js';

export const createProject = async (req, res) => {
  const { name, description, status } = req.body;
  const userId = req.user.id;

  try {
    const project = await prisma.project.create({
      data: { name, description, status, userId },
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project' });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user.id },
      include: { tasks: true },
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;

  try {
    const project = await prisma.project.update({
      where: { id },
      data: { name, description, status },
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project' });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.project.delete({ where: { id } });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
};
