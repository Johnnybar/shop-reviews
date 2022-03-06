/* eslint-disable indent */
const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();

// Serve the static files from client
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api/getShopReviews", async (req, res) => {
  const uri = `https://api.trustedshops.com/rest/internal/v2/shops/${req.query.shopId}/reviews.json`;
  try {
    const { data } = await axios.get(uri, {
      headers: { "Content-Type": "application/json" },
    });
    res.status(200).json(data.response);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.get("/api/getSearchResults", async (req, res) => {
  const { searchTerm, pageNumber } = req.query;
  const uri = `https://shop-search-api.trustedshops.com/shopsearch`;
  try {
    const { data } = await axios.get(uri, {
      headers: { "Content-Type": "application/json" },
      params: {
        searchTerm: req.query.searchTerm,
        page: req.query.pageNumber,
      },
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
