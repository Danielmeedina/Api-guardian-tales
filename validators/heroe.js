const { check, validationResult } = require("express-validator");

const validatorCreateHeroe = [
  check("name").exists().notEmpty(),
  check("fullname").exists().notEmpty(),
  check("element").exists().notEmpty(),
  check("specie").exists().notEmpty(),
  check("role").exists().notEmpty(),
  check("rarity").exists().notEmpty(),
  check("weapons").exists().notEmpty(),
  check("imgs").exists().notEmpty(),
  check("imgs.portrait").exists().notEmpty(),
  check("imgs.illustration").exists().notEmpty(),
  check("imgs.background").exists().notEmpty(),
  check("imgs.sprites").exists().notEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403);
      res.send({ errors: err.array() });
    }
  },
];

const validatorGetDetails = [
  check("name").exists().notEmpty(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403);
      res.send({ errors: err.array() });
    }
  },
];

const validatorIdHeroe = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(403);
      res.send({ errors: err.array() });
    }
  },
];

module.exports = {
  validatorCreateHeroe,
  validatorGetDetails,
  validatorIdHeroe,
};
