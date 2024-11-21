// add middlewares here related to actions
const Action = require("./actions-model")


async function validActionID(req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if (action) {
            req.action = action
            next()
        }
        else {
            next({ status: 404, message: "Specified action Not found" })
        }
    }
    catch (error) {
        next(error)
    }
}

async function validAction(req, res, next) {
    try {
        const { project_id,description, notes, completed } = req.body
        if (description && notes && project_id) {
            req.project_id = project_id
            req.description = description
            req.notes = notes
            req.completed = req.completed !== undefined ? completed : false
            next()
        }
        else {
            next({status:400, message:"There is a bad request"})
        }
    }
    catch (error) {
        next(error)
    }
}



module.exports = { validAction, validActionID }