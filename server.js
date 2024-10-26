import express from "express";
import fileUpload from "express-fileupload";
import fs from 'fs/promises';
import path from 'path';
import dotenv from "dotenv";
import session from "express-session";

import {
  confirm_router,
  customer_router,
  order_router,
  acknowledge_router,
  admin_router,
} from "./routes/index.js";
import { cancel_template, home, success_template, admin_template } from "./views/index.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use("/static", express.static("public"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/customers", customer_router);
app.use("/orders", order_router);
app.use("/confirm", confirm_router);
app.use("/acknowledge", acknowledge_router);
app.use("/admin", admin_router);


app.get("/", async (req, res) => {
  const directors = JSON.parse(await fs.readFile(path.join('data', 'directors.json'), 'utf-8'));
  const locations = JSON.parse(await fs.readFile(path.join('data', 'locations.json'), 'utf-8'));
  res.send(home(directors, locations));
});


app.get("/success", (req, res) => res.send(success_template()));
app.get("/cancel", (req, res) => res.send(cancel_template()));

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
