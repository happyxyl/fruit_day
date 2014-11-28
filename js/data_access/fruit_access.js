var mongo_client = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/fruit_db';

var insert_fruit = function(fruit_data, db, callback) {
  console.log("method: insert_fruit");
  var collection = db.collection('fruit');
  collection.insert(fruit_data, function(err, result) {
     console.log("insert completed.");
     callback(result);
   });
}

var find_fruit = function(db, callback) {
  console.log("method: find_fruit");
  var collection = db.collection('fruit');
  collection.find({}).toArray(function(err, result) {
    console.log("find completed.");
    callback(result);
  });      
}

exports.add_fruit = function(fruit_data){
  console.log("method: add_fruit");
  mongo_client.connect(url, function(err, db) {
    console.log("connected correctly to server");
    insert_fruit(fruit_data, db, function(ret) {
      console.log(ret);
      db.close();
    });
  });
}

exports.get_fruit = function(callback){
  console.log("method: get_fruit");
  mongo_client.connect(url, function(err, db) {
    console.log("connected correctly to server");
    find_fruit(db, function(ret) {
      console.log(ret);
      callback(ret);
      db.close();
    });
  });
}