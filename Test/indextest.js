const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const { btoa } = require("b2a");
const app = require("../index.js");

chai.should();
chai.use(chaiHttp);

describe("Testing CRUD Apis for upGrad-E-Shop", () => {
  //testing out the user related apis
  describe("Testing Auth Apis", () => {
    //testing the / api
    it("It should get status status OK when hitting /", (done) => {
      chai
        .request(app)
        .get("/")
        .send()
        .end((err, res) => {
          expect(err).to.be.a("null");
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
        });
      done();
    });

    //testing /api/auth/signup api
    it("It should insert user to db on hitting /api/auth/signup", (done) => {
      chai
        .request(app)
        .post("/api/auth/signup")
        .send({
          password: "password",
          first_name: "ishwar",
          last_name: "soni",
          email: "ishwar.soni@upgrad.com",
          contactNumber: 1234567890,
        })
        .end((err, res) => {
          expect(err).to.be.a("null");
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
        });
      done();
    });

    //testing login /api/auth/login
    it("It should login when we hit POST /api/auth/login", (done) => {
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
});
