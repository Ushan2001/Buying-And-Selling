const express = require("express");
const { signUp, signIn } = require("../controllers/new-user-controller");

const router = express.Router();

router.post("/customer/signup", signUp);
router.post("/customer/signin", signIn);

module.exports = router;
