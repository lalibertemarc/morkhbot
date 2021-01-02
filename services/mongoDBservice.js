const MongoClient = require("mongodb").MongoClient;
const Keyv = require("keyv");
require("dotenv").config();
const _ = require("underscore");
const uri = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}${process.env.URI}`;

const keyv = new Keyv();

keyv.on("error", (err) => console.log("Connection Error", err));

//if query is null, its select all
async function selectFromCollectionAsync(collectionName, query = {}) {
    try {
        let cachedCollection = await keyv.get(collectionName);

        if (cachedCollection != null) return _.where(cachedCollection, query);

        const client = await MongoClient.connect(uri);
        const db = client.db(process.env.DBNAME);
        const item = await db.collection(collectionName).find(query).toArray();
        client.close();
        if (query != {}) await keyv.set(collectionName, item, 20000);
        return item;
    } catch (e) {
        return e;
    }
}

async function insertOneInCollectionAsync(collectionName, itemToInsert) {
    try {
        const client = await MongoClient.connect(uri);
        const db = client.db(process.env.DBNAME);
        const response = await db
            .collection(collectionName)
            .insertOne(itemToInsert);
        client.close();
        await keyv.delete(collectionName);
        return response;
    } catch (e) {
        return e;
    }
}

async function deleteOneFromCollectionAsync(collectionName, itemToDelete) {
    try {
        const client = await MongoClient.connect(uri);
        const db = client.db(process.env.DBNAME);
        const response = await db
            .collection(collectionName)
            .deleteOne(itemToDelete);
        client.close();
        await keyv.delete(collectionName);
        return response;
    } catch (e) {
        console.error(e);
    }
}

async function replaceOneFromCollectionAsync(
    collectionName,
    itemToUpate,
    newContent
) {
    try {
        const client = await MongoClient.connect(uri);
        const db = client.db(process.env.DBNAME);
        const response = await db
            .collection(collectionName)
            .replaceOne(itemToUpate, newContent);
        client.close();
        await keyv.delete(collectionName);
        return response;
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    selectFromCollectionAsync: selectFromCollectionAsync,
    insertOneInCollectionAsync: insertOneInCollectionAsync,
    deleteOneFromCollectionAsync: deleteOneFromCollectionAsync,
    replaceOneFromCollectionAsync: replaceOneFromCollectionAsync,
};
