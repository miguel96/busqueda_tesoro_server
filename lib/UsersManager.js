class UsersManager {
  constructor(collection, log) {
    this.collection = collection;
    this.log = log;
  }

  progresaHistoria(idUsuario, idHistoria, idPista, cb) {
    this.log.debug(`Usuario ${idUsuario} progresa en historia ${idHistoria} pista ${idPista}`);
    this.collection.updateOne(
      { idUsuario, 'progresoHistoria.idHistoria': idHistoria },
      { $push: { 'progresoHistoria.$[].pistasCompletadas': { idPista, fechaCompletada: Date.now() } } }
      , err => cb(err),
    );
  }

  saveUser(user, cb) {
    this.log.debug(`Save user:${user}`);
    this.collection.insertOne(user, cb);
  }

  getUser(_id, cb) {
    this.log.info(`Get user: ${_id}`);
    this.collection.findOne({ _id }, cb);
  }

  getUserByGoogleId(googleId, cb) {
    this.log.debug(`Get user by googleId:${googleId}`);
    this.collection.findOne({ googleId }, cb);
  }
}
module.exports = UsersManager;
