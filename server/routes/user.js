const express = require('express');
const {
	createUser,
	loginUser,
	logoutUser,
	userDetails,
	updateUserInfo,
	updateUserAvatar,
	changePassword,
} = require('../controllers/user');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();

router.route('/registration').post(createUser);

router.route('/signin').post(loginUser);

router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthenticatedUser, userDetails);

router.route('/update-profile').put(isAuthenticatedUser, updateUserInfo);

router.route('/change-password').put(isAuthenticatedUser, changePassword);

router.route('/update-avatar').put(isAuthenticatedUser, updateUserAvatar);

module.exports = router;
