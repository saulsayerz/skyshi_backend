const express = require('express');
const routeActivity = require("./routes/routeActivity");
const routeTodo = require("./routes/routeTodo");
const db = require('./services/db');

const app = express();
var cors = require('cors')
const port = 3030;

app.use(express.json());
app.use(cors())
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/activity-groups", routeActivity);
app.use("/todo-items", routeTodo);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

db.migrate();