{
    const cmd = {
        emailSQL: "SELECT * from users WHERE email = ?",
        usernameSQL: "SELECT * from users WHERE username = ?",
        connection: await pool.getConnection(),
        release: connection.release(),
        
    }

    module.exports = { cmd };
}