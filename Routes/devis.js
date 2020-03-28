const express = require("express");
const router = express.Router();

// Generation random
const generator = require("generate-password");
// Envoyer un mail
//const mailgun = require("mailgun-js");

//Api et domaine mailgun
//const api_key = "46a984b2606c489bc92150db2d010cfc-ed4dc7c4-85aae532"; // https://app.mailgun.com/app/account/security/api_keys
//const myDomain = "mg.lereacteur.io"; // Le domaine

// const mg = mailgun({ apiKey: api_key, domain: myDomain });

//import model Devis
const Devis = require("../Models/Devis");

//Creation d'un devis
router.get("/devis", async (req, res) => {
  try {
    //Recherche d'un devis à partir de ID
    const devis = await Devis.findById(req.query.id);
    //Envoyer le devis au client
    res.send(devis);
  } catch (err) {
    res.status(400).send({ message: "Error during fetching process" });
  }
});

// Route de create d'un devis
router.post("/devis/save", async (req, res) => {
  // Verification de la validation du devis
  if (
    req.fields.typeBien &&
    req.fields.montant &&
    req.fields.country &&
    req.fields.zipCode &&
    req.fields.email &&
    req.fields.total !== undefined
  ) {
    //Creation d'un nouveau Devis
    const newDevis = new Devis({
      //Generation number alléatoire
      key: generator.generate({
        length: 8,
        numbers: true,
        uppercase: false,
        exclude: "abcdefghijklmnopqrstuvwxyz"
      }),
      typeBien: req.fields.typeBien,
      etatBien: req.fields.etatBien,
      usageBien: req.fields.usageBien,
      situationUser: req.fields.situationUser,
      typeBienLib: req.fields.typeBienLib,
      etatBienLib: req.fields.etatBienLib,
      usageBienLib: req.fields.usageBienLib,
      situationUserLib: req.fields.situationUserLib,
      country: req.fields.country,
      zipCode: req.fields.zipCode,
      montant: req.fields.montant,
      travaux: req.fields.travaux,
      notaire: req.fields.notaire,
      total: req.fields.total,
      email: req.fields.email

      // A completer .....
    });
    // Sauvegarde de devis + envois de mail

    try {
      await newDevis.save();

      // const data = {
      //   from: "Mailgun Sandbox <postmaster@" + DOMAIN + ">",
      //   to: newDevis.email,
      //   subject: "Devis MeilleurTaux.com",
      //   text: newDevis.stringify(newDevis)
      // };

      // mg.messages().send(data, function(error, body) {
      //   console.log(body);
      // });

      // envois au client
      res.send(newDevis);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "Error during saving process" });
    }
  } else {
    res.status(400).send({ message: "Some parameters are missing" });
  }
});

// Route de suppression d'un devis
router.post("/devis/delete", async (req, res) => {
  try {
    const devis = await Devis.findOne({ _id: req.fields.id });

    if (devis) {
      await devis.remove();
      res.send("Devis supprimé avec succès");
    } else {
      res.status(400).send({ message: "Id du devis inexistant" });
    }
  } catch (err) {
    res.status(400).send({ message: "Erreur d'id" });
  }
});

module.exports = router;
