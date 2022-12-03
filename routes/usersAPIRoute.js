const express = require("express");
const router = express.Router();
const Users = require("../db/Users");

router.use(express.json());

router.post("/users", async (req, res) => {
    try {
        if (req.body.type == "login"){
            const user = await Users.find({username: req.body.client.username, password: req.body.client.password});
            if (user.length == 0) res.sendStatus(404);
            else res.sendStatus(202);
        }else if (req.body.type == "register"){
            const users = await Users.find({username: req.body.client.username, password: req.body.client.password});
            if (users.length == 0){
                const user = await Users.create({username: req.body.client.username, password: req.body.client.password});
                res.send("User registred");
            }else res.send("User already registred");
        }else{
            res.status(400);
        }
    }catch(error){
        res.send(error.message);
    }
});

module.exports = router;