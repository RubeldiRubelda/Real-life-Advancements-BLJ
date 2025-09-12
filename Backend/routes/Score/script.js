import express from "express"
import fs from 'fs';
const router = express.Router()
const logprefix = "ScoreRouter:            "
let scores = []
let users = []

router.use("/save", (req, res) => {
  let buffer = JSON.stringify(scores)
  fs.writeFileSync("./Backend/saves/tasks.json", buffer)
  console.log(logprefix + "Scores tasks saved:     " + buffer)
  res.json({"Okay": true, "Discription": "Scores Saved"})
  
})

router.use("/load", (req, res) => {
  scores = JSON.parse(fs.readFileSync("./Backend/saves/tasks.json"))
  users = JSON.parse(fs.readFileSync("./Backend/saves/user.json"))
  console.log(logprefix + "Scores loaded:        " + JSON.stringify(scores))
  console.log(logprefix + "Users loaded:         " + JSON.stringify(users))
  res.json({"Okay": true, "Discription": "Settings Loaded"})
})

router.use("/scoretr", (req, res) => {
  scores = JSON.parse(fs.readFileSync("./Backend/saves/tasks.json"))
  users = JSON.parse(fs.readFileSync("./Backend/saves/user.json"))
  console.log(logprefix + "Scores loaded:        " + JSON.stringify(scores))
  console.log(logprefix + "Users loaded:         " + JSON.stringify(users))
  res.json({"Okay": true, "Discription": "Settings Loaded"})
})


export { router }