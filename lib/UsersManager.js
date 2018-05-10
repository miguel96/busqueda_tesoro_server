const assignDefHistory = user => ({
  ...user,
  createdAt: Math.round(Date.now() / 1000),
  progresoHistoria: [{ idHistoria: 'historia1', pistasCompletadas: [], inicioHistoria: Math.round(Date.now() / 1000) }],
});

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
    this.log.info(`Save user:${JSON.stringify(user)}`);
    this.collection.insertOne(assignDefHistory(user), (err, resp) => {
      if (err) {
        cb(err);
      } else {
        cb(null, resp.ops[0]);
      }
    });
  }

  getUser(_id, cb) {
    this.log.info(`Get user: ${_id}`);
    this.collection.findOne({ _id }, cb);
  }

  getUserByGoogleId(googleId, cb) {
    this.log.debug(`Get user by googleId:${googleId}`);
    this.collection.findOne({ googleId }, cb);
  }

  getAutoLogin(cb) {
    this.collection.findOne({}, cb);
  }
}
module.exports = UsersManager;
