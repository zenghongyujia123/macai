/**
 * Created by zenghong on 2017/8/8.
 */
'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
  config = require('./config/config'),
  setup = require('./config/setup')();

// Init the express application
var app = require('./config/express')();


var fs = require('fs'),
  https = require('https');
// key = fs.readFileSync(config.certification.privatekey),
// cert = fs.readFileSync(config.certification.certificate);


process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});


if (process.env.NODE_ENV === 'development') {
  app.listen(config.port);
}

app.listen(config.port);
// Sta
// rt the app by listening on <port>


var pinyin = require("pinyin");

console.log(pinyin("中心"));    // [ [ 'zhōng' ], [ 'xīn' ] ]
console.log(pinyin("中心", {
  heteronym: true               // 启用多音字模式
}));                            // [ [ 'zhōng', 'zhòng' ], [ 'xīn' ] ]
console.log(pinyin("中心", {
  heteronym: true,              // 启用多音字模式
  segment: true                 // 启用分词，以解决多音字问题。
}));                            // [ [ 'zhōng' ], [ 'xīn' ] ]
console.log(pinyin("安慰", {
  style: pinyin.STYLE_FIRST_LETTER // 设置拼音风格
}));
exports = module.exports = app;
console.log('========================Main Server=====================');
console.log('Main Server!');
console.log('enviroment:', process.env.NODE_ENV);

console.log('z application started on address ' + config.serverAddress);
console.log('z application started on port ' + config.port);
console.log('z application started on country ' + config.country);
console.log('z application started on title ' + config.app.description);
