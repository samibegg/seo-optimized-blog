// lib/mongodb.js
import { MongoClient } from 'mongodb';

// MongoClient instance
let client;
let clientPromise;

// Only use a global variable in development to avoid multiple connections
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(process.env.MONGODB_URI);
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = MongoClient.connect(process.env.MONGODB_URI);
}

export async function connectToDatabase() {
  // Wait for the client to be connected
  const client = await clientPromise;
  const db = client.db(); // Returns the default database
  return db;
}
