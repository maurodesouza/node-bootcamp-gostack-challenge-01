const Project = require('../model/project');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { _id } = await Project.findById(id);
    req.projectId = _id;

    return next();
  } catch (err) {
    return res.send({ error: 'Project ID not found' });
  }
};
