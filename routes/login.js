const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use((req, res, next) => {
  console.log(`${req.method} /login${req.path}`);
  next();
});

router.get('/', (req, res) => {
  res.json({ url: req.app.get('googleAuth').generateAuthUrl() });
});

router.get('/callback', (req, res) => {
  const { code } = req.query;
  req.app.get('loginManager').processLogin(code, (err, resp) => {
    console.log('out');
    if (err) {
      res.json(err);
    } else {
      res.json(resp);
    }
  });
});

router.post('/web', (req, res) => {
  req.app.get('loginManager').processWebLogin(req.body, (err) => {
    if (err) {
      res.json(err);
    } else {
      res.status(201).send();
    }
  });
});
module.exports = router;
