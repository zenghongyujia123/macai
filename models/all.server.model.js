/**
 * Created by zenghong on 2017/8/8.
 */
module.exports = function (appDb) {
  require('./user')(appDb);
  require('./market')(appDb);
  require('./goods')(appDb);
  require('./banner')(appDb);
  require('./user_wechat')(appDb);
  require('./shippment')(appDb);
  require('./message')(appDb);
};