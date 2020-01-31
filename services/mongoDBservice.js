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
        console.error(e);
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
        console.error(e);
    }
}


async function insertOneInCollectionAsync(collectionName, itemToInsert){
    try{
        const client = await MongoClient.connect(uri);
        const db = client.db(process.env.DBNAME);
        const response = await db.collection(collectionName).insertOne(itemToInsert)
        client.close(); 
    } catch (e) {
        console.error(e);
    }
}

async function deleteOneFromCollectionAsync(collectionName, itemToDelete){
    try{
        const client = await MongoClient.connect(uri);
        const db = client.db(process.env.DBNAME);
        const response = await db.collection(collectionName).deleteOne(itemToDelete)
        client.close(); 
    } catch (e) {
        console.error(e);
    }
}

module.exports={
    selectAllFromCollectionAsync:selectAllFromCollectionAsync,
    selectFromCollectionAsync:selectFromCollectionAsync,
    insertOneInCollectionAsync:insertOneInCollectionAsync,
    deleteOneFromCollectionAsync:deleteOneFromCollectionAsync
}


