class HistoriasManager {
  constructor(collection, log) {
    this.collection = collection;
    this.log = log;
  }

  getHistoria(_id, cb) {
    this.log.debug(`Get historia ${_id}`);
    this.collection.findOne({ _id: `${_id}` }, (err, resp) => cb(err, resp));
  }

  getHistorias(searchQuery, cb) {
    this.log.debug(`Get historias ${searchQuery}`);
    this.collection.find(searchQuery).toArray((err, res) => cb(err, res));
  }

  createHistoria(historia, cb) {
    this.log.debug(`Create historia ${historia}`);
    this.collection.insertOne(historia, cb);
  }
}
module.exports = HistoriasManager;
