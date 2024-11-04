import axios from 'axios';

// const textbelt = process.env.TEXTBELT;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

const sendSmsOtp = async (phoneNumber, otp) => {
    try {
        const response = await axios.post(
            'https://www.fast2sms.com/dev/bulkV2',
            {
                route: 'otp',
                sender_id: 'TXTIND',  // Set your desired sender ID
                message: `Your Phone Number Verification OTP is: ${otp}`,
                language: 'english',
                numbers: phoneNumber,
            },
            {
                headers: {
                    'authorization': process.env.FAST2SMS_API_KEY,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.data.return) {
            console.log("SMS sent successfully");
        } else {
            console.error("Failed to send SMS:", response.data.message);
        }
    } catch (error) {
        console.error("Error sending SMS:", error.message);
    }
};

export {
    sendSmsOtp,
}