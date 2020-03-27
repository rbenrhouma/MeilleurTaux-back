const express = require("express");
const router = express.Router();
const Devis = require("../Models/Devis");

router.get("/backoffice", async (req, res) => {
  try {
    const allDevis = await Devis.find();
    res.send(allDevis);
  } catch (err) {
    res.status(400).send({ message: "Error during fetching process" });
  }
});

module.exports = router;
