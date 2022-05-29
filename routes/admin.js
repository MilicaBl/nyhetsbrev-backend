const express = require("express");
const router = express.Router();
const RegistrationModel = require("../models/registration-model");

router.get("/", async function (req, res, next) {
  try {
    //  Alla användare
    const users = (await RegistrationModel.find())
      .map(
        (user) =>
          `
            <div>
                <h3>Namn: ${user.userName}</h3>
                <p>ID: ${user._id}</p>
                <p>Email: ${user.email}</p>
                <p>Ålder: ${user.age}</p>
                <p>Prenummerear: ${user.prenumeration ? "Ja" : "Nej"}</p>
            </div>`
      )
      .join("");

    const preUsers = await RegistrationModel.find({ prenumeration: true });
    // Endast lista på prenumeranter
    const preEmails = preUsers
      .map((user) => `<p>email: ${user.email}</p>`)
      .join("");
    const userHtml = `<h1>Alla våra medlemar: </h1>`;
    const emailHtml = `<h2>Alla email från våra prenumeranter:</h2>`;
    res.send(
      `<div><h1>Alla våra medlemar: </h1> ${users}</div> <div><h2>Alla email från våra prenumeranter:</h2> ${preEmails}</div>`
    );
  } catch (err) {
    console.log(err);
    res.json(err.message);
  }
});

module.exports = router;
