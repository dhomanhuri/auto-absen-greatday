var express = require("express");
var router = express.Router();
const { auth } = require("../middleware/auth");
const exampleControllers = require("../controllers/exampleControllers");
const authControllers = require("../controllers/authControllers");
const greatdayControllers = require("../controllers/greatdayControllers");
const userControllers = require("../controllers/userControllers");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("hhe");
});

router.get("/example", exampleControllers.example);
router.post("/login", auth, authControllers.login);
router.get("/islogin", auth, authControllers.isLogin);
router.get("/absen", greatdayControllers.cron_runner);
router.get("/user", userControllers.index);
router.get("/user/:id", userControllers.getbyid);
router.put("/user/:id", userControllers.putbyid);
router.post("/user", userControllers.add);
router.delete("/user/:id", userControllers.dell);

module.exports = router;
