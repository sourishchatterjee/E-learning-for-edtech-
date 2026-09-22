const express=require('express');
const router=express.Router();
const userController = require('../../Module/userAuth/controller/user.controller');




router.get('/getAllUser',userController.getAllUser); 

router.get('/blockuser/:id',userController.blockUser);

router.get('/unblockuser/:id',userController.unblockUser);



module.exports=router;