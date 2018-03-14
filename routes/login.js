const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use((req, res, next) => {
  console.log(`${req.method} /login${req.path}`);
  next();
});

router.post('/android', (req, res) => {
  console.log('Android login');
  console.log(req.body);
  req.app.get('loginManager').processAndroidLogin(req.body, (err) => {
    if (err) {
      res.json(err);
    } else {
      res.send(201).send();
    }
  });
});

router.post('/web', (req, res) => {
  console.log('WEB LOGIN');
  req.app.get('loginManager').processWebLogin(req.body, (err) => {
    if (err) {
      res.json(err);
    } else {
      res.status(201).send();
    }
  });
});
module.exports = router;
