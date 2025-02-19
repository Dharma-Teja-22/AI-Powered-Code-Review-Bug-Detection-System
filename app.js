//packages
import express, { json, urlencoded, static as static_ } from 'express';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors'
//file imports

import appv1 from './server/src/app/v1/app.v1.js';
const __dirname = dirname( fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 8000;

app.use(cors())
//CORS setup
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

//bodyparser
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(static_(join(__dirname, 'public')));

//V1
app.use('/v1', appv1);

app.listen(port, () => {
  console.log("Server started on port: " + port);
})

export default app;
