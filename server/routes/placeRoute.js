const express = require('express');
const router=express.Router();
const { isLoggedIn } = require('../middlewares/userMiddleware.js');

const{
    addPlace,
    userPlaces,
    updatePlace,
    singlePlace,
    getPlaces,
    searchPlace

}=require('../controllers/placeController.js');
//protected routes (user must be loggedd in)
router.route('/add-place').post(isLoggedIn,addPlace);
router.route('/user-places').get(isLoggedIn,userPlaces);
router.route('/update-place').put(isLoggedIn,updatePlace);

//Not protected routes but sequence should not be interfered with above routes
router.route('/place/:id').get(singlePlace);
router.route('/places').get(getPlaces);
router.route('/search/:key').get(searchPlace);
//optional code
//router.route('/:id).get(singlePlace);
//router.route('/').get(getPlaces);
//router.route('/search/:key').get(searchPlace);

module.exports=router;