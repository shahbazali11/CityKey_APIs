const express = require("express");
require("./config");

const register = require("./Signup");
const Login = require("./Login");

const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const tokenKey = "e-comm";

app.use(express.json());
app.use(cors());

app.post("/signup", async (requ, resp) => {
  console.log(requ.body);
  let data = new register(requ.body);
  let result = await data.save();
  result = result.toObject();
  delete result.password;
  delete result.confirmPassword;
  jwt.sign({ result }, tokenKey, { expiresIn: "2h" }, (error, token) => {
    if (error) {
      resp.send({ result: "Something went wrong" });
    }
    resp.send({ result, token: token });
  });
  console.log(result);
});

app.post("/login", async (requ, resp) => {
  console.log(requ.body);
  const { email, password } = requ.body;
  if (password && email) {
    let result = await register.findOne(requ.body).select("password");
    if (result) {
      jwt.sign({ result }, tokenKey, { expiresIn: "2h" }, (error, token) => {
        if (error) {
          resp.send({ result: "Something went wrong" });
        }
        resp.send({ result, token: token });
      });
    } else {
      resp.send({ result: "No User Found" });
    }
  } else {
    resp.send({ result: "No User Found" });
  }
});

app.listen(4500);
