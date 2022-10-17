const mongoose = require("mongoose");

const HeroScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    fullname: {
      type: String,
    },
    element: {
      type: String,
    },
    specie: {
      type: String,
    },
    role: {
      type: String,
    },
    rarity: {
      type: String,
    },
    weapons: {
      type: {},
    },
    imgs: {
      portrait: {
        type: String,
      },
      illustration: {
        type: String,
      },
      background: {
        type: String,
      },
      sprites: {
        type: Map,
        of: String,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("heroes", HeroScheme);
