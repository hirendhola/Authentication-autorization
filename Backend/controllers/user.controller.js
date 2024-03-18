const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//signup
// signup
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (req.exists) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({
            message: "Signup successful",
            user: {
                name,
                email,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Signup failed, please check your details.' });
    }
};


//login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!req.exists) {
            return res.status(404).json({
                message: 'User does not exist',
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, req.password);

        if (isPasswordCorrect) {
            const accessToken = jwt.sign({
                id: req.id,
            }, process.env.JSONWENTOKEN_SIGN_SECRET, {
                expiresIn: "15s"
            });
            console.l
            const refreshToken = jwt.sign({
                id: req.id,
            }, process.env.JSONWENTOKEN_REFRESH_SECRET, {
                expiresIn: "7d"
            });

            res.status(200).cookie("access_token", accessToken, {
                path: '/',
                expires: new Date(Date.now() + 1000 * 15),
                httpOnly: true,
                sameSite: 'lax'
            }).cookie("refresh_token", refreshToken, {
                path: '/',
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                httpOnly: true,
                sameSite: 'lax'
            }).json({ message: 'Login successful' });

        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
      
        res.status(500).json({ message: 'Login failed' });
    }
};

exports.getUser = async (req, res) => {
    const userId = req.id;
    const { exp } = req.user;
    try {
        const user = await User.findById(userId, "-password")
        if (!user) return res.status(404).json({ message: "user not found" })
        res.status(200).json({ user,exp })
    } catch (error) {
        return new Error(error)
    }
}

exports.refreshToken = (req, res) => {
    const refreshToken = req.cookies.refresh_token;
   
    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token is required.' });
    }

    jwt.verify(refreshToken, process.env.JSONWENTOKEN_REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token.' });
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.JSONWENTOKEN_SIGN_SECRET, {
            expiresIn: "15s"
        });

        // Set the new access token in the response cookie
        res.cookie("access_token", accessToken, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 15), 
            httpOnly: true,
            sameSite: 'lax'
        }).json({ message: 'Access token refreshed successfully' });
    });
}
exports.logout = (req, res) => {
    res.clearCookie("access_token", { path: '/' });
    res.clearCookie("refresh_token", { path: '/' });
    res.status(200).json({ message: 'Logout successful' });
};
