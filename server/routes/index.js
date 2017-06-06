const express = require(`express`);
const router = express.Router();

// Home Route
router.get(`*`, function(req, res) {
  res.send(`Hello! Welcome to simple-dev! Start building your api by using "dev create END_POINT_NAME"`);
});

module.exports = router;
