class Mongo {
  constructor(collection) {
    this.collection = collection;
  }

  saveUser(user, cb) {
    this.collection.insertOne(user, cb);
  }

  getUser(_id, cb) {
    this.collection.findOne(_id, cb);
  }

  getUsers(cb) {
    this.collection.find().toArray(cb);
  }
}
module.exports = Mongo;
