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
        const { name, description, completed } = req.body;

        // Check for required fields based on the HTTP method
        if (req.method === "POST") {
            if (!name || !description) {
                return next({
                    status: 400,
                    message: "Name and description are required for POST requests.",
                });
            }
        } else if (req.method === "PUT") {
            if (!name || !description || completed === undefined) {
                return next({
                    status: 400,
                    message: "Name, description, and completed are required for PUT requests.",
                });
            }
        }

        // Attach validated fields to the request object
        req.name = name;
        req.description = description;
        req.completed = completed !== undefined ? completed : false;

        next();
    } catch (error) {
        next(error);
    }
}

    module.exports = {
        validProjectID,
        validProject
    }