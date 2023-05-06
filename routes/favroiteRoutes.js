const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");

router.get("/", favoritesController.getFavorites);

router.post("/", favoritesController.favoriteOperations);

module.exports = router;