// add middlewares here related to projects
const Project = require("./projects-model")

async function validProjectID(req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if (project) {
            req.project = project
            next()
        }
        else {
            next({ status: 404, message: "Project Not Found" })
        }
    }
    catch (error) {
        next(error)
    }
}

async function validProject(req, res, next) {
    try {
        const { name, description,completed } = req.body
       
        if (name && description) {
            
            req.name = name
            req.description = description
            req.completed = completed !== undefined ? completed : false;
            next()
        }
        else {
            next({status:400,message:"That is a bad request to post"})
        }
    }
    catch (error) {
        next(error)
    }}

    module.exports = {
        validProjectID,
        validProject
    }