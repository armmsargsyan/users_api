import fs from "fs/promises"
import path from "path"
import { v4 } from "uuid";


export async function GetAllUsers(){
    let users = await fs.readFile("users.json", "utf-8");
    return JSON.parse(users)

}

export async function GetUserById(id){
    let users = await GetAllUsers()
    let user= users.find((user)=>user.id==id)
    return user

}

export async function AddUserData(name, email){
    let users = await GetAllUsers();
    let new_user= {
        "id":v4(), 
        "name": name,
        "email": email

    }
    users.push(new_user)
    await fs.writeFile("users.json", JSON.stringify(users, null, 2));
    return new_user
}


export async function DelUserData(id){
        let users = await GetAllUsers();
        let user = users.findIndex((user)=> user.id == id)
        if(user === -1){
            return null;
        }else{
            users.splice(user,1)
        
        await fs.writeFile("users.json", JSON.stringify(users, null, 2));
        }
}


export async function PatchUserData(id, name, email ){
    let users = await GetAllUsers();
    let user  = users.find((user) => user.id == id)
    if(!user){
        return null
    }
    if(name){
        user.name = name
    }
    if(email){
        user.email = email
    }
    await fs.writeFile("users.json", JSON.stringify(users, null, 2));
    return user;
}

    
export async function PutUserData(id, name, email){
    let users = await GetAllUsers();
    let user = users.find((user)=> user.id == id)
    if(!user){
        const user = await AddUserData(name, email)
        return user
    }
    if(!name || !email){
        return null
    }
    user.name = name;
    user.email = email;

    await fs.writeFile("users.json", JSON.stringify(users, null, 2));
    return user;
}



