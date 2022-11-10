const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const { btoa } = require("b2a");
//getting the express app
const app = require("../app");
//importing the db object and making connection
const db = require("../models");

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

var accessToken = "";

describe("Testing CRUD Apis for upGrad-E-Shop", () => {
  //testing out the user related apis
  describe("Testing /auth Apis", () => {
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
        });
      done();
    });
  });

  //Testing POST /address api
  describe("Testing the POST /address  api", () => {
    it("it should not post the given address to db when hitting POST /api/address endpoint", (done) => {
      console.log(accessToken);
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
        });
      done();
    });
  });
});
