const mongoose = require('../database');

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
