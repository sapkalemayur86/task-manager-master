const express = require("express");
const app = express();
const port = 3000;

const tasksArray = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
  },
  {
    id: 2,
    title: "Create a new project",
    description: "Create a new project using the Express application generator",
    completed: true,
  },
  {
    id: 3,
    title: "Install nodemon",
    description: "Install nodemon as a development dependency",
    completed: true,
  },
  {
    id: 4,
    title: "Install Express",
    description: "Install Express",
    completed: false,
  },
  {
    id: 5,
    title: "Install Mongoose",
    description: "Install Mongoose",
    completed: false,
  },
  {
    id: 6,
    title: "Install Morgan",
    description: "Install Morgan",
    completed: false,
  },
  {
    id: 7,
    title: "Install body-parser",
    description: "Install body-parser",
    completed: false,
  },
  {
    id: 8,
    title: "Install cors",
    description: "Install cors",
    completed: false,
  },
  {
    id: 9,
    title: "Install passport",
    description: "Install passport",
    completed: false,
  },
  {
    id: 10,
    title: "Install passport-local",
    description: "Install passport-local",
    completed: false,
  },
  {
    id: 11,
    title: "Install passport-local-mongoose",
    description: "Install passport-local-mongoose",
    completed: false,
  },
  {
    id: 12,
    title: "Install express-session",
    description: "Install express-session",
    completed: false,
  },
  {
    id: 13,
    title: "Install connect-mongo",
    description: "Install connect-mongo",
    completed: false,
  },
  {
    id: 14,
    title: "Install dotenv",
    description: "Install dotenv",
    completed: false,
  },
  {
    id: 15,
    title: "Install jsonwebtoken",
    description: "Install jsonwebtoken",
    completed: false,
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function validateBoolean(req, res, next) {
  if (typeof req.body.completed !== "boolean") {
    return res
      .status(400)
      .send('Invalid type for field "completed". Expected boolean.');
  }
  next();
}

app.get("/tasks", (req, res) => {
  if (tasksArray.length === 0) return res.status(404).end("No Task Found!!!");
  res.status(200).json(tasksArray);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasksArray.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).end("Task Not Found!!!");

  res.status(200).json(task);
});

app.post("/tasks", validateBoolean, (req, res) => {
  if (!req.body.title || !req.body.description) {
    res.status(400).send("Title and Description are required");
  }

  const task = {
    id: tasksArray.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  };
  tasksArray.push(task);
  res.status(201).send(task);
});

app.put("/tasks/:id", validateBoolean, (req, res) => {
  if (!req.body.title || !req.body.description) {
    res.status(400).send("Title and Description are required");
  }

  const task = tasksArray.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).end("Task Not Found!!!");

  task.title = req.body.title;
  task.description = req.body.description;
  task.completed = req.body.completed;

  res.send(task);
});

app.delete("/tasks/:id", (req, res) => {
  const task = tasksArray.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).end("Task Not Found!!!");

  const taskIndex = tasksArray.indexOf(task);
  tasksArray.splice(taskIndex, 1);

  res.status(200).send(task);
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
