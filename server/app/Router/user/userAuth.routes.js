const express=require('express');
const router=express.Router();
const userImageUpload=require('../../Helper/uploadImage');
const userController = require('../../Module/userAuth/controller/user.controller');
const {AuthCheck} = require('../../Middleware/userAuth');

// Custom middleware to handle multer errors
function multerErrorHandler(req, res, next) {
    userImageUpload.single('image')(req, res, function (err) {
        if (err) {
            return res.status(400).json({
                message: err.message
            });
        }
        next();
    });
}


router.post('/register',multerErrorHandler,userController.registerUser);
// Route to verify email using the token in the URL
router.get('/verify-email', userController.verifyEmail);

router.post('/login',userController.userLogin);
router.post('/update_profile',AuthCheck,multerErrorHandler,userController.updateUser);
router.post('/delete_account',AuthCheck,userController.deleteAccount);
router.post('/changePassword',AuthCheck,userController.changePassword);
router.post('/sendOtp',userController.sendotp);
router.post('/verifyotp',userController.verifyOtp);
router.post('/forgotPassword',userController.forgotPassword);




module.exports=router;