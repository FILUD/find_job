// const setup = require("./setup/setup")

const router = require("./routes/router")

// const { app, transporter, pool } = setup();

app.use('/', router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});