const express = require("express");
const bodyParser = require("body-parser");
const pokemonRoutes = require("./routes/pokemonRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const app = express();
require("./config/db")();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  const pokemon = {
    name: "",
    image: "",
    type: [],
    height: "",
    weight: "",
    abilities: [],
  };
  res.render("index", { pokemon });
});

app.use("/pokemon", pokemonRoutes);
app.use("/favorites", favoritesRoutes);

app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error", { message: error.message });
});

const port = 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));