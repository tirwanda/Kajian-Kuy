const express = require('express');

const { createChannel } = require('../../controllers/mobile/channel');

const { isAuthenticatedUser } = require('../../middleware/auth');
const router = express.Router();

router.route('/create-channel').post(isAuthenticatedUser, createChannel);

module.exports = router;
