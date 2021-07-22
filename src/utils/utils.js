const nodemailer = require('nodemailer');

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

async function sendEmail(id, email, codeCheck, mode) {
    let Transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.user,
            pass: process.env.pass,
        },
    });
    let mailOptions = {};
    switch (mode) {
        case 1:
            mailOptions = {
                from: 'Hoang',
                to: email,
                subject: 'Email registered successfully',
                html: `<a href=http://localhost:8000/api/${id}/${email}/${codeCheck}>click here to complete register</a>`,
            };
            await Transport.sendMail(mailOptions, function (err, res) {
                if (err) console.log(err);
                else console.log('Message sent successfully');
            });
            break;
        case 2:
            mailOptions = {
                from: 'Hoang',
                to: email,
                subject: 'Email change password successfully',
                html: `<a href=http://localhost:8000/api/changePass/${id}/${email}/${codeCheck}>click here</a>`,
            };
            await Transport.sendMail(mailOptions, function (err, res) {
                if (err) console.log(err);
                else console.log('Message sent successfully');
            });
            break;
    }
}

module.exports = { CodeCheck, generateCode, sendEmail };
