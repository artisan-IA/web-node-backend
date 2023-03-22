const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  type: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
