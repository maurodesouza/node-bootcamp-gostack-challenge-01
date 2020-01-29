const router = require('express').Router();

const Project = require('../model/project');
const Task = require('../model/task');

const checkExistId = require('../middleware/checkExistId');

router.post('/project', async (req, res) => {
  const { title, task } = req.body;

  try {
    const project = await Project.create({ title });

    await Promise.all(task.map(async task => {
      const newTask = await Task.create({ title: task, project: project._id });
      newTask.save();
      project.task.push(newTask);
    }))

    project.save();

    return res.send({ project });
  } catch (err) {
    return res.status(400).send({ error: 'Fail on created new project' });
  }
})

router.get('/project', async (req, res) => {
  try {
    const projects = await Project.find();

    return res.send({ projects });
  } catch (err) {
    return res.status(400).send({ error: 'Fail on get all project' });
  }
})

router.get('/project/:id', checkExistId, async (req, res) => {
  const { projectId } = req;

  try {
    const project = await Project.findById(projectId)
      .populate(['task']);

    return res.send({ project });
  } catch (err) {
    return res.status(400).send({ error: 'Fail on get project' });
  }
})

router.put('/project/:id', checkExistId, async (req, res) => {
  const { title, task } = req.body;
  const { projectId } = req;

  try {

    const project = await Project.findByIdAndUpdate(projectId, { title }, { new: true });

    project.task = [];

    await Task.deleteMany({ project: projectId});

    await Promise.all(task.map(async task => {
      const newTask = await Task.create({ title: task, project: projectId });
      newTask.save();
      project.task.push(newTask);
    }))

    project.save();

    return res.send({ project });
  } catch (err) {
    return res.status(400).send({ error: 'Fail on update project' });
  }
})

router.delete('/project/:id', checkExistId, async (req, res) => {
  const { projectId } = req;

  try {
    await Project.findByIdAndDelete(projectId);
    await Task.deleteMany({ project: projectId });

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Fail on delete project' });
  };
});

module.exports = (app) => app.use('/', router);
