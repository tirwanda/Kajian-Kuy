const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema(
	{
		channelName: {
			type: String,
			required: [true, 'Please enter your Name'],
		},
		description: {
			type: String,
			required: [true, 'Please enter description'],
		},
		country: {
			type: String,
			required: [true, 'Please enter channel country'],
		},
		city: {
			type: String,
			required: [true, 'Please enter channel city'],
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			unique: true,
			default: null,
		},
		channelPicture: {
			type: String,
			default: '',
		},
		channelBanner: {
			type: String,
			default: '',
		},
		createdAt: { type: Number, default: Date.now },
		updatedAt: { type: Number, default: Date.now },
	},
	{ timestamps: true }
);

channelSchema.pre('updateOne', function (next) {
	this.update({}, { $set: { updatedAt: Date.now() } });
	next();
});

module.exports = mongoose.model('Channel', channelSchema);
