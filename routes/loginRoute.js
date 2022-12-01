const router = require("express").Router();

const path = `${__dirname.substring(0, __dirname.search("routes"))}/views/login/`;
router.use(require("express").static(path));

router.route("/")
    .get((req, res) => {
        res.sendFile(`${path}/index.html`);
    });

module.exports = router;