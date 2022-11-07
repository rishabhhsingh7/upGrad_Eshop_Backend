module.exports = (mongoose) => {
  //create a user schema
  const User = new mongoose.model(
    "user",
    mongoose.Schema({
      id: { type: Number, require: true, unique: true },
      email: { type: String, unique: true, require: true },
      first_name: { type: String, require: true },
      last_name: { type: String, require: true },
      password: { type: String, require: true },
      role: { type: String, default: "user" },
      contact: { type: String, require: true },
      isLoggedIn: { type: Boolean, default: false },
      createdAt: { type: Date },
      updatedAt: { type: Date },
    })
  );

  return User;
};
