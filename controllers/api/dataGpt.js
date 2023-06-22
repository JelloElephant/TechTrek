const router = require('express').Router();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
/* const app = express(); */
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
  try {
const payload = {'role':'user','content':'list '+ req.body.quantity +'things to do in '+ req.body.location}
const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [payload],
});
const parseStr = completion.data.choices[0].message.content
const data = JSON.stringify(parseStr.split(/[\n\n]/));
console.log(data);
// Save the data to db

const connection = mysql.createConnection({
  host:'localhost',
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
});

connection.connect(function(err){
  if (err) throw err;
  /* console.log('Connected'); */
  const sql = 'insert into results (array) values (?)';
  connection.query(sql, data, function (err,result){
    if (err) throw err;
    /* console.log('record inserted') */
  });
});

  } catch (err) {
    res.status(400).json(err);
  }

});

module.exports = router;


