const express=require('express');
const router=express.Router();
const multer=require('multer');
const upload=multer({dest:'tmp/'});
const {
    register,
    login,
    googleLogin,
    uploadPicture,
    updateUserDetails,
    logout
}=require('../controllers/userController.js');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/google/auth').post(googleLogin);
router.route('/update-picture').post(upload.single('picture'),uploadPicture);
router.route('/update-user').put(updateUserDetails);
router.route('/logout').get(logout);

module.exports=router;

