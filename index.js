const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/user.routes");

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

app.get("/", async (req, res) => {
  res.send("User Finder server is running");
});
app.listen(port, () => console.log(`User Finder running on ${port}`));
