import express from "express";
import createError from 'http-errors';
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from "cors";
import logger from "morgan";
import session from "express-session";
import sessionFileStore from "session-file-store";

import schema from "./graphql/";

mongoose
  .connect(
    'mongodb://localhost:27017/scorecast',
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

let app = express();

app.use(session({
  secret: ' ekruvbaervilubaernvyeilarhveiarvbaerg',
  saveUninitialized: false,
  cookie: {
    maxAge: 60000
  },
  store: new sessionFileStore(session)()
}));

app.post(
  "/",
  cors(),
  bodyParser.json(),
  expressGraphQL((req) => ({
    schema,
    graphiql: false,
    rootValue: {
      session: req.session
    }
  })),
  (req, res) => {
    if (req.headers.authorization) {
      req.session.user = Users.findOne()
    }
  }
);
app.get(
  "/",
  cors(),
  bodyParser.json(),
  expressGraphQL({
    schema,
    graphiql: true
  })
);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
