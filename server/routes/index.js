const express = require('express');

// ================================================

const app = express();

// =================================================

app.use(require('./routes'));
app.use(require('./login'));
app.use(require('./ticket'));
app.use(require('./showModels'));

// =================================================

module.exports = app;