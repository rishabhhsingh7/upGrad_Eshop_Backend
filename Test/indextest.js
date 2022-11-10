const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const { btoa } = require("b2a");
//getting the express app
const app = require("../app");
//importing the db object and making connection
const db = require("../models");
//importig the midlleware
const { generateAccessToken } = require("../middleware/auth");

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

chai.should();
chai.use(chaiHttp);

describe("Testing CRUD Apis for upGrad-E-Shop", () => {
  //testing out the user related apis
  describe("TESTING /AUTH API", () => {
    //testing the / api just for testing sake
    it("It should get status status OK when hitting /", (done) => {
      chai
        .request(app)
        .get("/")
        .send()
        .end((err, res) => {
          expect(err).to.be.a("null");
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          done();
        });
    });

    //testing /api/auth/signup api
    it("It should insert user to db on hitting /api/auth/signup endpoint", (done) => {
      //first delete the existing user before inserting
      const Users = db.users;
      Users.findOneAndDelete({ email: "ishwar.soni@upgrad.com" }).then(() => {
        chai
          .request(app)
          .post("/api/auth/signup")
          .send({
            email: "ishwar.soni@upgrad.com",
            password: "password",
            first_name: "ishwar",
            last_name: "soni",
            contactNumber: "1234567890",
          })
          .end((err, res) => {
            expect(err).to.be.a("null");
            expect(res).to.have.status(200);
            expect(res.body).to.be.a("object");
            done();
          });
      });
    });

    //testing login /api/auth/login
    it("It should log in the user when we hit POST /api/auth/login endpoint", (done) => {
      chai
        .request(app)
        .post("/api/auth/login")
        .send({
          email: "ishwar.soni@upgrad.com",
          password: btoa("password"),
        })
        .end((err, res) => {
          expect(err).to.be.a("null");
          expect(res).to.have.header("x-auth-token");
          expect(res.header["x-auth-token"]).to.be.a("String");
          expect(res.body).to.be.a("object");
          done();
        });
    });
  });

  //Testing POST /address api
  //This api requires authentication
  describe("TESTING POST /ADDRESS API", () => {
    it("it should get status code 401 unauthorized when hitting POST /api/address endpoint", (done) => {
      var accessToken = "";
      chai
        .request(app)
        .post("/api/address")
        //please give your own authorization key while testing by loggin first
        .set("Authorization", "Bearer " + accessToken)
        .send({
          name: "ishwar soni",
          city: "Kolkata",
          state: "West Bengal",
          street: "503-2",
          contactNumber: "1234567890",
          landmark: "",
          zipCode: "700106",
        })
        .end((err, res) => {
          expect(err).to.be.a("null");
          expect(res).to.have.status(401);
          expect(res.body).to.be.a("object");
          done();
        });
    });

    it("it should post the given address to db when hitting POST /api/address endpoint", (done) => {
      //generate an access token first to test this api
      const user = {
        _id: "616ea05bc11369629f080889",
        email: "ishwar.soni@upgrad.com",
        first_name: "ishwar",
        last_name: "soni",
        password:
          "$2b$10$MjrX1uExkrn3I.7VtyjOPefb9aJuIEH4cRgviyeCgk9LhQU8O3wBK",
        role: "admin",
        contact: "1234567890",
        createdAt: "2021-10-18T14:20:03.556Z",
        updatedAt: "2021-10-18T14:20:03.556Z",
        __v: 0,
      };

      //pass the user as payload to generate the token
      var token = generateAccessToken(user);

      chai
        .request(app)
        .post("/api/address")
        //please give your own authorization key while testing by loggin first
        .set("Authorization", "Bearer " + token)
        .send({
          name: "ishwar soni",
          city: "Kolkata",
          state: "West Bengal",
          street: "503-2",
          contactNumber: "1234567890",
          landmark: "",
          zipCode: "700106",
        })
        .end((err, res) => {
          expect(err).to.be.a("null");
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          done();
        });
    });
  });

  //Testing all /products apis

  describe("TESTING /PRODUCTS APIS", () => {
    //testing GET /products api
    //this api does not require authentication and authorization
    it("It should Get all products when hitting /api/products endpoint", (done) => {
      chai
        .request(app)
        .get("/api/products")
        .end((err, response) => {
          expect(err).be.a("null");
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

    //Testing GET /products/:id api
    //this api does not require authentication and authorization
    //Please provide valid product id
    it("it should get product with given product id when hitting /api/products/:id", (done) => {
      chai
        .request(app)
        .get(
          "/api/products/" +
            /**ENTER ANY PRODUCT ID HERE label by _id */ "6176ba80428592359c6255cf"
        )
        .end((err, response) => {
          expect(err).to.be.a("null");
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

    //Testing GET /products/categories api
    //this api does not require authentication and authorization
    it("It should get the list of categories when hitting /api/products/categories", () => {
      chai
        .request(app)
        .get("/api/products/categories")
        .end((err, response) => {
          expect(err).to.be.a("null");
          response.should.have.status(200);
        });
    });

    //generate an access-token first to test the rest of the apis
    const user = {
      _id: "616ea05bc11369629f080889",
      email: "ishwar.soni@upgrad.com",
      first_name: "ishwar",
      last_name: "soni",
      password: "$2b$10$MjrX1uExkrn3I.7VtyjOPefb9aJuIEH4cRgviyeCgk9LhQU8O3wBK",
      role: "admin",
      contact: "1234567890",
      createdAt: "2021-10-18T14:20:03.556Z",
      updatedAt: "2021-10-18T14:20:03.556Z",
      __v: 0,
    };

    //pass the user as payload to generate the token
    var token = generateAccessToken(user);

    //define the database products
    const Products = db.products;

    //testing POST /products api
    //This api requires authentication and admin authrization
    it("It should get status 200 OK when hitting POST /api/products", (done) => {
      //this data is just dummy data
      let data = {
        name: "Drone",
        category: "Electronics",
        manufacturer: "Electronics Corp",
        availableItems: 20,
        price: 20000,
        imageURL: "",
        description:
          "This Drone is very efficient and can last very long with better battery technology and at a fair price",
      };

      chai
        .request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${token}`)
        .send(data)
        .end((err, response) => {
          expect(err).to.be.a("null");
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });

    //Testing PUT /products/:id api
    //lets insert some dummy data before actually testing this api just to initialize the _id
    //create a new Product object
    var data = Products({
      productId: Math.floor(Math.random() * 1000000),
      name: "ProductName",
      category: "Electronics",
      manufacturer: "Electronics Corp",
      availableItems: 10,
      price: 20000,
      imageURL: "",
      description: "This is the initial description",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    data.save();

    //This api requires authentication and admin authrization
    it("It should get status 200 OK when hitting PUT /api/products/:id", (done) => {
      //updated data
      var updatedData = {
        name: "ProductName",
        category: "Electronics",
        manufacturer: "Electronics Corp",
        availableItems: 20,
        price: 21000,
        imageURL: "",
        description: "This is the updated description",
      };

      chai
        .request(app)
        .put("/api/products/" + data._id)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedData)
        .end((err, response) => {
          expect(err).to.be.be.a("null");
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });

    //Testing DELETE /products/:id
    //This api requires authentication and admin authrization
    it("It should get status 200 OK when hitting DELETE /api/products/:id", (done) => {
      chai
        .request(app)
        .delete("/api/products/" + data._id)
        .set("Authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(err).to.be.a("null");
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.message.should.be.eql(
            `Product with ID - ${data._id} deleted successfully!`
          );
          done();
        });
    });
  });

  //This api requires authentication
  describe("TESTING POST /api/orders ENDPOINT", () => {
    //generate an access-token first to test the rest of the apis
    const user = {
      _id: "616ea05bc11369629f080889",
      email: "ishwar.soni@upgrad.com",
      first_name: "ishwar",
      last_name: "soni",
      password: "$2b$10$MjrX1uExkrn3I.7VtyjOPefb9aJuIEH4cRgviyeCgk9LhQU8O3wBK",
      role: "admin",
      contact: "1234567890",
      createdAt: "2021-10-18T14:20:03.556Z",
      updatedAt: "2021-10-18T14:20:03.556Z",
      __v: 0,
    };

    //pass the user as payload to generate the token
    var token = generateAccessToken(user);

    it("It should get Status 200 and place order in db when hitting POST /api/orders endpoint", (done) => {
      chai
        .request(app)
        .post("/api/orders")
        .set("Authorization", `Bearer ${token}`)
        /*****PLEASE ENSURE TO ENTER A id by the field name productId not the _id****/
        /**the addressId is the _id field of the address document*/
        .send({
          productId: "6176ba80428592359c6255cf",
          addressId: "61705c06d5d46bbaef1182bd",
          quantity: 1,
        })
        .end((err, response) => {
          expect(err).to.be.a("null");
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
  });
});
