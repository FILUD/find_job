const express = require("express");
const mysql = require("mysql2/promise");
const { setConfig } = require("./config");
const { passport, initializePassport } = require("./authentication/auth");
const signUpRouter = require("./authentication/register");
const sendOtpRouter = require("./authentication/sendOtp");
const userInfoRouter = require("./profile/userInfo");
const editInfoRouter = require("./profile/editUserInfo");


// Initialize Passport
initializePassport();

const router = express.Router();
const pool = mysql.createPool(setConfig.pool);

//Authentication: Log in
router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/sendMessage",
        failureRedirect: "/login",
        failureFlash: true,
    }),
);
router.get("/sendMessage", async (req, res) => {
    try {

        res.status(200).send("log in successful");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering user.");
    }
});
//Authentication: register
router.use("/", signUpRouter);

//Authentication: sendOTP
router.use("/", sendOtpRouter);


//Profile: User information (select , update )
router.use("/", userInfoRouter);
router.use("/", editInfoRouter);



router.get("/test1", async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query(`SELECT * FROM UserData`);
        connection.release();
        let message = "";
        if (!results.length) {
            message = "User table data is null";
        } else {
            message = "Successfully select all users";
        }
        res.json({ error: false, Jobseeker: results, message: message });
    } catch (error) {
        console.error("Error fetching data from the database:", error.message);
        res.status(500).send({ error: true, message: error.message });
    }
});

module.exports = router;

