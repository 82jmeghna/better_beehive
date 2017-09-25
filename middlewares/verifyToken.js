var jwt = require('jsonwebtoken')

module.exports = function (req , res ,next) {
  const token = req.body.token || req.query.token || req.headers['authorization']
  if(token){
    jwt.verify(token , process.env.jwt_secret , function (err , decoded) {
      if(err){
        return res.status(401).send({
          err,
          'error': true,
          'message': 'Invalid Token',
        })
      }
      req.decoded = decoded
      next()
    })
  }else{
    return res.status(403).send({
      'error' : true,
      'message': 'Token Not Found',
    })
  }
}