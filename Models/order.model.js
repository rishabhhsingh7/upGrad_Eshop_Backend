module.exports = mongoose=>{

  //define Orders model
  const Order = new mongoose.model(
      "order",
      mongoose.Schema({
          userId: {type: String, require: true},
          productId: {type: String, require: true},
          addressId: {type: String, require: true},
          amount: {type:Number, require: true},
          orderDate: Date,
      })
  );
  //return the model
  return Order;
}