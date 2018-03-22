const { mongodb: { collections: { usersCollection } } } = require('../config');

class Mongo {
  constructor(db) {
    this.db = db;
  }

  saveUser(user, cb) {
    this.db.collection(usersCollection).insertOne(user, cb);
  }

  getUser(_id, cb) {
    this.db.collection(usersCollection).findOne(_id, cb);
  }

  getUserByGoogleId(googleId, cb) {
    this.db.collection(usersCollection).findOne({ googleId }, (err, res) => cb(err, res));
  }

  getUsers(cb) {
    this.db.collection(usersCollection).find().toArray(cb);
  }
}
module.exports = Mongo;
