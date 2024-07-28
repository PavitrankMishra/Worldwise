const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const app = express();
const apiRouter = jsonServer.router('data/cities.json');
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use('/api', apiRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});