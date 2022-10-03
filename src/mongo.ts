import config from "config";
import mongoose from "mongoose";

const mongoUri = config.get<string>("mongo.uri");

const Mongo = mongoose.createConnection(mongoUri);
Mongo.on("connected", () => {
  console.log("connect to database successfully");
});

export default Mongo;
