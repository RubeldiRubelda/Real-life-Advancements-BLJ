import express from "express"
import fs from 'fs';
const router = express.Router()
const logprefix = "TaskDBRouter:           "
let disciption = []
let image = []
let name = []


router.use("/save", (req, res) => {
//   let buffer = JSON.stringify(tasks)
//   fs.writeFileSync("./Backend/saves/tasks.json", buffer)
//   console.log(logprefix + "Settings tasks saved:      " + buffer)
//   buffer = JSON.stringify(task_times)
//   fs.writeFileSync("./Backend/saves/task_times.json", buffer)
//   console.log(logprefix + "Settings times saved:      " + buffer)
//   res.json(buffer)
})

router.use("/load", (req, res) => {
  disciption = JSON.parse(fs.readFileSync("./Backend/saves/task_times.json"))
  image = JSON.parse(fs.readFileSync("./Backend/saves/tasks.json"))
  name = JSON.parse(fs.readFileSync("./Backend/saves/user.json"))
  console.log(logprefix + "Times loaded:         " + JSON.stringify(task_times))
  console.log(logprefix + "Tasks loaded:         " + JSON.stringify(tasks))
  console.log(logprefix + "Users loaded:         " + JSON.stringify(users))
  res.json(tasks)
})