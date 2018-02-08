const router = require('express').Router();

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


module.exports = router;
