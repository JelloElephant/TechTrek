const router = require('express').Router();
const mysql = require('mysql2');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
  try {
const payload = {'role':'user','content':req.body.query}
const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [payload],
});
const parseStr = completion.data.choices[0].message.content
const data = parseStr.split(/[\n\n]/)
/* const data = ("data"); */
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

/* const sql = 'INSERT INTO techtrek_db.results (array) VALUES ?';
const values = data;
console.log('hit1')
connection.query(sql, values, (err, result) => {
  if (err) {
    console.error('Error saving data to MySQL:', err);
    res.status(500).json({ error: 'Failed to save data to MySQL' });
  } else {
    console.log('Data saved to MySQL:', result);
    res.status(200).json({ message: 'Data saved successfully' });
  }
}); */
console.log('hit2')




  } catch (err) {
    res.status(400).json(err);
  }

});

module.exports = router;

/* app.post('/your-route', (req, res) => {
  const data = req.body; // Assuming the data is sent as the request body

  // Perform the necessary data processing and validation

  // Save the data to MySQL
  const sql = 'INSERT INTO results (array) VALUES ?';
  const values = [data];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error saving data to MySQL:', err);
      res.status(500).json({ error: 'Failed to save data to MySQL' });
    } else {
      console.log('Data saved to MySQL:', result);
      res.status(200).json({ message: 'Data saved successfully' });
    }
  });
}); */

