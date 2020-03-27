const mongoose = require("mongoose");

// modèle devis pour mongoose DB
const Devis = mongoose.model("devis", {
    key: string;
});

module.exports = Simulation;