const express = require("express");
const router = express.Router();
const RegistrationModel = require("../models/registration-model");
const CryptoJs = require("crypto-js");
// Salt nyckeln
saltKey = "K12Jno9p643aa";

router.post("/", async (req, res) => {
  const registration = new RegistrationModel(req.body);
  registration.password = CryptoJs.AES.encrypt(
    registration.password,
    saltKey
  ).toString();
  await registration.save();
  res.status(201).json(registration);
});

// För ändring av prenumeration status
router.put("/", async (req, res) => {
  const { _id } = req.body;
  const registration = await RegistrationModel.findById({ _id });
  registration.prenumeration = !registration.prenumeration;
  await registration.save();

  res.status(200).json(registration);
});
// Om man vill kunna ta bort registreringen helt
router.delete("/:id", async (req, res) => {
  await RegistrationModel.findByIdAndDelete({ _id: req.params.id });
  res.status(200).json("Registration successfully removed");
});

module.exports = router;
