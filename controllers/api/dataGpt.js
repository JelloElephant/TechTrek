const router = require('express').Router();
const mysql = require('mysql2');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
  try {
const payload = {'role':'user','content':'list '+req.body.number+'things to do in '+req.body.city}
const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [payload],
});
const parseStr = completion.data.choices[0].message.content
const data = JSON.stringify(parseStr.split(/[\n\n]/))
/* const data = JSON.stringify(parseStr); */

console.log(data)


/* res.render(data); */

// Save the data to MySQL

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'Cid7677!',
  database:'techtrek_db'
});

connection.connect(function(err){
  if (err) throw err;
  console.log('Connected');
  const sql = 'insert into results (array) values (?)';
  connection.query(sql, data, function (err,result){
    if (err) throw err;
    console.log('record inserted')
  });
});

console.log('hit2')




  } catch (err) {
    res.status(400).json(err);
  }

});

module.exports = router;


