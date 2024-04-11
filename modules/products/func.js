const { MongoClient, ObjectId } = require("mongodb"); //import MongoClient from mongodb so we can create a client

//DB SETTINGS
//For MongoDB Atlas, use mongodb+srv://
//For local, use mongodb://
//const dbUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/?authSource=testdb`;
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/`;
const client = new MongoClient(dbUrl);

//DATABASE FUNCTIONS 

//Function to select store as the database and return it.
async function connection() {
  db = client.db("store"); //select store
  return db;
}

//Function to return all documents from the products collection.
async function getProducts() {
  db = await connection();
  let results = db.collection("products").find({}); //select all
  resultsArray = await results.toArray(); //toArray() is an async function
  return resultsArray;
}

async function getComments(){
  db = await connection();
  let results = db.collection("comments").find();//select all
  resultsArray = await results.toArray(); //toArray() is an async function
  return resultsArray;
}

/* Async function to select one document by _id. */ 
async function getSingleProducts(id) {
  db = await connection();
  const getId = { _id: new ObjectId(id)};
  const result = db.collection("products").findOne(getId); 
  return result;
}

//Function to insert document into comments collection using insertOne().
async function addComment(comment) {
  db = await connection();
  let status = await db.collection("comments").insertOne(comment);
}

module.exports = {
  getProducts, 
  getComments,
  getSingleProducts,
  addComment, 
};