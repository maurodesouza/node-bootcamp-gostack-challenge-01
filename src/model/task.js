const mongoose = require('../database');

const TaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model('Taks', TaskSchema);

module.exports = Task;
