const express = require('express');
const router = express.Router();
const prompt = 'Say this is a test';

const fetch = require('node-fetch')
  

router.post('/', async function (req, res) {
const key = 'Bearer ' + process.env.API_KEY;
const url = 'https://api.openai.com/v1/chat/completions';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': key
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
console.log('hit')
try {
  const res = await fetch(url, options);
  const json = await res.json();
  res.status(200).json('Success');;
} catch (err) {
  res.status(500).json(err)
}
});

/////////////////////////////////

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{role: "user", content: "Hello world"}],
});
console.log(completion.data.choices[0].message);


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