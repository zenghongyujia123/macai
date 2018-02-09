/**
 * Created by zenghong on 2017/8/8.
 */

var qiniu = require('qiniu');
qiniu.conf.ACCESS_KEY = '2ZL-HVYMoDc9m-nCnr1J_QDIJNRN8nfi3JWvWhtL';
qiniu.conf.SECRET_KEY = '7oeAB2iQIHovgxK4lNAaXhMEeqGWd3D-YigAkdlL';

var mac = new qiniu.auth.digest.Mac(qiniu.conf.ACCESS_KEY, qiniu.conf.SECRET_KEY);

var options = {
  scope: 'maicai',
};

exports.uptoken = function (req, res, next) {
  req.data = {
    uptoken: new qiniu.rs.PutPolicy(options).uploadToken(mac)
  };
  return next();
};