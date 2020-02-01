const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}${process.env.URI}`;

async function selectAllFromCollectionAsync(collectionName){
    try{
        const client = await MongoClient.connect(uri);
        const db = client.db(process.env.DBNAME);
        const collection = await db.collection(collectionName).find({}).toArray();
        client.close();
        return collection;
    } catch (e) {
        return e
    }
}

async function selectFromCollectionAsync(collectionName, query){
    try{
        const client = await MongoClient.connect(uri);
        const db = client.db(process.env.DBNAME);
        const item = await db.collection(collectionName).find(query).toArray();
        client.close();
        return item;
    } catch (e) {
       return e
    }
}


async function insertOneInCollectionAsync(collectionName, itemToInsert){
    try{
        const client = await MongoClient.connect(uri);
        const db = client.db(process.env.DBNAME);
        const response = await db.collection(collectionName).insertOne(itemToInsert)
        client.close(); 
        return response;
        
    } catch (e) {
        return e
    }
}

async function deleteOneFromCollectionAsync(collectionName, itemToDelete){
    try{
        const client = await MongoClient.connect(uri);
        const db = client.db(process.env.DBNAME);
        const response = await db.collection(collectionName).deleteOne(itemToDelete)
        client.close(); 
        return response;
    } catch (e) {
        console.error(e);
    }
}

async function replaceOneFromCollectionAsync(collectionName, itemToUpate, newContent){
    try{
        const client = await MongoClient.connect(uri);
        const db = client.db(process.env.DBNAME);
        const response = await db.collection(collectionName).replaceOne(itemToUpate,newContent);
        client.close(); 
        return response;
    } catch (e) {
        console.error(e);
    }
}

module.exports={
    selectAllFromCollectionAsync:selectAllFromCollectionAsync,
    selectFromCollectionAsync:selectFromCollectionAsync,
    insertOneInCollectionAsync:insertOneInCollectionAsync,
    deleteOneFromCollectionAsync:deleteOneFromCollectionAsync,
    replaceOneFromCollectionAsync:replaceOneFromCollectionAsync
}


