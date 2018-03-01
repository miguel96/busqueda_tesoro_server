class UsersManager {
  constructor(mongo) {
    this.mongo = mongo;
  }

  getUsers(cb) {
    this.mongo.getUsers(cb);
  }
}
module.exports = UsersManager;
