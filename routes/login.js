const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use((req, res, next) => {
  console.log(`${req.method} /login${req.path}`);
  next();
});

router.get('/user', (req, res) => {
  console.log('Android login');
  console.log(req.headers);
  req.app.get('loginManager').processAndroidLogin(req.headers.authorization, (err, userInfo) => {
    if (err && err !== 'NO_EXIST') {
      console.error(err);
      console.log('WTF');
      res.status(500).send();
    } else if (err === 'NO_EXIST') {
      console.log('404');
      res.status(404).send();
    } else {
      res.json(userInfo);
    }
  });
});


router.post('/register', (req, res) => {
  console.log(req.body);
  req.app.get('loginManager').registerUser(req.body, (err, resp) => {
    if (err) {
      console.error(err);
      res.error(err);
    } else {
      console.log(resp);
      res.json(resp);
    }
  });
});
router.post('/web', (req, res) => {
  console.log('WEB LOGIN');
  req.app.get('loginManager').processWebLogin(req.body, (err) => {
    if (err && err !== 'NO_EXIST') {
      console.error(err);
      console.log('WTF');
      res.status(500).send();
    } else if (err === 'NO_EXIST') {
      console.log('404');
      res.status(404).send();
    } else {
      res.status(201).send();
    }
  });
});

router.post('/auto', (req, res) => {
  req.app.get('loginManager').processAuto((err, userInfo) => {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      console.log(userInfo);
      res.json(userInfo);
    }
  });
});

module.exports = router;
