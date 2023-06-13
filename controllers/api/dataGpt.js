const express = require('express');
const router = express.Router();
const prompt = '10 things to do in minneapolis this weekend';

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
    "prompt": prompt,
    "max_tokens": 7,
    "temperature": 0,
    "top_p": 1,
    "n": 1,
    "stream": false,
    "logprobs": null,
    "stop": "\n"
  }
  )
};

try {
  const res = await fetch(url, options);
  const json = await res.json();
  console.log(json);
} catch (err) {
  console.log(err)
}
});


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