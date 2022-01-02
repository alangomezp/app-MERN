const express = require("express");
const router = express.Router();
const Task = require("../models/tasks");

router.get("/", async (req, res) => {
  const task = await Task.find();
  res.send(task);
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const newTask = { title, description };
  await Task.create(newTask);
  res.send({ status: "Task Created" });
});

router
  .route("/:id")
  .get(async (req, res) => {
    const taskFindedById = await Task.findById(req.params.id);
    res.send(taskFindedById);
  })
  .put(async (req, res) => {
    console.log(req.body);
    const { title, description } = req.body;
    const update = { title, description };
    await Task.findByIdAndUpdate(req.params.id, update);
    res.send({ status: "Task Updated" });
  })
  .delete(async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send({ status: "Task Deleted" });
  });

module.exports = router;
