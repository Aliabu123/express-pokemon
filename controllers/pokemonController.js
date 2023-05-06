const axios = require("axios");
const Pokemon = require("../models/Pokemon")

exports.getPokemon = async (req, res, next) => {
  try {
    const name = req.query.name;
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await axios.get(url);
    const pokemonData = response.data;

    const pokemon = new Pokemon({
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
      type: pokemonData.types.map((type) => type.type.name),
      height: pokemonData.height,
      weight: pokemonData.weight,
      abilities: pokemonData.abilities.map((ability) => ability.ability.name),
    });
    pokemon.save();

    res.render("index", { pokemon });
  } catch (error) {
    console.error(error);
    // handle 404
    if (error.response.status === 404) {
      res.render("error", { message: "Pokemon not found" });
    } else {
      res.render("error", { message: error.message });
    }
  }
};