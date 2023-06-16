const router = require('express').Router();
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
/* res.render(data) */;
// Function to insert single row values in
// the database

	let query = `INSERT INTO user_db.results
		(array) VALUES (?);`;
console.log(query)
	// Creating queries
	db_con.query(query, [data], (err, rows) => {
		if (err) throw err;
		console.log("Row inserted with id = "
			+ rows.insertId);
	});
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

