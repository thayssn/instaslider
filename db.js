var mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://localhost/instaslider")
  .then( function(conn) { global.conn = conn.db("instaslider")})
.catch( function(err) { console.log(err) })


function findAll(callback){
  global.conn.collection("customers").find({}).toArray(callback);
}

function insert(customer, callback){
  global.conn.collection("customers").insert(customer, callback);
}

module.exports = {
  findAll : findAll,
  insert : insert
}