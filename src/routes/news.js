const express = require("express");
const newsRouter = express.Router();
const axios = require("axios");

newsRouter.get("", async (req, res) => {
  try {
    const newsAPI = await axios.get(`https://raddy.dev/wp-json/wp/v2/posts`);
    res.render("news", { articles: newsAPI.data });
    // console.log(newsAPI.data);
  } catch (err) {
    if (err.respose) {
      console.log("error response: " + err.respose.data);
      console.log("error response: " + err.respose.status);
      console.log("error response: " + err.respose.headers);
    } else if (err.request) {
      console.log("error request: " + err.request);
    } else {
      console.log("Error", err.message);
    }
  }
});

newsRouter.get("/:id", async (req, res) => {
  let articleID = req.params.id;
  try {
    const newsAPI = await axios.get(`https://raddy.dev/wp-json/wp/v2/posts/${articleID}`);
    res.render("newsSingle", { article: newsAPI.data });
  } catch (err) {
    if (err.respose) {
      res.render("newsSingle", { article: null });
      console.log("error response: " + err.respose.data);
      console.log("error response: " + err.respose.status);
      console.log("error response: " + err.respose.headers);
    } else if (err.request) {
      res.render("newsSingle", { article: null });
      console.log("error request: " + err.request);
    } else {
      res.render("newsSingle", { article: null });
      console.log("Error", err.message);
    }
  }
});

newsRouter.post("/", async (req, res) => {
  try {
    const newsAPI = await axios.get(`https://raddy.dev/wp-json/wp/v2/posts?search=${req.body.search}`);
    res.render("newsSearch", { articles: newsAPI.data });
  } catch (err) {
    if (err.respose) {
      res.render("newsSearch", { articles: null });
      console.log("error response: " + err.respose.data);
      console.log("error response: " + err.respose.status);
      console.log("error response: " + err.respose.headers);
    } else if (err.request) {
      res.render("newsSearch", { articles: null });
      console.log("error request: " + err.request);
    } else {
      res.render("newsSearch", { articles: null });
      console.log("Error", err.message);
    }
  }
});

module.exports = newsRouter;
// 7be7f486ca244e76b74b5d424d80af0e
