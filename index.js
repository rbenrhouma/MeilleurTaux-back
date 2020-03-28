// require("dotenv").config(); // As early as possible in your application, require and configure dotenv.
// Permet d'activer les variables d'environnement qui se trouvent dans le fichier .env

const express = require("express");
const mongoose = require("mongoose"); // for db

// const middlewareCors = require("cors");
// const middleware = require("express-formidable");

// placer des middlewares
const app = express();
// app.use(middlewareCors());
// app.use(middleware());

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

let currentDataBase = "Devis";
mongoose.connect(
  process.env.MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("Connexion to MongoDB succeeded...");
    } else {
      console.log(
        "Error in DB Connexion: " + JSON.stringify(err, undefined, 2)
      );
    }
  }
);

const backOfficeRoute = require("./Routes/backoffice");
app.use(backOfficeRoute);
app.get("/", (req, res) => {
  res.send("Test");
});

const devisRoute = require("./Routes/devis");
app.use(devisRoute);

//Routes indefinis
app.all("*", (req, res) => {
  res.status(404).send({ message: "Page introuvable" });
});

const port = process.env.PORT || 5000;
// Remarquez que le `app.listen` doit se trouver après les déclarations des routes
app.listen(port, () => {
  console.log(`Server démarré serveur ${port}`);
});
