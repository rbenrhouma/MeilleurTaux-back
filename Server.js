const express = require("express");
const mongoose = require("mongoose"); // for db
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

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

app.all("*", (req, res) => {
  res.status(404).send({ message: "Page introuvable" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server démarré serveur ${process.env.PORT}`);
});
