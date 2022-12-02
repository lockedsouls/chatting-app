const express = require("express");
const router = express.Router();
const Users = require("../db/Users");

router.use(express.json());

router.post("/users", async (req, res) => {
    try {
        const user = await Users.find({username: req.body.username, password: req.body.password});
        if (user.length == 0) res.send(0);
        else res.send(1);
    }catch(error){
        res.send(error.message);
    }
});

// router.post("/users", async (req, res) => {
//     try{
//         const user = await Users.create({username: req.body.username, password: req.body.password});
//         res.send(user);
//         console.log(user);
//     }catch(error){
//         res.send(error.message);
//     }
// })

module.exports = router;