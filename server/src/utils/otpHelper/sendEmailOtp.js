import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_EMAIL_PASSWORD
    }
});
// console.log(process.env.MY_EMAIL);
// console.log(process.env.MY_EMAIL_PASSWORD)
const sendEmailOtp = async (email, otp) => {
    try {
        await transporter.sendMail({
            
            from: process.env.MY_EMAIL,
            to: email,
            subject: 'Your Email Verification OTP',
            text: `Your OTP is: ${otp}`
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};

export {
    sendEmailOtp,
}