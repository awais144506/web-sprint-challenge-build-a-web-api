const express = require('express');
const routerProjects = require("./projects/projects-router")
const server = express();
server.use(express.json());
server.use("/api/projects",routerProjects)
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.get("/",(req,res)=>{
    res.json({message:"Server is Running !!!"})
})
module.exports = server;
