import express from "express";
import { join } from "path";
import { router, defaults } from "json-server";
const app = express();
const apiRouter = router("data/cities.json");
const middlewares = defaults();

app.use(middlewares);
app.use("/app", apiRouter);

// Serve static files from the React app
app.use(join(__dirname, '../FrontEnd/build'));

app.get("/api", (req, res) => {
  res.send({ message: "Hello from the server!" });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, '../FrontEnd/build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
