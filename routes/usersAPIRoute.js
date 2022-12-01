const express = require("express");
const router = express.Router();
const Users = require("../db/Users");

router.use(express.json());

router.get("/users", async (req, res) => {
    try {
        res.json(await Users.find());
    }catch(error){
        res.send(error.message);
    }
});

router.post("/users", async (req, res) => {
    try{
        const user = await Users.create({username: req.body.username, password: req.body.password});
        res.send(user);
        console.log(user);
    }catch(error){
        res.send(error.message);
    }
})

module.exports = router;