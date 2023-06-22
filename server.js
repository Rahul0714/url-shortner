const express = require("express");
require("dotenv").config();
const connectDB = require("./db/dbConnect");
const Shorturl = require("./models/urlModel");

const PORT = process.env.PORT || 5000;
const app = express();
connectDB();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  const shortUrls = await Shorturl.find();

  res.render("index", { shortUrls: shortUrls });
});

app.post("/urlShortner", async (req, res) => {
  await Shorturl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await Shorturl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});

app.listen(PORT, () => console.log(`Listening to Port ${PORT}`));
