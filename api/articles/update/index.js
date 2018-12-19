const { json, send } = require("micro");
const Article = require("../db");

const update = function update(_id, body) {
  return Article.updateOne({ _id }, body);
};

module.exports = async function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method !== 'PATCH') res.end('Please PATCH.');

  try {
    const { id, ...body } = await json(req);

    if (id) {
      const { ok } = await update(id, body);
      send(res, Boolean(ok) ? 200 : 500);
    }
  } catch(e) {
    res.end(`There seems to be an issue. 🤔 [${e.message}]`);
  }

  res.end("Nope. Please send an id.");
};
