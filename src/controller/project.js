const router = require('express').Router();

const Project = require('../model/project');
const Task = require('../model/task');



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

router.get('/project/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id)
      .populate(['task']);
    return res.send({ project });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Fail on get project' });
  }
})

router.put('/project/:id', async (req, res) => {
  const { title, task } = req.body;
  const { id } = req.params;

  try {

    const project = await Project.findByIdAndUpdate(id, { title }, { new: true });

    project.task = [];

    await Task.deleteMany({ project: project._id });

    await Promise.all(task.map(async task => {
      const newTask = await Task.create({ title: task, project: project._id });
      newTask.save();
      project.task.push(newTask);
    }))

    project.save();

    return res.send({ project });
  } catch (err) {
    return res.status(400).send({ error: 'Fail on update project' });
  }
})

module.exports = (app) => app.use('/', router);
