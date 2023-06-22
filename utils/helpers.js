module.exports = {
  get_emoji: () => {
    const express = require('express');
    const app = express();
    const mysql = require('mysql2');
    
    // Create a MySQL connection pool
    const pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'Cid7677!',
      database: 'techtrek_db'
    });
    
    // Define a route to retrieve data from the database
    app.get('/data', (req, res) => {
      // Execute a query to retrieve data from the database
      pool.query('SELECT * FROM results', (error, results) => {
        if (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }
      });
    });
    
    // Start the server
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
    
let results = 'results'
    return `<span for="img" aria-label="book">${results}</span>`;
  },
};
