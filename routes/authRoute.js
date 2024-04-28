const express = require('express');
const { createUser, loginUserCtrl,updateaUser,getallUser, getaUser,deleteaUser, blockUser, unblockUser, handleRefreshToken } = require('../controller/userCtrl');
const {authmiddleWare,isAdmin} = require('../middleware/authMiddleware');
const router = express.Router()


router.post("/register",createUser)
router.post("/login",loginUserCtrl)


router.get("/all-users",getallUser)
router.get("/:id",authmiddleWare,getaUser)
router.delete("/:id",deleteaUser)
router.put("/edit-user",authmiddleWare,updateaUser)
router.put("/block-user/:id",authmiddleWare,blockUser)
router.put("/unblock-user/:id",authmiddleWare,unblockUser)
router.put("/refresh", handleRefreshToken)



module.exports = router;