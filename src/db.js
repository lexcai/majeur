const mongoose = require('mongoose');

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  // Connecting to the database
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'ynov-cloud',
  });

  connection.isConnected = db.connections[0].readyState;
}

module.exports = dbConnect;
