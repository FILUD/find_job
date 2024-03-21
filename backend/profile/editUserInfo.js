const express = require("express");
const mysql = require("mysql2/promise");
const { setConfig } = require("../config");

const router = express.Router();
const pool = mysql.createPool(setConfig.pool);

// Profile: Update user information
router.post("/editUserInfo", async (req, res) => {
    try {
        const role = req.body.role;
        const userID = req.body.userID;
        const JobseekerInfo = req.body.JobseekerInfo;

        if (!userID || !role) {
            return res.status(400).send("Missing userID or userRole parameters.");
        }

        let tableName, viewName, insertInfo;

        switch (role) {
            case "Jobseeker":
                tableName = "Jobseeker";
                viewName = "Jobseeker_View";
                insertInfo = JobseekerInfo;
                break;
            case "Employer":
                tableName = "Employer";
                viewName = "Employer_View";
                insertInfo = EmployerInfo; // Ensure it's defined if needed
                break;
            default:
                return res.status(400).send("Invalid role specified.");
        }

        const columns = Object.keys(insertInfo).join(" = ?, ") + " = ?";
        const values = Object.values(insertInfo);
        
        const connection = await pool.getConnection();
        const querycmd = `UPDATE ${tableName} SET ${columns} WHERE JobseekerID = ?`;
        console.log("show query", querycmd);
        const [response] = await connection.query(querycmd, [...values, userID]);
        connection.release();

        let message = "";
        if (!response.affectedRows) {
            message = `${tableName} table data is not updated`;
        } else {
            message = `Successfully updated data in ${tableName}`;
        }

        res.json({ error: false, [tableName]: response, message: message });

    } catch (error) {
        console.error("Error updating user data in the database:", error.message);
        res.status(500).send({ error: true, message: error.message });
    }
});

module.exports = router;
