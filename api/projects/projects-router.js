// Write your "projects" router here!
const express = require("express")
const Project = require("./projects-model")
const { validProjectID } = require("./projects-middleware")
const router = express.Router();


router.get("/",(req,res,next)=>{
    Project.get()
    .then(pr=>{
        res.status(200).json(pr)
    })
    .catch(err=>{
        next(err)
    })
})


router.get("/:id",validProjectID, (req, res, next) => {
    Project.get(req.params.id)
        .then(pr => {
            res.status(200).json(pr)
        })
        .catch(err => {
            next(err)
        })
});


router.use((error,req,res,next)=>{
    res.status(error.status||500).json({
        messgae:error.messgae,
        customMessage:"There is an issue in Server :500"
    })
})

module.exports = router