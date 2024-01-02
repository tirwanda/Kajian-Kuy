const User = require('../../models/UserModel.js');
const Channel = require('../../models/ChannelModel.js');
const ErrorHandler = require('../../utils/ErrorHandler.js');
const catchAsyncErrors = require('../../middleware/catchAsyncErrors.js');

exports.createChannel = catchAsyncErrors(async (req, res, next) => {
	try {
		const { userId, channelName, description, country, city } = req.body;

		let channel = await Channel.findOne({ channelName });
		if (channel) {
			return res
				.status(400)
				.json({ success: false, message: 'Channel already exists' });
		}

		const savedChannel = await Channel.create({
			channelName,
			description,
			country,
			city,
			user: userId,
		});

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ channel: savedChannel._id },
			{ new: true }
		);

		return res.status(201).json({
			success: true,
			message: 'Channel created successfully',
			channel: savedChannel,
			user: updatedUser,
			status: 201,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
			status: 500,
		});
	}
});
