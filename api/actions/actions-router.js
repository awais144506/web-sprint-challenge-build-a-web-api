// Write your "actions" router here!
const express = require("express")
const Action = require("./actions-model")
const { validActionID, validAction } = require("./actions-middlware")
const router = express.Router()
//Get Actions
router.get("/", (req, res, next) => {
    Action.get()
        .then(ac => {
            res.status(200).json(ac)
        })
        .catch(err => {
            next(err)
        })
})
//Get Action By ID
router.get("/:id", validActionID, (req, res, next) => {
    Action.get(req.params.id)
        .then(ac => {
            res.status(200).json(ac)
        })
        .catch(err => {
            next(err)
        })
})
//Post Action 
router.post('/', validAction, async (req, res, next) => {
    try {
        const { project_id, description, notes, completed } = req.body;
        const newAction = await Action.insert({
            project_id,
            description,
            notes,
            completed,
        });
        res.status(201).json(newAction);
    } catch (error) {
        next(error);
    }
})
//Delete Action 
router.delete("/:id", validActionID, async(req, res, next) => {
    try{
          const deleted = await Action.remove(req.params.id)
          res.status(200).json(deleted)
    }
    catch(error)
    {
        next(error)
    }
})


router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "There is an error Getting Actions !!!!"
    })
})





module.exports = router