const express = require("express");
const mysql = require("mysql2/promise");
const { setConfig } = require("../config");
const router = express.Router();
const pool = mysql.createPool(setConfig.pool);

// Profile: User information
router.get("/userInfo", async (req, res) => {
    try {
        // const role = req.body.role;
        // const userID = req.body.userID; 
        const role = req.query.role;
        const userID = req.query.userID;
        console.log("show data role :", role);
        console.log("show data userID:", userID);
        
        if (!userID || !role) {
            return res.status(400).send("Missing userID or userRole parameters.");
        }

        let tableName, viewName;

        switch (role) {
            case "Jobseeker":
                tableName = "Jobseeker";
                viewName = "Jobseeker_view";
                break;
            case "Employer":
                tableName = "Employer";
                viewName = "Employer_view";
                break;
            default:
                return res.status(400).send("Invalid role specified.");
        }

        const connection = await pool.getConnection();
        const [response] = await connection.query(`SELECT * FROM ${viewName} WHERE UserID = ?`, [userID]);
        connection.release();

        let message = "";
        if (!response.length) {
            message = `${tableName} table data is null`;
        } else {
            message = `Successfully select all ${tableName}s`;
        }

        res.json({ error: false, [tableName]: response, message: message });

    } catch (error) {
        console.error("Error fetching user data from the database:", error.message);
        res.status(500).send({ error: true, message: error.message });
    }
});


module.exports = router;
