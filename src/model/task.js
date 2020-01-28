const mongoose = require('../database');

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
});

const Task = mongoose.model('Taks', TaskSchema);

module.exports = Task;
