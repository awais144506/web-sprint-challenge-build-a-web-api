// Write your "projects" router here!
const express = require("express")
const Project = require("./projects-model")
const { validProjectID, validProject } = require("./projects-middleware")
const router = express.Router();

//Get All Projects
router.get("/", (req, res, next) => {
    Project.get()
        .then(pr => {
            res.status(200).json(pr)
        })
        .catch(err => {
            next(err)
        })
})
//Get Proejcts By ID
router.get("/:id", validProjectID, (req, res, next) => {
    Project.get(req.params.id)
        .then(pr => {
            res.status(200).json(pr)
        })
        .catch(err => {
            next(err)
        })
});
//Post a new project
router.post("/", validProject, (req, res, next) => {
    const newProject = {
        name: req.name,
        description: req.description,
        completed: req.completed,
    };

    Project.insert(newProject)
        .then(({ id }) => {
            return Project.get(id)
        })
        .then(pr => {
            res.status(201).json(pr)
        })
        .catch(err => {
            next(err)
        })
})
//PUT a Project
router.put("/:id", validProjectID, validProject, async(req, res, next) => {
    Project.update(req.params.id,req.body)
    .then(pr=>{
        res.status(200).json(pr)
    })
    .catch(err=>{
        next(err)
    })
})
// Delete a Project
router.delete("/:id", validProjectID, (req, res, next) => {
    Project.remove(req.params.id)
        .then(pr => {
            res.status(200).json(pr)
        })
        .catch(err => {
            next(err)
        })
})

//Custom Error
router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        messgae: error.message,
        customMessage: "There is an issue in Server :500"
    })
})

module.exports = router