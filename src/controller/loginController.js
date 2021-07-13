const { User } = require('../model');

const {
    hashPassword,
    comparePassword,
    generateToken,
} = require('../services/auth');
const { generateCode, sendEmail } = require('../utils/utils');
const { CodeCheck} = require('../utils/utils');
let codeCheck = new CodeCheck();
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
        }
        else{
            const token = generateToken({ username });
            req.session.userId = user._id;
            req.session.token = token;
            return res.status(200).json({
                message: 'Dang nhap thanh cong',
                id: user._id,
                username: username,
                token,
            });
        }
        
        
    } catch (error) {
        return res.status(400).json(err);
    }
};

exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const alreadyExistsUser = await User.findOne({ username }).catch(
            (err) => {
                console.log('Error: ', err);
            }
        );

        if (alreadyExistsUser)
            return res.status(400).json({ status: 'username đã tồn tại' });

        const hashed = await hashPassword(password);
        const newUser = await User.create({ username, password: hashed });

        //send mail
        codeCheck.setCode(generateCode());
        sendEmail(newUser._id, email, codeCheck.getCode(), 1);
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
//gui mail
exports.mailtoChangePass = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findOne({ _id: id }).catch((err) => {
            console.log(err);
        });
        if (!user) return res.status(400).json({ message: 'Loi' });
        const email = user.email;
        codeCheck.setCode(generateCode());
        sendEmail(id, email, codeCheck.getCode(), 2);
        user.code = codeCheck.getCode();
        await user.save();
        
        console.log(user.code);
        return res.status(200).json({ message: 'Kiem tra mail de doi pass' });
    } catch (error) {
        return res.status(400).send({ message: error });
    }
};
//xac nhan mail
exports.verifyEmailToChangePassword = async (req, res, next) => {
    try {
        const { id, code } = req.params;
        const user = await User.findOne({ _id: id }).catch((err) => {
            console.log(err);
        });
        console.log(user);
        console.log(user.code);
        if (user && user.code == code) {
            return res.status(200).redirect(
                `/api/formchangepass/${id}`
            );
            
        }
        return res.send('Khong tim thay tai khoan hoac sai code check');
    } catch (error) {
        return res.send(error);
    }
};
//doi pass
exports.changePass = async (req, res) => {
    try {
        
        const userId=req.params.id;
        console.log(userId);
        const user=await User.findById(userId);
        if(!user) {
            return res.status(400).json({message:"Khong tim thay"})
        }
        const password = await req.body;
        console.log("Debug password",password);
        console.log("Debug password",password.toString());
        const hashed = await hashPassword(password.toString());
       
        console.log('hashPassword',hashed)
        
        user.password = hashed;
        await user.save();
        return res.status(200).send('Thanh cong');
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
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
