const users = require("../users.json");
const fs = require("fs");
const path = require("path");

//get all user data
module.exports.getAllUsers = (req, res) => {
  const limit = req.query.limit;
  if (limit) {
    const randomUsers = [];
    for (i = 0; i < limit; i++) {
      const numberOfuser = users.length;
      const randomNumber = Math.floor(Math.random() * numberOfuser) + 1;
      const randomUser = users.find((user) => user._id === randomNumber);
      const existingUser = randomUsers.find(
        (user) => user._id === randomUser._id
      );
      if (!existingUser) {
        randomUsers.push(randomUser);
      } else {
        i = i - 1;
      }
    }
    // const limitedUser = users.slice(0, limit);
    return res.send(randomUsers);
  }
  res.send(users);
};

//adds a new user
module.exports.saveUser = (req, res) => {
  const newUser = req.body;
  if (
    newUser._id &&
    newUser.gender &&
    newUser.name &&
    newUser.contact &&
    newUser.address &&
    newUser.photoURL
  ) {
    const usersData = fs.readFileSync(path.join(__dirname, "../users.json"));
    const preusers = JSON.parse(usersData);
    const existingUser = preusers.find((user) => user._id === newUser._id);
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    preusers.push(newUser);
    const updatedUsersData = JSON.stringify(preusers, null, 2);
    fs.writeFile(
      path.join(__dirname, "../users.json"),
      updatedUsersData,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error writing to file");
        } else {
          return res.send("User added successfully");
        }
      }
    );
  } else {
    if (!newUser._id) {
      return res.send(`Please Provide User "_id"`);
    } else if (!newUser.gender) {
      return res.send(`Please Provide User "gender"`);
    } else if (!newUser.contact) {
      return res.send(`Please Provide User "contact"`);
    } else if (!newUser.address) {
      return res.send(`Please Provide User "address"`);
    } else if (!newUser.photoURL) {
      return res.send(`Please Provide User "photoURL"`);
    }
  }
};
// get a random user
module.exports.getRandomUser = (req, res) => {
  const numberOfuser = users.length;
  const randomNumber = Math.floor(Math.random() * numberOfuser) + 1;
  const randomUser = users.find((user) => user._id === randomNumber);
  res.send(randomUser);
};
//update single user data
module.exports.updateSingleUser = (req, res) => {
  const userId = req.query.id;
  const userData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../users.json"))
  );
  const userIndex = userData.findIndex((user) => user._id == userId);
  if (userIndex != -1) {
    const updateData = req.body;
    userData[userIndex] = { ...userData[userIndex], ...updateData };
    fs.writeFileSync(
      path.join(__dirname, "../users.json"),
      JSON.stringify(userData)
    ); // Update the file with the updated user data
    res.status(200).send("User updated successfully");
  } else {
    // If the user doesn't exist, return a 404 error
    res.status(404).send("User not found");
  }
};

//update multiple user
module.exports.bulkUpdateUsers = (req, res) => {
  const userIds = req.body.userIds; // Extract the user ids from the request body

  if (!userIds || !Array.isArray(userIds)) {
    // Validate the request body
    res.status(400).send("Invalid request body");
    return;
  }

  // Read the user data from the file
  const userData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../users.json"))
  );
  let exist = true;

  // Update the information for each user with a matching id
  userIds.forEach((userId) => {
    const updateData = req.body[userId]; // Extract the data to update from the request body

    // Find the user with the specified id
    const userIndex = userData.findIndex((user) => user._id === Number(userId));
    console.log(userIndex);

    if (userIndex !== -1) {
      // If the user exists, update their information
      userData[userIndex] = { ...userData[userIndex], ...updateData };
    } else {
      return (exist = false);
    }
  });
  if (exist) {
    fs.writeFileSync(
      path.join(__dirname, "../users.json"),
      JSON.stringify(userData)
    ); // Update the file with the updated user data
    return res.status(200).send("Users updated successfully");
  } else {
    return res.status(404).send("User not found");
  }
};

//delete single user data
module.exports.deleteSingleUser = (req, res) => {
  const userId = req.query.id;
  const exist = users.find((user) => user._id === Number(userId));
  if (exist) {
    const userData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../users.json"))
    );
    // Find the user with the specified id
    const userIndex = userData.findIndex((user) => user.id === Number(userId));
    userData.splice(userIndex, 1);
    fs.writeFileSync(
      path.join(__dirname, "../users.json"),
      JSON.stringify(userData)
    ); // Update the file with the updated user data
    res.status(200).send("User deleted successfully");
  } else {
    res.send("User don't exist");
  }
};
