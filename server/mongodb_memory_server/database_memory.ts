import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryServer: MongoMemoryServer;

//Function to start the database connection
const startConnection = async () => {
  memoryServer = await MongoMemoryServer.create();
  const uri = memoryServer.getUri();
  await mongoose.connect(uri);
};

//Function to close the database connection
const closeDatabaseConnection = async () => {
  if (memoryServer) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await memoryServer.stop();
  }
};

//Function to clear the connected database
const clearConnectedDatabase = async () => {
  if (memoryServer) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
};
export { startConnection, closeDatabaseConnection, clearConnectedDatabase };
