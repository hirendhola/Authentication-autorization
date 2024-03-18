// checkIfUserExists.middleware.js
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        req.exists = !!existingUser;
        req.id = existingUser ? existingUser._id : null
        req.password = existingUser ? existingUser.password : null;
        req.user = existingUser;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error checking user existence' });
    }
};
