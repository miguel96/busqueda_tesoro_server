const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use((req, res, next) => {
  console.log(`${req.method} /user${req.path}`);
  next();
});

router.get('/', (req, res) => {
  req.app.get('usersManager').getUsers((err, resp) => {
    res.json(err || resp);
  });
});

router.put('/:idHistoria/usuarios/:idUsuario/pistas/:idPista', (req, res) => {
  req.app.get('usersManager').progresaHistoria(req.params.idUsuario, req.params.idHistoria, req.params.idPista, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;
