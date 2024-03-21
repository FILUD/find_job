const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const { setConfig } = require("../config");
const router = express.Router();

const pool = mysql.createPool(setConfig.pool);

//register : check account that exist or not
const checkAccount = async (email) => {
    try {
        const connection = await pool.getConnection();
        const [existingUsers] = await connection.execute(
            "SELECT * FROM UserData WHERE Email = ?",
            [email],
        );
        connection.release();

        return existingUsers.length > 0;
    } catch (error) {
        console.error(error);
        throw new Error("Error checking account.");
    }
};
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const role = "Jobseeker"; // Assuming the role is specified in the request or determined elsewhere
        const name = "george";    // Assuming the name is specified in the request or determined elsewhere

        const hashedPassword = await bcrypt.hash(password, 10);

        const connection = await pool.getConnection();
        await connection.beginTransaction(); // Start a transaction

        // Insert user data into the UserData table
        await connection.execute(
            "INSERT INTO UserData (Email, Password, Role) VALUES (?, ? , ?)",
            [email, hashedPassword, role]
        );

        // Retrieve the auto-generated UserID
        const [userDataResult] = await connection.query("SELECT LAST_INSERT_ID() as userID");

        const userID = userDataResult[0].userID;

        // Insert user information into the appropriate table based on the role
        if (role === "Jobseeker") {
            await connection.execute(
                "INSERT INTO Jobseeker (UserID, JobseekerName) VALUES (?, ?)",
                [userID, name]
            );
        } else if (role === "Employer") {
            await connection.execute(
                "INSERT INTO Employer (UserID, CompanyName) VALUES (?, ?)",
                [userID, name]
            );
        }

        await connection.commit(); // Commit the transaction
        connection.release();

        res.status(201).send("User registered successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering user.");
    }
});


router.post("/existUser", async (req, res) => {
    try {
        const { email } = req.body;
        console.log('show email that gonna check exist: ', email)
        const accountExists = await checkAccount(email);
        if (accountExists) {
            return res.status(400).send("Email already exists.");
        }
        res.status(201).send("User didnt't register.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering user.");
    }
});
module.exports = router;