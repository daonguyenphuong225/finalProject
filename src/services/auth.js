const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);

const privateKey = process.env.privateKey;

exports.hashPassword = async (rawPassword) => {
    return await bcrypt.hashSync(rawPassword, salt);
};

exports.comparePassword = async (rawPassword, hashedPassword) => {
    return await bcrypt.compareSync(rawPassword, hashedPassword);
};

exports.generateToken = (user) => {
    const token = jwt.sign(user, privateKey);
    return token;
};
