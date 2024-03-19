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

        const hashedPassword = await bcrypt.hash(password, 10);
        // const Role = "Employer";
        const connection = await pool.getConnection();
        await connection.execute(
            "INSERT INTO UserData (Email, Password) VALUES (?, ?)",
            [email, hashedPassword],
        );
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