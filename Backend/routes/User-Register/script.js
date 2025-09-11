import express from "express"
import fs from 'fs';
const router = express.Router()
const logprefix = "UserRouter:             "
const baseurl = "http://127.0.0.1:80"

let user = []
let passwords = []

router.use("/save", (req, res) => {
  let buffer = JSON.stringify(user)
  let buffer2 = JSON.stringify(passwords)
  fs.writeFileSync("./Backend/saves/user.json", buffer)
  fs.writeFileSync("./Backend/saves/passwords.json", buffer2)
  res.json({"OK": true, "Users": buffer, "Passwords": "HIDDEN"})
//   res.json({"OK": true, "Users": buffer, "Passwords": buffer2})
  console.log(logprefix + "Settings saved: Users: " + buffer)
  console.log(logprefix + "Settings saved: Users: " + buffer2)
})

router.use("/load", (req, res) => {
  user = JSON.parse(fs.readFileSync("./Backend/saves/user.json"))
  passwords = JSON.parse(fs.readFileSync("./Backend/saves/passwords.json"))
  res.json({"OK": true, "Users": JSON.stringify(user), "Passwords": "HIDDEN"})
//   res.json({"OK": true, "Users": JSON.stringify(user), "Passwords": JSON.stringify(passwords)})
  console.log(logprefix + "Users loaded:         " + JSON.stringify(user))
  console.log(logprefix + "Passwords loaded:     " + JSON.stringify(passwords))
})


router.use("/add/:user/:pw", (req, res) => {
    let userid = user.indexOf(req.params.user)
    if (userid == -1) {
        user.push(req.params.user)
        passwords.push(req.params.pw)
        userid = user.indexOf(req.params.user)
        fetch(baseurl + "/api/advancements/user/add/[nsJD!}9yLL]a=lB4}Juo(]y5(&xKg8Z/" + req.params.user)
        res.json({"OK": true, "UserID": userid})
        console.log(logprefix + "Created user: \"" + req.params.user + " \" with id \"" + userid + "\"")
    } else {
        res.json({"OK": false, "Error": "User already exists.", "UserID": userid})
        console.log(logprefix + "User already exits with name: \"" + req.params.user + "\" with the id: \"" + userid + "\"")
    }
})

router.use("/del/:user/:pw", (req, res) => {
    let userid = user.indexOf(req.params.user)
    if (userid == -1) {
        res.json({"OK": false, "Error": "User or Password dose not exist do not match."})
        console.log(logprefix + "User: \"" + req.params.user + "\" tryed to delete itself but he is not registerd.")
    } else {
        let passwd = passwords[userid]
        if (passwd == req.params.pw) {
            user.splice(userid, 1)
            passwords.splice(userid, 1)
            res.json({"OK": true, "UserID": userid, "Task": "User was now deleted."})
            console.log(logprefix + "User: \"" + req.params.user + "\" was deleted with old id: \"" + userid + "\" succesfully.")
        } else {
            res.json({"OK": false, "Error": "User or Password dose not exist do not match."})
            console.log(logprefix + "User: \"" + req.params.user + "\" with id: \"" + userid + "\" tryed to delete itself but the password was wrong.")
        }
    }
})

router.use("/login/:user/:pw", (req, res) => {
    let userid = user.indexOf(req.params.user)
    if (userid == -1) {
        res.json({"OK": false, "Error": "User or Password dose not exist do not match."})
        console.log(logprefix + "User: \"" + req.params.user + "\" tryed to log in but he is not registerd.")
    } else {
        let passwd = passwords[userid]
        if (passwd == req.params.pw) {
            res.json({"OK": true, "UserID": userid})
            console.log(logprefix + "User: \"" + req.params.user + "\" logged in with id: \"" + userid + "\" succesfully.")
        } else {
            res.json({"OK": false, "Error": "User or Password dose not exist do not match."})
            console.log(logprefix + "User: \"" + req.params.user + "\" with id: \"" + userid + "\" tryed to log in but the password was wrong.")
        }
    }
})



export { router }