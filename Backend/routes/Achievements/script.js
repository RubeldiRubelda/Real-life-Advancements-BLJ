import express from "express"
import fs from 'fs';
const router = express.Router()
const logprefix = "AchievementsRouter:     "
const baseurl = "http://127.0.0.1"
let taskpreset = []
let task = []
let users = []

router.use("/save", (req, res) => {
  let buffer = JSON.stringify(taskpreset)
  fs.writeFileSync("./Backend/saves/advancement-preset.json", buffer)
  console.log(logprefix + "Settings Taskpreset saved: " + buffer)
  buffer = JSON.stringify(task)
  fs.writeFileSync("./Backend/saves/advancement-user.json", buffer)
  console.log(logprefix + "Settings Usertasks saved:  " + buffer)
  res.json(buffer)
})

router.use("/load", (req, res) => {
  taskpreset = JSON.parse(fs.readFileSync("./Backend/saves/advancement-preset.json"))
  task = JSON.parse(fs.readFileSync("./Backend/saves/advancement-user.json"))
  users = JSON.parse(fs.readFileSync("./Backend/saves/user.json"))
  console.log(logprefix + "Taskpreset loaded:    " + JSON.stringify(taskpreset))
  console.log(logprefix + "Usertasks loaded:     " + JSON.stringify(task))
  console.log(logprefix + "Users loaded:         " + JSON.stringify(users))
  res.json(task)
})

router.use("/user/add/:idendificator/:username", (req, res) => {
  if (req.params.idendificator == "[nsJD!}9yLL]a=lB4}Juo(]y5(&xKg8Z") {
    users.push(req.params.username)
    task.push([]);
    let userid = users.indexOf(req.params.username)
    for (let i = 0; i < taskpreset.length; i++) {
      task[userid].push(false)
    }
    res.json({"Okay": true, "Message": "User added."})
    console.log(logprefix + "Added User: \"" + req.params.username + "\" with the ID: \"" + userid + "\"")
  } else {
    res.json({"Okay": false, "Error": "Password not correct.", "Message": "User NOT added."})
    console.log(logprefix + "Faild to add User: \"" + req.params.push + "\" beacause the wrong identificator was provided #IMPORTANT SOMEONE IS TRYING TO HACK YOU!!!!!!!!")
  }
})

router.use("/user/del/:idendificator/:username", (req, res) => {
  if (req.params.idendificator == "[nsJD!}9yLL]a=lB4}Juo(]y5(&xKg8Z") {
    let userid = users.indexOf(req.params.username)
    users.splice(userid, 1)
    task.splice(userid, 1)
    res.json({"Okay": true, "Message": "User deleted."})
    console.log(logprefix + "Deleted User: \"" + req.params.username + "\" with the old ID: \"" + userid + "\"")
  } else {
    res.json({"Okay": false, "Error": "Password not correct.", "Message": "User NOT deleted."})
    console.log(logprefix + "Faild to delete User: \"" + req.params.push + "\" with the ID: \"" + userid + "\" beacause the wrong identificator was provided #IMPORTANT SOMEONE IS TRYING TO HACK YOU!!!!!!!!")
  }
})

router.use("/done/:idendificator/:username/:taskid", (req, res) => {
  if (req.params.idendificator == "[nsJD!}9yLL]a=lB4}Juo(]y5(&xKg8Z") {
    let userid = users.indexOf(req.params.username)
    task[userid][req.params.taskid] = true
    res.json({"Okay": true, "Message": "Task marked as DONE"})
    fetch(baseurl + "/api/score")
    console.log(logprefix + "Task: \"" + req.params.taskid + "\" marked as done for the User: \"" + req.params.username + "\"")
  } else {
    res.json({"Okay": false, "Error": "Password not correct.", "Message": "Task NOT marked as DONE"})
    console.log(logprefix + "Task: \"" + req.params.taskid + "\" NOT marked as done for the User: \"" + req.params.username + "\" beacause the wrong identificator was provided #IMPORTANT SOMEONE IS TRYING TO HACK YOU!!!!!!!!")
  }
})


router.use("/add/:idendificator/:taskname", (req, res) => {
  if (req.params.idendificator == "[nsJD!}9yLL]a=lB4}Juo(]y5(&xKg8Z") {
    if (-1 == task.indexOf(req.params.taskname)) {
      taskpreset.push(req.params.taskname)
      for (let i = 0; i < users.length; i++) {
        task[i - 1].push(false)
      }
      res.json({"Okay": true, "Message": "Task successfully added."})
      console.log(logprefix + "Task: \"" + req.params.taskname + "\" succesfully added to ID: \"" + taskpreset.indexOf(req.params.taskname) + "\"")
    } else {
      res.json({"Okay": false, "Error": "Task: " + req.params.taskname + " already exist.", "Message": "Task NOT marked as DONE"})
      console.log(logprefix + "Task: \"" + req.params.taskname + "\" was not added beacause it already exists in the Taskpreset list.")
    }
  } else {
    res.json({"Okay": false, "Error": "Password not correct.", "Message": "Task NOT added!"})
    console.log(logprefix + "Task: \"" + req.params.taskname + "\" was not added beacause the wrong identificator was provided #IMPORTANT SOMEONE IS TRYING TO HACK YOU!!!!!!!!")
  }
})

router.use("/del/:idendificator/:taskname", (req, res) => {
  if (req.params.idendificator == "[nsJD!}9yLL]a=lB4}Juo(]y5(&xKg8Z") {
    let taskid = task.indexOf(req.params.taskname)
    if (taskid !== -1) {
      taskpreset.splice(taskid, 1)
      for (let i = 0; i < users.length; i++) {
        task[i - 1].splice(taskid, 1)
      }
      res.json({"Okay": true, "Message": "Task successfully deleted."})
      console.log(logprefix + "Task: \"" + req.params.taskname + "\" succesfully deleted with the old id ID: \"" + taskid + "\"")
    } else {
      res.json({"Okay": false, "Error": "Task: " + req.params.taskname + " dose not exist.", "Message": "Task NOT Deleted"})
      console.log(logprefix + "Task: \"" + req.params.taskname + "\" was not delted beacause it dose not exist in the Taskpreset list.")
    }
  } else {
    res.json({"Okay": false, "Error": "Password not correct.", "Message": "Task NOT deleted."})
    console.log(logprefix + "Task: \"" + req.params.taskname + "\" was not deleted beacause the wrong identificator was provided #IMPORTANT SOMEONE IS TRYING TO HACK YOU!!!!!!!!")
  }
})

router.use("/get/:username/:passwd",async (req, res) => {
  let userid = users.indexOf(req.params.username)
  let Usertask = task[userid]
  let response = await fetch(`${baseurl}/api/user/check/${username}/${passwd}`);
  response = await response.json(); // converts response body -> JS object
  
  if (response.Okay) {
    res.json(JSON.parse(Usertask))
  } else {
    res.json({"Okay": false, "Error": "User or password wrong!", "Message": "Coud not securely send Data."})
  }
})

export { router }