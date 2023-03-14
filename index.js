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
  res.send(`
  <div style="max-width:500px; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:#fafafa; padding:25px; border:1px solid #cacaca; border-radius:5px;">
  <h1>User Finder server is running</h1>
  <h3>Here is the list of api</h3>
  <ul>
  <li>https://getrandomusers.vercel.app/users/random (GET)</li>
  <li>https://getrandomusers.vercel.app/users/all (GET)</li>
  <li>https://getrandomusers.vercel.app/users/save (POST)</li>
  <li>https://getrandomusers.vercel.app/users/update (PATCH)</li>
  <li> https://getrandomusers.vercel.app/users/bulk-update (PATCH)</li>
  <li>https://getrandomusers.vercel.app/users/delete (DELETE)</li>
  </ul>
  </div>
  `);
});
app.listen(port, () => console.log(`User Finder running on ${port}`));
