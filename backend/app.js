const express = require('express');

const mainRoute = require('./routes/index');

const app = express();

app.use(mainRoute);

app.listen(3000);
