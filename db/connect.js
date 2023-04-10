const { MongoClient } = require("mongodb");
const dotenv = require('dotenv').config({ path: './config/.env' })


const uri = process.env.URI
const database = process.env.DATABASE

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connect() {
  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(database);
    return db;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  connect,
};
