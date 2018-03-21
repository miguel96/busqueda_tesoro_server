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
  req.app.get('loginManager').processAndroidLogin(req.body.token, (err,userInfo) => {
    if (err) {
      console.error(err)
      res.status(500).send();
    } else {
      console.log(userInfo);
      res.json(userInfo);
    }
  });
});

router.post('/web', (req, res) => {
  console.log('WEB LOGIN');
  req.app.get('loginManager').processWebLogin(req.body, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      res.status(201).send();
    }
  });
});

router.post('/android/google',(req,res)=>{
  console.log("Android login existing");
  req.app.get('loginManager').processAndroidLogin(req.body.token,(err,userInfo)=>{
    if(err) {
      console.error(err)
      res.status(500).send();
    } else {
      console.log(userInfo);
      res.json(userInfo);
    }
  })
})

module.exports = router;
