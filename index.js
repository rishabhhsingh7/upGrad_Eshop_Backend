//import the express app from app.js
const app = require("./app");

//create a mongoose object and conncted to it
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//deining the port to be used is 8000
const port = 8000;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
