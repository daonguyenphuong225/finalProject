const nodemailer = require("nodemailer");
require("dotenv").config();
class CodeCheck {
    constructor(code) {
        this.code = code;
    }
    getCode() {
        return this.code;
    }
    setCode(code) {
        this.code = code;
    }
}

function generateCode() {
    return Math.random().toString().substring(2, 8);
}

function sendEmail(email, codeCheck) {
    let Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.user,
            pass: process.env.pass,
        },
    });
    const mailOptions = {
        from: "Hoang",
        to: email,
        subject: "Email registered successfully",
        html: `<a href=http://localhost:8000/api/${email}/${codeCheck}>click here to complete register</a>`,
    };
    Transport.sendMail(mailOptions, function(err, res) {
        if (err) console.log(err);
        else console.log("Message sent successfully");
    });
}

module.exports = { CodeCheck, generateCode, sendEmail };