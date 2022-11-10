const { Double } = require("bson");

module.exports = (mongoose) => {
  //create the product models
  const Product = new mongoose.model(
    "product",
    mongoose.Schema({
      productId: Number,
      name: { type: String, require: true },
      category: { type: String, require: true },
      manufacturer: { type: String, require: true },
      availableItems: { type: Number, require: true },
      price: { type: Number, require: true },
      imageURL: { type: String },
      description: { type: String },
      updatedAt: Date,
      createdAt: Date,
    })
  );

  return Product;
};

/********************************SAMPLE PRODUCT DATA TO BE INSERTED TO DATA BASE****************************************************************************
[{
  "_id": {
    "$oid": "616eb82710b11396f8a184e6"
  },
  "productId": 12694406,
  "name": "EMERGO RUNNER Running Shoes ",
  "category": "Apparel",
  "manufacturer": "Reebok",
  "availableItems": 98,
  "price": 1500,
  "imageURL": "https://rukminim1.flixcart.com/image/800/960/knxiavk0/shoe/a/r/b/6-hkz70-7-reebok-smoky-indigo-vector-original-imag2hwk8h5xq6a3.jpeg?q=50",
  "description": "Unique new design with an amalgamation of PU and textile mesh. PU at the rearfoot for motion and protection. Full EVA outsole responsible for traction and responsiveness.",
  "updatedAt": {
    "$date": "2021-10-19T12:20:55.284Z"
  },
  "createdAt": {
    "$date": "2021-10-19T12:20:55.284Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "616eb84010b11396f8a184e8"
  },
  "productId": 71972036,
  "name": "boAt Airdopes 131",
  "category": "Electronics",
  "manufacturer": "Boat",
  "availableItems": 96,
  "price": 1299,
  "imageURL": "https://rukminim1.flixcart.com/image/416/416/kmccosw0/headphone/g/7/j/airdopes-131-boat-original-imagf9n3rhpwq252.jpeg?q=70",
  "description": "Bring home the boAt Airdopes 131 that comes with a carrying case. ",
  "updatedAt": {
    "$date": "2021-10-19T12:21:20.074Z"
  },
  "createdAt": {
    "$date": "2021-10-19T12:21:20.074Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "616eb85a10b11396f8a184ea"
  },
  "productId": 85481488,
  "name": "Lifebuoy Hand Sanitizer",
  "category": "Personal Care",
  "manufacturer": "HUL",
  "availableItems": 1200,
  "price": 120,
  "imageURL": "https://5.imimg.com/data5/SELLER/Default/2020/8/IV/VS/ND/30769763/lifebuoy-240-ml-sanitizer-500x500.jpg",
  "description": " It instantly kills 99.9% bacteria and viruses. Can be used as often as required and works without any water",
  "updatedAt": {
    "$date": "2021-10-19T12:21:46.823Z"
  },
  "createdAt": {
    "$date": "2021-10-19T12:21:46.823Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "616eb87b10b11396f8a184ec"
  },
  "productId": 67092918,
  "name": "iPhone 12",
  "category": "Electronics",
  "manufacturer": "Apple",
  "availableItems": 148,
  "price": 100000,
  "imageURL": "https://www.reliancedigital.in/medias/Apple-12-Smartphones-491901533-i-1-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxMTMwMTd8aW1hZ2UvanBlZ3xpbWFnZXMvaDM2L2g1OC85NDA3NzMxMTcxMzU4LmpwZ3w5NjBiYTIzZWE1Yjg5NjQzN2YyZTAxZjNhNGI2ODg0YzQ4NmZlMDZiN2EwYmVkYjlhZjA3OGIxNDZiNDEzNTc0",
  "description": "A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display.",
  "updatedAt": {
    "$date": "2021-10-19T12:22:19.246Z"
  },
  "createdAt": {
    "$date": "2021-10-19T12:22:19.246Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "616eb89710b11396f8a184ee"
  },
  "productId": 38583632,
  "name": "Levi Strauss Jeans",
  "category": "Apparel",
  "manufacturer": "Levis",
  "availableItems": 8,
  "price": 1000,
  "imageURL": "https://storage.sg.content-cdn.io/cdn-cgi/image/width=600,height=800,quality=60,format=auto,fit=cover,g=top/in-resources/22a79ec5-e694-4d7a-ac5a-85c8fa45b7f1/Images/ProductImages/Source/ITMDN00486Dark%20Wash_1nw.Jpg",
  "description": "slim fit stretch jeans offers comfort with style. Made with high-quality material of cotton lycra and superior stitching for excellent fit, comfort and a stylish look.",
  "updatedAt": {
    "$date": "2021-10-19T12:22:47.895Z"
  },
  "createdAt": {
    "$date": "2021-10-19T12:22:47.895Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "616fe94b37a11f191c08b7b9"
  },
  "productId": 2700420,
  "name": "Comfortable Chair",
  "category": "Furniture",
  "manufacturer": "Nilkamal",
  "availableItems": 10,
  "price": 10000,
  "imageURL": "",
  "description": "",
  "updatedAt": {
    "$date": "2021-10-20T10:02:51.742Z"
  },
  "createdAt": {
    "$date": "2021-10-20T10:02:51.742Z"
  },
  "__v": 0
}]
 **************************************************************************************************************************************************/
