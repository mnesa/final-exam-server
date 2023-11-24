const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 3000
const app = express()

// midleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0shop52.knssrag.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const database = client.db('SquareMall');
    const shopProductCollection = database.collection('shopProducts')

    app.get('/shopProducts', async (req, res) => {
      const query = {};
      const result = await shopProductCollection.find(query).toArray(); 
      res.send(result)
    })

    // app.get('/shopProducts', async (req, res) => { 
    //   const email = req.query.email;
    //   console.log(email);
    // })
  } finally {
    
  }
}
run().catch(console.dir);












app.get('/', (req, res) => {
  res.send('Hello World! It is SQUARE')
})

app.listen(port, () => {
  console.log(`SQUARE run on port ${port}`)
})