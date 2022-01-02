// model
const User = require("../../models/User/User");

// utils
const handleErrors = require("../../Utils/Errors/handleErrors");
const { createToken } = require("../../Utils/Auth/Auth");

module.exports.signup = async (req, res) => {
	try {
		const user = await User.create(req.body);

		res.status(200).json(user);
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.login(email, password);

		const token = createToken(user._id);

		res.cookie("jwt", token, {
			maxAge: 1000 * 60 * 60 * 24 * 3,
			httpOnly: true,
			secure: process.env.NODE_ENV == "production",
			domain: "herokuapp.com",
			sameSite: "none",
		});

		res.status(200).json({ ok: 1, message: "login done correctly" });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.logout = (req, res) => {
	res.cookie("jwt", "", {
		maxAge: 1,
		httpOnly: true,
		secure: process.env.NODE_ENV == "production",
		domain: "herokuapp.com",
		sameSite: "none",
	});
	res.status(200).json({ ok: 1, message: "logout done correctly" });
};
