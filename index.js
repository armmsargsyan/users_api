import { GetAllUsers, GetUserById, AddUserData, DelUserData } from "./service.js";

import express from "express";


let app= express();
app.use(express.json());

app.get("/users", async(req, res)=>{
        let users = await GetAllUsers()
        res.status(200).json(users);
} )

app.get("/users/:id", async(req, res)=>{
    let user= await GetUserById(req.params.id)
    if(!user){
        return res.status(404).end();
    }else{
        res.status(200).json(user);
    }


})


app.post("/users", async(req, res)=>{
    if(!req.body.name || !req.body.email){
        return res.status(422).end();
    }else{
        let user = await AddUserData(req.body.name, req.body.email)
        res.status(201).json(user);
    }
    
})


app.delete("/users/:id", async(req, res)=> {
    let users = await DelUserData(req.params.id)
    res.status(204).end()
})


























app.listen(3004, ()=> console.log("server is listen on port 3004"))