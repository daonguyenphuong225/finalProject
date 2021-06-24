const { User } = require("../model");

const {
    hashPassword,
    comparePassword,
    generateToken,
} = require("../services/auth");
const { generateCode, sendEmail } = require("../utils/utils");
const { CodeCheck } = require("../utils/utils");
let codeCheck = new CodeCheck();
exports.login = async(req, res) => {
    try {
        console.log("debug1");
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ status: "user hoặc password không thấy" });
        }
        if (!user.email)
            return res.status(400).json({ status: "Tài khoản chưa kích hoạt email" });
        const matchPassword = comparePassword(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({ status: "user hoặc password không thấy" });
        }
        console.log("debug2");
        const token = generateToken({ username });
        console.log("debug3");
        return res
            .status(200)
            .json({ message: "Dang nhap thanh cong", id: user._id, token });
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.register = async(req, res) => {
    try {
        const { username, password, email } = req.body;

        const alreadyExistsUser = await User.findOne({ username }).catch((err) => {
            console.log("Error: ", err);
        });

        if (alreadyExistsUser)
            return res.status(400).json({ status: "username đã tồn tại" });

        const hashed = hashPassword(password);
        const newUser = await User.create({ username, password: hashed });

        //send mail
        codeCheck.setCode(generateCode());
        sendEmail(newUser._id, email, codeCheck.getCode(), 1);
        newUser.code = codeCheck.getCode();
        await newUser.save();
        res.status(200).json({ message: "Check email" });
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.verifyEmail = async(req, res) => {
    try {
        const { email, code } = req.params;
        if (code == codeCheck.getCode()) {
            const user = await User.findOne({ code }).catch((err) => {
                console.log(err);
            });
            user.email = email;
            user.code = null;
            await user.save();
            res.status(200).send("Dang ky thanh cong");
        }
    } catch (e) {
        return res.status(400).send({ message: e });
    }
};

exports.mailtoChangePass = async(req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findOne({ _id: id }).catch(err => {
            console.log(err);
        })
        const email = user.email;
        codeCheck.setCode(generateCode());
        sendEmail(id, email, codeCheck.getCode(), 2);
        user.code = codeCheck.getCode();
        return res
            .status(200)
            .json({ message: "Kiem tra mail de doi pass" });
    } catch (error) {
        return res.status(400).send({ message: error });
    }
}

exports.verifyEmailtoChangePassword = async(req, res) => {
    try {
        const { id, code } = req.params;
        const user = await User.findOne({ _id: id }).catch(err => {
            console.log(err);
        })
        if (user && user.code == code) {
            user.code = null;
            return res.status(200).json({ id });
        }
        return res.status(400).json({ message: "Khong tim thay tai khoan hoac sai code check" })
    } catch (error) {
        return res.status(400).send({ message: error });
    }
}

exports.changePass = async(req, res) => {
    try {
        const { password } = req.body;
        const { id } = req.params;
        const hashed = hashPassword(password);
        const Updated = await User.findOneAndUpdate({ _id: id }, { password: hashed }, { new: true },
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
        res.redirect("/login");
    } catch (error) {
        return res.status(400).json(error);
    }
};