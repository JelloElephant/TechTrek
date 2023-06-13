const express = require('express');
const router = express.Router();
const prompt = 'Say this is a test';

const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args));

router.post('/', async function (req, res) {
const key = 'Bearer ' + API_KEY;
const url = 'https://api.openai.com/v1/chat/completions';
const options = {
  method: 'POST',
  headers: {
    'content type': 'application/json',
    'authorization': key
  },
  body: JSON.stringify({
    "model": "gpt-3.5-turbo",
    "messages": [{"role":"user", "content":prompt}],
    "max_tokens": 7,
    "temperature": 0,
    "top_p": 1,
    "n": 1,
    "stream": false,
    "stop": "\n"
  }
  )
};

try {
  const res = await fetch(url, options);
  const json = await res.json();
  res.status(200).json('Success');;
} catch (err) {
  res.status(500).json(err)
}
});

/////////////////////////////////

/* const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Say this is a test",
  max_tokens: 7,
  temperature: 0,
}); */

/////////////////////////////////


/* router.post(url, async (req, res) => {
    try {
      const respGpt = await Category.create(req.body, {
        where: {
          category_name: req.body.category_name
        }
      })
      res.status(200).json(newCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  }); */
  

module.exports = router;