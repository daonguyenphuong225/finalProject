const { User } = require('../model');

const {
    hashPassword,
    comparePassword,
    generateToken,
} = require('../services/auth');
const { generateCode, sendEmail } = require('../utils/utils');
const { CodeCheck } = require('../utils/utils');
let codeCheck = new CodeCheck();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.addUserProject = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findOne({ _id: userId });
        user.addProject(req.params.idProject);
        return user;
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res
                .status(400)
                .json({ status: 'user hoặc password không thấy' });
        }
        if (!user.email)
            return res
                .status(400)
                .json({ status: 'Tài khoản chưa kích hoạt email' });
        const matchPassword = await comparePassword(password, user.password);
        if (!matchPassword) {
            return res
                .status(400)
                .json({ status: 'user hoặc password không thấy' });
        } else {
            req.session.userId = user._id;
            req.session.token = user.token;
            return res.status(200).json({
                message: 'Dang nhap thanh cong',
                id: user._id,
                username: username,
                token: user.token,
            });
        }
    } catch (error) {
        return res.status(400).json(err);
    }
};

exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const alreadyExistsUser = await User.findOne({ username });

        if (alreadyExistsUser)
            return res.status(400).json({ status: 'username đã tồn tại' });
        const alreadyExistsEmail = await User.findOne({ email });
        if (alreadyExistsEmail)
            return res.status(400).json({ status: 'email da ton tai' });
        const hashed = await hashPassword(password);
        const token = generateToken({ username });
        const newUser = await User.create({
            username,
            password: hashed,
            token: token,
        });

        //send mail
        codeCheck.setCode(generateCode());
        await sendEmail(newUser._id, email, codeCheck.getCode(), 1);
        newUser.code = codeCheck.getCode();
        await newUser.save();
        res.status(200).json({ message: 'Check email' });
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.params;
        if (code == codeCheck.getCode()) {
            const user = await User.findOne({ code }).catch((err) => {
                console.log(err);
            });
            user.email = email;
            user.code = null;
            await user.save();

            return res.status(200).send('Dang ky thanh cong');
        }
    } catch (e) {
        return res.status(400).send({ message: e });
    }
};

exports.changePass = async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ status: 'Khong tim thay' });
        }
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const matchPassword = await comparePassword(oldPassword, user.password);
        if (!matchPassword)
            return res.status(400).json({ status: 'mật khẩu cũ không đúng' });

        if (newPassword != confirmPassword)
            return res
                .status(400)
                .json({ status: 'Xác nhận lại mật khẩu mới' });

        const hashed = await hashPassword(newPassword);
        user.password = hashed;
        await user.save();
        return res.status(200).json({ message: 'Thanh cong' });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};

exports.mailForgot = async (req, res) => {
    try {
        const email = req.body.email;
        const existsEmail = await User.findOne({ email: email });
        if (!existsEmail)
            return res.status(400).json({ status: 'Không tồn tại email' });
        let Transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.user,
                pass: process.env.pass,
            },
        });

        const token = generateToken(email);
        let mailOptions = {};
        mailOptions = {
            from: 'Hoang',
            to: email,
            subject: 'Email forgot password successfully',
            html: `<a href="http://localhost:8000/api/renew?token=${token}">click here to complete changepass</a>`,
        };
        Transport.sendMail(mailOptions, function (err, data) {
            if (err) console.log(err);
            else {
                console.log('Message sent successfully');
                return res.status(200).json({ message: 'check mail' });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: error });
    }
};

exports.changeForgotPass = async (req, res) => {
    try {
        const { token, password } = req.body;
        const result = await jwt.verify(token, process.env.privateKey);
        const hashed = await hashPassword(password);
        const forgotUser = await User.findOneAndUpdate(
            { email: result },
            { password: hashed }
        );
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: error });
    }
};

exports.logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) return res.status(400).json({ message: err });
            res.redirect('/login');
        });
    } catch (error) {
        return res.status(400).json(error);
    }
};
