const { port, host, secretKey } = require("./config/server-config.js");
const apiRouter = require("./routes/index.js");
const express = require("express");
const app = express();
const PORT = port || 3000;

app.use(express.json());

app.use("/api", apiRouter);
app.get("/", (req, res) => {
  res.send("<h1>Hello, Geeks!</h1><p>This is your simple Express server.</p>");
});
console.log(port);
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
