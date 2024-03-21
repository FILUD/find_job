const express = require("express");
const nodemailer = require("nodemailer");
const { setConfig } = require("../config");
const router = express.Router();


//send OTP
const storedOTPs = [];

const transporter = nodemailer.createTransport(setConfig.nodemailer);

router.post("/sendOTP", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send("User not authenticated or email not found.");
        }

        const generatedOTP = Math.floor(1000 + Math.random() * 9000);
        storedOTPs[email] = generatedOTP;
        console.log(`Generated OTP for ${email}: ${generatedOTP}`);
        const mailOptions = {
            from: "sms.findjob.web@gmail.com",
            to: email,
            subject: "Your OTP for Verification",
            html: `<p>Thank you for starting the find job website. Please enter the following verification code when prompted. If you don't want to create an account, you can ignore this message. Thank you.</p> \n\n <h2 style="text-align: center;">Verification code: ${generatedOTP}</h2>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending OTP:", error);
                return res.status(500).send("Error sending OTP.");
            } else {
                console.log("Email sent: " + info.response);
                res.header("Access-Control-Allow-Origin", "http://localhost:3000");
                return res.status(200).send("OTP has been sent to your email.");
            }
        });
    } catch (err) {
        console.error("Error in sending OTP:", err);
        return res.status(500).send("Error sending OTP.");
    }
});

router.post("/verifyOTP", async (req, res) => {
    const { email, enteredOTP } = req.body;

    const storedOTP = `${storedOTPs[email]}`;

    console.log(`your verify OTP for ${enteredOTP}`);
    console.log(`storedOTP ${email}: ${storedOTPs[email]}`);
    if (!storedOTP) {
        return res.status(400).send("No OTP found for this user.");
    }

    if (enteredOTP === storedOTP) {
        res.status(200).send("OTP verified successfully!");
        delete storedOTPs[email];
    } else {
        res.status(400).send("Invalid OTP. Please retry");
    }
});

module.exports = router;
