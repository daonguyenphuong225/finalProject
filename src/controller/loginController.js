const { User } = require("../model");
const router = require("express").Router();
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
            return res.status(400).json({ message: "user hoac password khong thay" });
        }
        const matchPassword = comparePassword(password, user.password);
        if (!matchPassword)
            return res.status(400).json({ message: "user hoac password khong thay" });


        const token = generateToken({ username });

        return res.json({ message: "Dang nhap thanh cong", token });
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.register = async(req, res) => {
    try {
        const { username, password } = req.body;
        const alreadyExistsUser = await User.findOne({ username }).catch(
            (err) => {
                console.log("Error: ", err);
            }
        );
        if (alreadyExistsUser)
            return res.status(400).json({ message: "username da ton tai" });
        const hased = hashPassword(password);
        const newUser = await User.create({ username, password: hased });

        return res.json({ message: "Tao tai khoan thanh cong" });
    } catch (err) {
        return res.status(404).json(err);
    }
}
exports.changePass = async(req, res) => {
    try {
        const { username, password } = req.body;
        const hashed = hashPassword(password);
        const Updated = await User.findOneAndUpdate({ username }, { password: hashed }, { new: true },
            (err, result) => {
                if (err) return res.status(400).json({ message: err });
                else return res.json({ message: result });
            }
        ).exec();
    } catch (error) {}
};