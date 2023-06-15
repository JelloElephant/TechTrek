const router = require('express').Router();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);
const query = '10 things to do in minneapolis on June 15'

router.post('/', async (req, res) => {
  try {
const payload = {'role':'user','content':query}
const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [payload],
});
const parseStr = completion.data.choices[0].message.content
const output = parseStr.split(/[\n\n]/)
res.send(output);


  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;