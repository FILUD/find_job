const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const { setConfig } = require("../config");
const router = express.Router();


// Initialize MySQL pool
const pool = mysql.createPool(setConfig.pool);

//login IntializePassport
const initializePassport = () => {
    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                try {
                    const connection = await pool.getConnection();
                    const [rows] = await connection.execute(
                        "SELECT * FROM UserData WHERE Email = ?",
                        [email],
                    );
                    connection.release();

                    if (!rows.length) {
                        return done(null, false, { message: "Incorrect email." });
                    }
                    const user = rows[0];
                    const passwordMatch = await bcrypt.compare(password, user.Password);

                    if (!passwordMatch) {
                        return done(null, false, { message: "Incorrect password." });
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            },
        ),
    );

    passport.serializeUser((user, done) => {
        done(null, user.UserID);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.execute(
                "SELECT * FROM UserData WHERE UserID = ?",
                [id],
            );
            connection.release();

            if (!rows.length) {
                return done(new Error("User not found."));
            }

            const user = rows[0];

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    });
};


module.exports = {
    router,
    passport,
    initializePassport, 
};


