const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use((req, res, next) => {
  console.log(`${req.method} /historias/${req.path}`);
  next();
});

router.get('/', (req, res) => {
  req.app.get('historiasManager').getHistorias(req.query, (err, resp) => {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      res.json(resp);
    }
  });
});

router.get('/:id', (req, res) => {
  req.app.get('historiasManager').getHistoria(req.params.id, (err, resp) => {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      console.log('out');
      console.log(resp);
      res.json(resp);
    }
  });
});

router.post('/', (req, res) => {
  req.app.get('historiasManager').createHistoria(req.body, (err) => {
    if (err) {
      console.error(err);
    } else {
      res.status(201).send();
    }
  });
});

router.get('/:idHistoria/usuarios/:idUsuario/pistas/:idPista', (req, res) => {
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
