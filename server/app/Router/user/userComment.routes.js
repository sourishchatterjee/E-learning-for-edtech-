const express = require('express');
const router = express.Router();
const commetController = require('../../Module/comment/controller/comment.controller');
const {AuthCheck} = require('../../Middleware/userAuth');



router.post('/comment',AuthCheck,commetController.createComment);




module.exports=router;