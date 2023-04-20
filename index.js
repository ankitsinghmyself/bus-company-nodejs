const express = require('express');
const boom = require('boom');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const app = express();
const eventEmitter = require('./notification');
// mongodb atlas username and password are temporary for this project
const mongodb_username = 'ankitsinghmyself'; // Replace <username> with your username
const mongodb_password = 'Mo%40maa622maa'; // Replace <password> with your password
const mongodb_hostname =
  process.env.MONGODB_HOSTNAME || 'cluster0.fpm5lhj.mongodb.net';
const mongodb_database = process.env.MONGODB_DATABASE || 'bus';
const uri = `mongodb+srv://${mongodb_username}:${mongodb_password}@${mongodb_hostname}/${mongodb_database}`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    db = client.db(mongodb_database);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

connectToDatabase();

app.use(express.json());
// postman import api https://api.postman.com/collections/2693321-c73d8e48-747e-4c13-b9c9-161f6756494b?access_key=PMAT-01GYFE3E78T7A7WFM73XFS0ZC6
// API to update the status(open/close) of the ticket
app.put('/api/ticket/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const result = await db
      .collection('tickets')
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: { status: status } },
        { returnOriginal: false }
      );
    // Emit a 'ticket-updated' event with the updated ticket data
    eventEmitter.emit('ticket-updated', result.value);
    res.json(result.value);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// API to add user details to the ticket
app.put('/api/ticket/:id/user', async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await db
      .collection('tickets')
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: { user: { name, email } } },
        { returnOriginal: false }
      );
    // Emit a 'ticket-updated' event with the updated ticket data
    eventEmitter.emit('ticket-updated', result.value);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// API to view ticket status
app.get('/api/ticket/:id', async (req, res) => {
  try {
    const result = await db
      .collection('tickets')
      .findOne({ _id: new ObjectId(req.params.id) });
    res.json(result.status);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// API to view all closed tickets
app.get('/api/tickets/closed', async (req, res) => {
  try {
    const result = await db
      .collection('tickets')
      .find({ status: 'closed' })
      .toArray();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// API to view all open tickets
app.get('/api/tickets/open', async (req, res) => {
  try {
    const result = await db
      .collection('tickets')
      .find({ status: 'open' })
      .toArray();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// API to view details of the person owning the ticket
app.get('/api/ticket/:id/details', async (req, res) => {
  try {
    // Find the ticket with the given ID in the tickets collection
    const ticket = await db
      .collection('tickets')
      .findOne({ _id: new ObjectId(req.params.id) });

    // If the ticket is not found or is still open, return a 404 Not Found error
    if (!ticket.user) {
      return res
        .status(404)
        .json({ error: 'no User found on ticket please add user details ' });
    }
    // Find the user who owns the ticket in the users collection

    // Return the user details
    res.json(ticket.user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// API for admin to reset the server (opens up all the tickets)
app.post('/admin/reset', async (req, res) => {
  try {
    const result = await db
      .collection('tickets')
      .updateMany({ status: 'closed' }, { $set: { status: 'open' } });
    res.json({ message: `${result.modifiedCount} tickets have been opened` });
    res.json({ message: 'Server reset successful' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});
// API to create a new ticket (initially open)
app.post('/api/ticket', async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await db.collection('tickets').insertOne({
      title,
      description,
      status: 'open',
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// Start the server
app.listen(3000, () => console.log('Server listening on port 3000'));
