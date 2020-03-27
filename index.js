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

//Connection mongoose DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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

// Remarquez que le `app.listen` doit se trouver après les déclarations des routes
app.listen(process.env.PORT, () => {
  console.log("Server démarré");
});
