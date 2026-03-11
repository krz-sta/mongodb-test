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

        app.get('/', (res) => {
            res.send('API working.');
        });

        app.post('/users', async (req, res) => {
            try {
                const { name, age } = req.body;

                if (!name || age == null) {
                    return res.status(400).json({
                        error: 'Name and age are required.'
                    });
                }

                const result = await userCollection.insertOne({ name, age });

                res.status(201).json({
                    message: 'User added successfully.',
                    insertedId: result.insertedId
                });
            } catch (err) {
                res.status(500).json({ error: err.message});
            }
        });

        app.listen(port, () => {
            console.log(`Server listening on: http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Error starting app: ', err);
    }
}

start();