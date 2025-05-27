const mongoose = require("mongoose");

const { ATLAS_DB_URI } = process.env;

const connect = async () => {
  try {
    await mongoose.connect(ATLAS_DB_URI);
    console.log("AtlasDB connected");
  } catch (error) {
    console.log(error);
  }
};

const models = {
  User: require("./models/User"),
  Product: require("./models/Product"),
  Discount: require("./models/Discount")
};

module.exports = { ...models, connect };
