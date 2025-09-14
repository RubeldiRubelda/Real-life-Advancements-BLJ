import express from "express"
import fs from 'fs';
const router = express.Router()
const logprefix = "ScoreRouter:            "
const baseurl = "http://127.0.0.1:80"
let scores = [0, 1, 3]
let users = []

router.use("/save", (req, res) => {
  let buffer = JSON.stringify(scores)
  fs.writeFileSync("./Backend/saves/score.json", buffer)
  console.log(logprefix + "Scores tasks saved:     " + buffer)
  res.json({"Okay": true, "Discription": "Scores Saved"})
  
})

router.use("/load", (req, res) => {
  scores = JSON.parse(fs.readFileSync("./Backend/saves/score.json"))
  users = JSON.parse(fs.readFileSync("./Backend/saves/user.json"))
  console.log(logprefix + "Scores loaded:        " + JSON.stringify(scores))
  console.log(logprefix + "Users loaded:         " + JSON.stringify(users))
  res.json({"Okay": true, "Discription": "Settings Loaded"})
})

router.use("/add/:username/:pw/:scoretoadd",async (req, res) => {
  let response = await fetch(baseurl + "/api/user/check/" + req.params.username + "/" + req.params.pw)
  response = await response.json()
  if (response.Okay) {
    let userid = users.indexOf(req.params.username)
    scores[userid] += req.params.scoretoadd
    res.json({"Okay": true, "Score": scores[userid]})
    console.log(logprefix + "User: \"" + req.params.username + "\" with ID: \"" + userid + "\" got added Score: \"" + JSON.stringify(scores[userid]))
  } else {
    res.json({"Okay": true, "Error": "Username or Password was wrong"})
    console.log(logprefix + "User: \"" + req.params.username + "\" faild to send Score because the wrong password or username was sent or the Server didn't responde.")
  }
})

router.use("/user/add/:idendificator/:username", (req, res) => {
  users.push(req.params.username)
  console.log(users)
  scores.push(0);
  console.log(scores)
  res.json({"Okay": true, "Message": "User added."})
  console.log(logprefix + "Added User: \"" + req.params.username + "\" with the ID: \"" + userid + "\"")
})

router.use("/:username/:pw",async (req, res) => {
  let response = await fetch(baseurl + "/api/user/check/" + req.params.username + "/" + req.params.pw)
  response = await response.json()
  if (response.Okay) {
    let userid = users.indexOf(req.params.username)
    res.json({"Okay": true, "Score": scores[userid]})
    console.log(logprefix + "User: \"" + req.params.username + "\" with ID: \"" + userid + "\" got Score: \"" + JSON.stringify(scores[userid]))
  } else {
    res.json({"Okay": true, "Error": "Username or Password was wrong"})
    console.log(logprefix + "User: \"" + req.params.username + "\" faild to send Score because the wrong password or username was sent or the Server didn't responde.")
  }
})


export { router }
