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
  disciption = JSON.parse(fs.readFileSync("./Backend/saves/advancement-description.json"))
  image = JSON.parse(fs.readFileSync("./Backend/saves/advancement-icon.json"))
  name = JSON.parse(fs.readFileSync("./Backend/saves/advancement-preset.json"))
  console.log(logprefix + "Discription loaded:   " + JSON.stringify(disciption))
  console.log(logprefix + "Images loaded:        " + JSON.stringify(image))
  console.log(logprefix + "Names loaded:         " + JSON.stringify(name))
  res.json({"OK": true, "Discription": "Settings Loaded"})
})

router.use("/get/discription", (req, res) => {
    res.json(disciption)
})

router.use("/get/image", (req, res) => {
    res.json(image)
})

router.use("/get/name", (req, res) => {
    res.json(name)
})
export { router }