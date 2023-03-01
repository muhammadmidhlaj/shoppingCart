var db = require('../config/connection')
var collection = require('../config/collections')
const { response } = require('express')
var objectId = require('mongodb').ObjectId
module.exports = {
    addProduct: (items) => {
        return new Promise((resolve, reject) => {
            // console.log(items);
            db.get().collection(collection.PRODUCT_COLLECTION).insertOne(items).then((data) => {
                // console.log(data); 
                // let insertedId=data
                resolve(data.insertedId)
            })
        })
    },
    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct: (proId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({ _id: objectId(proId) }).then((response) => {
                console.log(response);
                resolve(response)
            })
        })
    },
    getProductDetials: (proId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({ _id: objectId(proId) }).then((product) => {
                resolve(product)
            })
        })
    },
    updateProduct: (proId, productDetials) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).updateOne({ _id: objectId(proId) }, {
                $set: {
                    Name: productDetials.Name,
                    Category: productDetials.Category,
                    Price: productDetials.Price,
                    Description: productDetials.Description

                }
            }).then((response) => {
                resolve()
            })
        })
    }
}                      