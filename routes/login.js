const express = require("express");
const RegistrationModel = require("../models/registration-model");
const CryptoJs = require("crypto-js");

const cookieParser = require("cookie-parser");
const { session } = require("passport");
const router = express.Router();

// Saltnyckeln
saltKey = "K12Jno9p643aa";
router.get("/:id",async(req,res)=>{
user=await  RegistrationModel.findById({  _id: req.params.id })
const userDetails = {
    name: user.userName,
    email: user.email,
    age: user.age,
    prenumeration: user.prenumeration
      ? "Jag prenumerear på nyhetsbrevet"
      : "Jag prenumererar inte på nyhetsbrevet"
  };
  res.send(userDetails)
})
router.post("/", async (req, res) => {
  const login = req.body;
  await RegistrationModel.findOne({ userName: login.userName }).then((user) => {
    userPass = CryptoJs.AES.decrypt(user.password, saltKey).toString(
      CryptoJs.enc.Utf8
    );
    console.log(login.password);
    console.log(userPass);
    if (!user || userPass !== login.password) {
      res.json("Det är antingen användarnamn eller lösenord som är fel");
    } else {
      const userDetails = {
        ID: user._id,
      };
      
      res.status(201).json(userDetails);
    }
  });
});
module.exports = router;
