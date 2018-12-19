const Article = require("../db");

const get = function get() {
  return Article.find();
};

module.exports = async function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.end(JSON.stringify({ articles: await get() }));
};
