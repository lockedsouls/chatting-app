const express = require("express");
const router = express.Router();
const Users = require("../db/Users");

router.use(express.json());

router.post("/users", async (req, res) => {
    try {
        const user = await Users.find({username: req.body.username, password: req.body.password});
        if (user.length == 0) res.sendStatus(404);
        else res.sendStatus(202);
    }catch(error){
        res.send(error.message);
    }
});

module.exports = router;