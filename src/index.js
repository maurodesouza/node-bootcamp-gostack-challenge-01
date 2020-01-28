const express = require('express');

const app = express();

app.use(express.json());

require('./controller/project')(app);

app.listen(5656);