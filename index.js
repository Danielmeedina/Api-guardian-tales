require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo");
const app = express();
const HeroScheme = require("./models/hero");
const {
  validatorCreateHeroe,
  validatorGetDetails,
  validatorIdHeroe,
  validatorCredential,
} = require("./validators/heroe");
const { handleHttpError } = require("./helpers/handleError");
const { matchedData } = require("express-validator");

app.use(cors());
app.use(express.json());
app.set("trust proxy", true);

// PORT
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`tu app esta escuchando por el puerto http://localhost:${port}`);
});

// ROUTESSS HEROESSSSS

app.get("/", (req, res) => {
  res.send(
    `welcome to guardian tales API, to see the list of heroes use /heroes`
  );
});

app.get("/heroes", async (req, res) => {
  try {
    const data = await HeroScheme.find({});
    res.send(data);
  } catch (e) {
    handleHttpError(res, "ERROR_GET_HEROES");
  }
});

app.get("/heroes/:name", validatorGetDetails, async (req, res) => {
  try {
    req = matchedData(req);
    const { name } = req;
    const data = await HeroScheme.findOne({ name: name });
    if (data.length == 0) {
      throw new Error();
    }
    res.send(data);
  } catch (e) {
    handleHttpError(res, "ERROR_GET_HEROE", 404);
  }
});

app.post(
  "/api/guardian-tales/heroes",
  validatorCredential,
  validatorCreateHeroe,
  async (req, res) => {
    try {
      const body = matchedData(req);
      const data = await HeroScheme.create(body);
      res.send(data);
    } catch (e) {
      handleHttpError(res, "ERROR_CREATE_HEROE");
    }
  }
);

app.put(
  "/api/guardian-tales/heroes/:id",
  validatorCredential,
  validatorCreateHeroe,
  validatorIdHeroe,
  async (req, res) => {
    try {
      const { id, ...body } = matchedData(req);
      const data = await HeroScheme.findOneAndUpdate(id, body);
      res.send(data);
    } catch (e) {
      handleHttpError(res, "ERROR_UPDATE_HEROE");
    }
  }
);

app.delete(
  "/api/guardian-tales/heroes/:id",
  validatorCredential,
  validatorIdHeroe,
  async (req, res) => {
    try {
      req = matchedData(req);
      const { id } = req;
      const data = await HeroScheme.deleteOne({ _id: id });
      res.send(data);
    } catch (e) {
      handleHttpError(res, "ERROR_DELETE_HEROE", 404);
    }
  }
);

dbConnect();
