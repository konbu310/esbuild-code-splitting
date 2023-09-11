import express from "express";

const app = express();

app.use(express.static("dist"));

app.get("/", (_, res) => {
  res.send(`<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="bundle.js"></script>
  </body>
</html>`);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
