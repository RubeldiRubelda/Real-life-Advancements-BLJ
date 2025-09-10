import express from "express"
const router = express.Router()
const logprefix = "AdminRouter:            "
const baseurl = "http://127.0.0.1:3000"

router.use("/save", (req, res) => {
    console.log(logprefix + "All data saved.")
    // fetch(baseurl + "/api/advancements/save")
    // fetch(baseurl + "/api/score/save")
    fetch(baseurl + "/api/user/save")
    res.send("All data saved.")
})

router.use("/load", (req, res) => {
    console.log(logprefix + "All data loaded.")
    // fetch(baseurl + "/api/advancements/load")
    // fetch(baseurl + "/api/score/load")
    fetch(baseurl + "/api/user/load")
    res.send("All data loaded.")
})

router.use("/space", (req, res) => {
    console.log(logprefix)
    res.send("Space in log created.")
})

router.use("/log/:logmessage", (req, res) => {
    console.log(logprefix + req.params.logmessage)
    res.send("Added message to log.")
})

router.use("", (req, res) => res.status(404).json({error: "not found"}))

export {router}
