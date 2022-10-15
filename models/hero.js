const mongoose = require("mongoose");

const HeroScheme = new mongoose.Schema(
  {
    name: {
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
    weapons: {
      type: [{}],
    },
    img: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("heroes", HeroScheme);
