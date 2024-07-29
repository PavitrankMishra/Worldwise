const express = require("express");
const path = require("path");
const jsonServer = require("json-server");
const app = express();
const apiRouter = jsonServer.router("data/cities.json");
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use("/app", apiRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../FrontEnd/build')));

app.get("/api", (req, res) => {
  res.send({ message: "Hello from the server!" });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
