const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UserModel = require("./models/users");

const app = express();

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://<UserName>:<Password>@crud.mongodb.net/collection_name?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
});

app.post("/insert", async (req, res) => {
  const user = new UserModel({
    userName: req.body.userName,
    age: req.body.age,
    country: req.body.country,
    position: req.body.position,
    salary: req.body.salary,
  });
  try {
    await user.save();
    res.send("inserted data");
  } catch (error) {
    console.log(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.error("Error reading data from MongoDB", err);
    res.status(500).send("Server error");
  }
});


app.put("/update", async (req, res) => {
  const newUserName = req.body.newUserName;
  const id = req.body.id;
  try {
    const updatedUser = await UserModel.findById(id);
    updatedUser.userName = newUserName;
     await updatedUser.save();
      res.send("updated user");
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
await UserModel.findByIdAndDelete(id).exec();
  res.send('deleted user');
});



app.listen(3001, () => {
  console.log("server running on port 3001");
});
