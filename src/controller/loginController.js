const { User } = require("../model");

const {
    hashPassword,
    comparePassword,
    generateToken,
} = require("../services/auth");

exports.login = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            // req.flash("warning", "user hoac password khong tim thay");
            return res.status(400).json({ message: "user hoac password khong thay" });
        }
        const matchPassword = comparePassword(password, user.password);
        if (!matchPassword) {
            // req.flash("warning", "user hoac password khong tim thay");
            return res.status(400).json({ message: "user hoac password khong thay" });
        }

        const token = generateToken({ username });

        return res
            .status(200)
            .json({ message: "Dang nhap thanh cong", id: user._id, token });
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.register = async(req, res) => {
    try {
        const { username, password } = req.body;
        const alreadyExistsUser = await User.findOne({ username }).catch((err) => {
            console.log("Error: ", err);
        });
        if (alreadyExistsUser) {
            // req.flash("warning", "username da ton tai");
            return res.status(400).json({ message: "username da ton tai" });
        }
        const hased = hashPassword(password);
        const newUser = await User.create({ username, password: hased });

        return res.status(200).json({ message: "Tao tai khoan thanh cong" });
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.changePass = async(req, res) => {
    try {
        const { username, password, newPass } = req.body;
        const hashed = hashPassword(password);
        const Updated = await User.findOneAndUpdate({ username }, { password: hashed }, { new: true },
            (err, result) => {
                if (err) return res.status(400).json({ message: err });
                else return res.status(200).json({ message: result });
            }
        ).exec();
    } catch (error) {
        return res.status(400).json(error);
    }
};

exports.logout = async(req, res) => {
    try {
        res.redirect("/api/login");
    } catch (error) {
        return res.status(400).json(error);
    }
};