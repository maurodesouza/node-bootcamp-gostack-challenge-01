const mongoose = require('../database')

const ProjectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  task:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
