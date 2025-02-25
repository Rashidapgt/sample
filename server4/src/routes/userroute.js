const express = require("express");
const router = express.Router();
const{auth}=require('../middlewares/auth')
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/usercontroller");

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id",auth, getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
