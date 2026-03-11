const express = require('express'); 
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

app.use(express.json());

let userCollection;

async function start() {
    try {
        await client.connect();
        console.log('Connected to MongoDB.');

        const db = client.db('testDB');
        userCollection = db.collection('users');

        app.get('/', (req, res) => {
            res.send('API working.');
        });

        app.listen(port, () => {
            console.log(`Server listening on: http://localhost:${port}`);
        })
    } catch (err) {
        console.error('Error starting app: ', err);
    }
}

start();