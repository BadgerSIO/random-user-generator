const express = require("express");
const userController = require("../controllers/users.controllers");
const router = express.Router();

// router.route("/").get(userController.getAllUsers).post(userController.saveUser);
router.route("/random").get(userController.getRandomUser);
router.route("/all").get(userController.getAllUsers);
router.route("/save").post(userController.saveUser);
router.route("/update").patch(userController.updateSingleUser);

module.exports = router;
