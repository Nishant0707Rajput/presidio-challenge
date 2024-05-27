const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const {env} = require("./app/constant");
const { errorHandler } = require("./app/middleware");
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});



app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.enable('trust proxy');
// app.use((req, res, next) => {
//     if (req.secure) {
//         next();
//     } else {
//         res.redirect('https://' + req.headers.host + req.url);
//     }
// });

// app.use(require("./app/middleware/rateLimiting"));

const httpServer = http
  .createServer(app.handle.bind(app))
  .listen(env.PORT, () => {
    console.info(`Server up successfully - port:${process.env.PORT}`);
    require('./app/config/config');
  });
app.use("/api", require("./app/router/index"));



app.use(errorHandler.methodNotAllowed);
app.use(errorHandler.genericErrorHandler);

process.on("unhandledRejection", (err) => {
  console.error("possibly unhandled rejection happened");
  console.error(err.message);
});

const closeHandler = () => {
  httpServer.close(() => {
    console.info("Server is stopped successfully");
    process.exit(0);
  });
};

process.on("SIGTERM", closeHandler);
process.on("SIGINT", closeHandler);
