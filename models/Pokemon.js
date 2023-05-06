const mongoose = require ("mongoose")


const PokemonModel = mongoose.Schema({
    name: String,
    image: String,
    type: String,
    height: Number,
    weight: Number,
    abilities: String,
  });



  const Pokemon = mongoose.model("Pokemon",PokemonModel)

  module.exports = Pokemon