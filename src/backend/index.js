const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
const port = 3001;
let pool;

try{
    const connectionString = 'postgres://user:password@postgres.default.svc.cluster.local:5432/postgres';

    
     pool = new Pool({ connectionString });
}catch(e){
    console.log("error =>>", e)
    }

app.get('/api/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Error executing query');
  }
});

// Start the API server
app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
});
