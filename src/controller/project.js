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

module.exports = (app) => app.use('/', router);
