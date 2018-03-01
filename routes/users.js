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

module.exports = router;
