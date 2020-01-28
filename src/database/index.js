const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/project-task', {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})

mongoose.Promise = global.Promise;

module.exports = mongoose;
