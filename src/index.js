const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/tweets.routes");
const config = require("./config");
const Poll = require("./Poll");

const app = express();
const port = process.env.PORT || 5656;

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });

mongoose.connection.on("error", () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

// mount all routes on /api path
app.use("/api", routes);

const poller = new Poll();

poller.start();

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});