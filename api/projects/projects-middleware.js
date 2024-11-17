// add middlewares here related to projects
const Project = require("./projects-model")

async function validProjectID(req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        console.log(project)
        if(project)
        {
            req.project = project
            next()
        }
        else{
            next({status:404, message:"Project Not Found"})
        }
    }   
    catch (error) {
        next(error)
    }
}

module.exports = {
    validProjectID,

}