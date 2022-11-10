module.exports = (mongoose) => {
  //create a mongoose address model

  const Address = new mongoose.model(
    "address",
    mongoose.Schema({
      name: { type: String, require: true },
      contactNumber: { type: String, require: true },
      city: { type: String, require: true },
      state: { type: String, require: true },
      landmark: { type: String },
      street: { type: String, require: true },
      zipCode: { type: String, require: true },
      createdAt: { type: Date },
      updatedAt: { type: Date },
      user: { _id: { type: String } },
    })
  );

  return Address;
};
