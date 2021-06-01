const { User } = require("../model");
const bcrypt = require("bcryptjs");

const {
    hashPassword,
    comparePassword,
    generateToken,
} = require("../services/auth");

exports.login = async({ username, password }) => {
    try {
        console.log(username, password);
        const user = await User.findOne({ username });
        if (!user) throw new Error("Not found user");

        const matchPassword = comparePassword(password, user.password);
        if (!matchPassword) {
            throw new Error("Incorrect password");
        }

        const token = generateToken({ username });

        return { message: "Dang nhap thanh cong", token };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.register = async({ username, password }) => {
    try {
        const alreadyExistsUser = await User.findOne({ username }).catch(
            (err) => {
                console.log("Error: ", err);
            }
        );
        if (alreadyExistsUser)
            return { message: "User with username already exists!" };
        const hased = hashPassword(password);
        const newUser = await User.create({ username, password: hased });

        return { message: "Tao tai khoan thanh cong" };
    } catch (err) {
        return err;
    }
};
exports.change = async({ username, password }) => {
    try {
        const hased = hashPassword(password);
        const Updated = await User.findOneAndUpdate({ username }, { password: hased }, { upsert: true, new: true },
            (err, result) => {
                if (err) return { message: err };
                else return { message: result };
            }
        ).exec();
    } catch (error) {}
};