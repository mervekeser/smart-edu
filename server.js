const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Smart Edu");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Serve has started on port ${port}`);
});
