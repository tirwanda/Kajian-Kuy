const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter your Name'],
		},
		email: {
			type: String,
			required: [true, 'Please enter your email'],
		},
		password: {
			type: String,
			required: [true, 'Please enter your password'],
		},
		avatar: {
			public_id: {
				type: String,
			},
			url: {
				type: String,
				default: '',
			},
		},
		role: { type: String, default: 'ROLE_USER' },
		title: { type: String, default: '' },
		bio: { type: String, default: '' },
		saveArticles: [{ type: mongoose.Types.ObjectId, ref: 'Article' }],
		subscriptions: [{ type: mongoose.Types.ObjectId, ref: 'Channel' }],
	},
	{ timestamps: true }
);

// Hash password
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES,
	});
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
