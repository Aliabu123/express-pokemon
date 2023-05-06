const axios = require("axios");
const Favorite = require("../models/favoritesModel");
const Pokemon = require("../models/pokemonModel");

exports.getFavorites = async (req, res, next) => {
  try {
    const pokemons = await Pokemon.find().sort({ createdAt: -1 });

    const favorites = await Favorite.find()
      .populate("pokemon")
      .sort({ updatedAt: -1 });

    favorites.sort((a, b) => b.createdAt - a.createdAt);

    res.render("favorites", { pokemons, favorites });
  } catch (error) {
    console.error(error);
    res.render("error", { message: "Failed to get favorites" });
  }
};

const addFavorite = async (req, res) => {
  try {
    const { pokemonId, notes } = req.body;
    const favorite = new Favorite({
      pokemon: pokemonId,
      notes: notes,
    });
    await favorite.save();
    res.redirect("/favorites");
  } catch (error) {
    console.error(error);
    res.render("error", { message: "Failed to add favorite" });
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const id = req.query.favoriteId;
    const notes = req.body.notes;

    await Favorite.findByIdAndUpdate(id, { notes: notes });
    res.redirect("/favorites");
  } catch (error) {
    console.error(error);
    res.render("error", { message: "Failed to update favorite" });
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    const id = req.query.favoriteId;
    await Favorite.findByIdAndDelete(id);
    res.redirect("/favorites");
  } catch (error) {
    console.error(error);
    res.render("error", { message: "Failed to delete favorite" });
  }
};


exports.favoriteOperations = async (req, res) =>{
  try {
    const action = req.query.action;
    if(action === "addFavorite"){
      await addFavorite(req, res);
    } else if (action === "updatFavorite"){
      await updateFavorite(req, res);
    } else if (action === "deleteFavorite"){
      await deleteFavorite(req, res);
    } else {
      res.redirect("/favorites");
    }
  } catch (error) {
    console.error(error);
    res.render("error", { message: "Failed to handle favorite" });
  }
}