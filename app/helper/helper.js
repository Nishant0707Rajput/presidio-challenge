
const nodemailer = require('nodemailer');
const { env } = require('../constant/environment');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
    },
});

exports.sendMail = async (messageText) => {
    try {
        const result = await transporter.sendMail({
            from: env.EMAIL_USER,
            to: env.EMAIL_TO,
            subject: 'New request on portfolio server',
            html: messageText,
        });
        if(result.accepted.length > 0 ) return true;
        return false;
    } catch (err) {
        console.log("Error in sending mail",err);
        return false;
    }
}



