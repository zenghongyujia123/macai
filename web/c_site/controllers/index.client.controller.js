/**
 * Created by elinaguo on 15/12/28.
 */

//#region 扩展方法

/*
 * 以下函数为新增功能函数，之后需要移动存放位置，但不影响使用
 */
//<editor-fold desc="扩展方法">
String.prototype.Trim = function () {
  /// <summary>
  /// 字符串去除前后空格
  /// </summary>
  /// <returns type=""></returns>
  return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.LTrim = function () {
  /// <summary>
  /// 字符串去除左边空格
  /// </summary>
  /// <returns type=""></returns>
  return this.replace(/(^\s*)/g, "");
};
String.prototype.RTrim = function () {
  /// <summary>
  /// 字符串去除右边空格
  /// </summary>
  /// <returns type=""></returns>
  return this.replace(/(\s*$)/g, "");
};
String.prototype.PadLeft = function (padChar, count) {
  /// <summary>
  /// 字符串去除左边空格
  /// </summary>
  var temp = this;
  while (temp.length < count)
    temp = padChar + temp;
  return temp;
};

String.Format = function () {
  /// <summary>
  /// 字符串格式化函数(C#同质化的字符串格式化函数)
  /// </summary>
  /// <returns type=""></returns>
  if (arguments.length == 0)
    return null;
  var str = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
    str = str.replace(re, arguments[i]);
  }
  return str;
};

String.prototype.testMail = function () {
  var mailReg = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,}){1,2})$/;
  if (!mailReg.test(this)) {
    return false;
  }

  return true;
};

String.prototype.testPhone = function () {
  var phoneReg = /^((\+?[0-9]{2,2}))?1\d{10}$/;
  if (!phoneReg.test(this)) {
    return false;
  }

  return true;
};

String.prototype.testIntNumber = function () {
  return /^\d+$/.test(this);
};

String.prototype.testInternationalPhone = function () {
  var phoneReg = /^\+[0-9]+$/;
  if (!phoneReg.test(this)) {
    return false;
  }

  return true;
};

Date.prototype.Format = function (fmt) {
  /// <summary>
  /// 对Date的扩展，将 Date 转化为指定格式的String
  /// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  /// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  /// 例子：
  /// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  /// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  /// </summary>
  /// <param name="fmt"></param>
  /// <returns type=""></returns>
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};


/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.Pattern = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,          //月份
    "d+": this.getDate(),               //日
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    "H+": this.getHours(),              //小时
    "m+": this.getMinutes(),            //分
    "s+": this.getSeconds(),        //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

Date.prototype.goToDayBeginning = function () {
  this.setHours(0);
  this.setMinutes(0);
  this.setSeconds(0);
  this.setMilliseconds(0);
};

Date.prototype.goToDayEnding = function () {
  this.setHours(23);
  this.setMinutes(59);
  this.setSeconds(59);
  this.setMilliseconds(999);
};

//临时处理日期时间不正确的问题
Date.prototype.toJSON = function () {
  return this.Format("yyyy-MM-ddThh:mm:ss.S+08:00")
};
//</editor-fold>

function jsonTimeConvertToDate(jsonTime) {
  var timeString = jsonTime.replace(/\/Date\((\d+)\)\//gi, "$1");
  return new Date(parseInt(timeString));
}

function iterateArray(dataArray, index, eachCallback, resultCallback) {
  if (dataArray.length === index) {
    return resultCallback();
  }
  var dataItem = dataArray[index];
  eachCallback(dataItem, index, function (err) {
    if (err) {
      return resultCallback(err);
    }
    index += 1;
    return iterateArray(dataArray, index, eachCallback, resultCallback);
  });
}

//eachCallback = function(handleItem, handleCallback);
Array.prototype.asyncEachSeries = function (eachCallback, resultCallback) {
  var dataArray = this;
  if (dataArray.length === 0) {
    return resultCallback();
  }
  var index = 0;
  iterateArray(dataArray, index, eachCallback, resultCallback);
};

Array.prototype.distinct = function () {
  if (this.length === 0) {
    return [];
  }
  return this.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  });
};
//#endregion 扩展方法

//检测浏览器缩放
function detectBrowserZoom() {
  /// <summary>
  /// 检测浏览器缩放 100：无缩放，>100：被放大，<100：被缩小
  /// </summary>
  /// <returns type="number">缩放百分比</returns>
  var ratio = 0,
    screen = window.screen,
    ua = navigator.userAgent.toLowerCase();

  if (ua.indexOf('firefox') > -1) {
    if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio;
    }
  }
  else if (ua.indexOf('msie') > -1) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  }
  else if (window.outerWidth && window.innerWidth) {
    ratio = window.outerWidth / window.innerWidth;
  }

  if (ratio) {
    ratio = Math.round(ratio * 100);
  }

  return ratio;
}

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null)
    return unescape(r[2]);
  else
    return null; //返回参数值
}

function getQueryParams() {
  /// <summary>
  /// 获取请求参数
  /// </summary>
  /// <param name="name"></param>
  /// <returns type=""></returns>
  var url = location.href;
  var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
  var paraObj = {};

  for (var i = 0, l = paraString.length; i < l; i++) {
    var j = paraString[i];
    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
  }

  return paraObj;
}

//阻止事件冒泡
function stopBubble(e) {
  if (e && e.stopPropagation)
    e.stopPropagation(); //非IE
  else
    window.event.cancelBubble = true; //IE
}
//阻止浏览器默认行为
function preventDefault(e) {
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    window.event.returnValue = false;
  }
}

function getGlobalLanguageTextByName(textTemplate) {

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      if (arguments[i].toString()) {
        textTemplate = textTemplate.replace('{{value' + i + '}}', arguments[i]);
      }
    }
  }

  return textTemplate;
}

/**
 * encode string by utf8
 * @param  {String} argString to encode
 * @return {String} encoded string
 */
function globalUtf8Encode(argString) {
  // http://kevin.vanzonneveld.net
  // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: sowberry
  // +    tweaked by: Jack
  // +   bugfixed by: Onno Marsman
  // +   improved by: Yves Sucaet
  // +   bugfixed by: Onno Marsman
  // +   bugfixed by: Ulrich
  // +   bugfixed by: Rafal Kukawski
  // +   improved by: kirilloid
  // +   bugfixed by: kirilloid
  // *     example 1: this.utf8_encode('Kevin van Zonneveld');
  // *     returns 1: 'Kevin van Zonneveld'

  if (argString === null || typeof argString === 'undefined') {
    return '';
  }

  var string = (argString + ''); // .replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  var utftext = '',
    start, end, stringl = 0;

  start = end = 0;
  stringl = string.length;
  for (var n = 0; n < stringl; n++) {
    var c1 = string.charCodeAt(n);
    var enc = null;

    if (c1 < 128) {
      end++;
    } else if (c1 > 127 && c1 < 2048) {
      enc = String.fromCharCode(
        (c1 >> 6) | 192, (c1 & 63) | 128
      );
    } else if (c1 & 0xF800 ^ 0xD800 > 0) {
      enc = String.fromCharCode(
        (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
      );
    } else { // surrogate pairs
      if (c1 & 0xFC00 ^ 0xD800 > 0) {
        throw new RangeError('Unmatched trail surrogate at ' + n);
      }
      var c2 = string.charCodeAt(++n);
      if (c2 & 0xFC00 ^ 0xDC00 > 0) {
        throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
      }
      c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
      enc = String.fromCharCode(
        (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
      );
    }
    if (enc !== null) {
      if (end > start) {
        utftext += string.slice(start, end);
      }
      utftext += enc;
      start = end = n + 1;
    }
  }

  if (end > start) {
    utftext += string.slice(start, stringl);
  }

  return utftext;
}

/**
 * encode data by base64
 * @param  {String} data to encode
 * @return {String} encoded data
 */
function globalBase64Encode(data) {
  // http://kevin.vanzonneveld.net
  // +   original by: Tyler Akins (http://rumkin.com)
  // +   improved by: Bayron Guevara
  // +   improved by: Thunder.m
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Pellentesque Malesuada
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // -    depends on: this.utf8_encode
  // *     example 1: this.base64_encode('Kevin van Zonneveld');
  // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  // mozilla has this native
  // - but breaks in 2.0.0.12!
  //if (typeof this.window['atob'] == 'function') {
  //    return atob(data);
  //}
  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    enc = '',
    tmp_arr = [];

  if (!data) {
    return data;
  }

  data = globalUtf8Encode(data + '');

  do { // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  switch (data.length % 3) {
    case 1:
      enc = enc.slice(0, -2) + '==';
      break;
    case 2:
      enc = enc.slice(0, -1) + '=';
      break;
  }

  return enc;
}

function globalUrlSafeBase64Encode(text) {
  return globalBase64Encode(text).replace(/\//g, '_').replace(/\+/g, '-');
}

/**
 * Created by louisha on 15/12/29.
 */
var userAgent = navigator.userAgent.toLowerCase();

function getServerAddress() {
  return window.location.protocol + '//' + window.location.host;
}

function isLocalServer(location) {
  var result = false;
  ['192.168.', '127.0.0.1', 'localhost'].forEach(function (item) {
    if (location.hostname.indexOf(item) !== -1) {
      result = true;
    }
  });
  return result;
}
function isTestServer(location) {
  return location.hostname.indexOf('zhuzhu1688') !== -1;
}
function isProductServer(location) {
  return location.hostname.indexOf('agilepops') !== -1;
}
function getServiceAddressByCountry(country) {
  var location = window.location;
  var serverAddress;
  if (isLocalServer(location)) {
    serverAddress = location.protocol + '//' + location.hostname + (country === 'china' ? ':4002' : ':8002');
  }
  else if (isTestServer(location)) {
    serverAddress = location.protocol + '//' + location.hostname + (country === 'china' ? '' : ':8001');
  }
  else if (isProductServer(location)) {
    serverAddress = location.protocol + '//' + (country === 'china' ? 'agilepops.com' : 'en.agilepops.com');
  }
  else {
    serverAddress = getServerAddress();
  }

  return serverAddress;
}
function getCountryByAddress() {
  var location = window.location;
  var country = 'china';

  if (isLocalServer(location)) {
    if (location.port === '8002') {
      country = 'philippines';
    }
  }
  else if (isTestServer(location)) {
    if (location.port === '8001') {
      country = 'philippines';
    }
  }
  else if (isProductServer(location)) {
    if (location.host.indexOf('en.') !== -1) {
      country = 'philippines';
    }
  }
  else {
    var country = 'china';
  }

  return country;
}


function getCurrentDevice() {
  if (/iphone|ipad|ipod/gi.test(window.navigator.userAgent)) {
    return 'ios';
  } else if (/android/gi.test(window.navigator.userAgent)) {
    return 'android';
  } else {
    return 'web';
  }
}

function isWechatBroswer() {
  var matchResult = window.navigator.userAgent.match(/MicroMessenger/i);
  if (matchResult) {
    return matchResult.toString() === 'micromessenger';
  } else {
    return false;
  }
}

/**
 * Created by lance on 16/10/11.
 */

'use strict';

$(function () {
  var globalLanguageDic = { "site_template_text_siteTitle": "A+现场 - 通过专业众包为企业客户提供终端执行督查，神秘访客，店内营销和深度分销服务，是尼尔森的战略合作伙伴", "site_template_text_description": "A+现场平台汇集数万名快消业务员，理货员，促销员，神秘访客，为企业客户提供门店执行督查，神秘访客，店内营销和深度分销服务。客户包括尼尔森，蒙牛，三全等", "site_template_text_keywords": "神秘访客,深度分销,终端督查,尼尔森,OSA,陈列标准,分销标准,理货,门店观察,门店执行,终端执行,店内营销,快消大数据,IMS", "site_template_text_siteTitleTest": "A g i l e测试版", "site_template_text_siteTitleMengniu": "蒙牛访店调查", "site_template_text_descriptionMengniu": "蒙牛访店调查", "site_template_text_keywordsMengniu": "蒙牛访店调查", "site_template_text_siteTitleMengniuTest": "蒙牛测试版", "site_template_text_siteTitleEnterprise": "A+现场专业版访店调查", "site_template_text_descriptionEnterprise": "A+现场专业版访店调查", "site_template_text_keywordsEnterprise": "A+现场专业版访店调查", "site_template_text_siteTitleEnterpriseTest": "A+现场专业版测试版", "site_template_text_username": "用户名", "site_template_text_password": "密码", "site_template_text_login": "登录", "site_template_text_taskPageBigTitle": "最专业的企业任务众包平台", "site_template_text_taskPageSubtitle": "一分钟拥有百万雇员,帮您洞见市场,推广业务", "site_template_text_pointShop": "积分商城", "site_template_text_myPoint": "我的积分", "site_template_text_noEnoughPoint": "您当前的积分还不够哦", "site_template_text_earnMorePoint": "快去赚取更多积分吧", "site_template_text_confirm": "确定", "site_template_text_disneyDoubleTicket": "上海迪士尼双人票", "site_template_text_redmi3s": "红米3S", "site_template_text_point": "豆", "site_template_text_someMoneyExchange": "{{value1}}元兑换", "site_template_text_invalidParams": "提交参数不正确", "site_template_text_invalidUsername": "无效的用户名", "site_template_text_invalidPassword": "密码错误", "site_template_text_serverError": "服务器错误", "site_template_text_accountNotExist": "用户账户不存在", "site_template_text_accountHadDeleted": "用户账户已删除", "site_template_text_accountNotMatch": "账户不匹配，请核对账户名密码信息", "site_template_text_pleaseInputUsername": "请输入用户名", "site_template_text_pleaseInputPassword": "请输入密码", "site_template_text_serverReject": "服务器拒绝链接", "site_template_text_loginFailed": "登录失败", "site_template_text_downloadApp": "下载App", "site_template_text_salesmanAppDownload": "配送员App下载", "site_template_text_scanDownload": "扫描下载", "site_template_text_or": "或", "site_template_text_directDownload": "点此直接下载", "site_template_text_downloadIOSText": "请前往App Store下载“顺手赚”", "site_template_text_privacy_title": "隐私政策", "site_template_text_privacy_brief": "顺手赚尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，顺手赚会按照本隐私权政策的规定使用和披露您的个人信息。但顺手赚将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，顺手赚不会将这些信息对外披露或向第三方提供。顺手赚会不时更新本隐私权政策。您在同意顺手赚服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于顺手赚服务使用协议不可分割的一部分。", "site_template_text_privacy_paragraph1_title": "适用范围", "site_template_text_privacy_paragraph1_row1": "在您注册顺手赚帐号时，您根据顺手赚要求提供的个人注册信息。", "site_template_text_privacy_paragraph1_row2": "在您使用顺手赚网络服务，顺手赚自动接收并记录的您的手机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据。", "site_template_text_privacy_paragraph2_title": "信息的使用", "site_template_text_privacy_paragraph2_row1": "获得您的数据之后，顺手赚会将其上传至服务器，以生成您的排行榜数据，方便您能够更好地使用服务。", "site_template_text_privacy_paragraph3_title": "信息披露", "site_template_text_privacy_paragraph3_row1": "顺手赚不会将您的信息披露给不受信任的第三方。", "site_template_text_privacy_paragraph3_row2": "根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露。", "site_template_text_privacy_paragraph3_row3": "如您出现违反中国有关法律、法规或者顺手赚服务协议或相关规则的情况，需要向第三方披露。", "site_template_text_privacy_paragraph4_title": "信息存储和交换", "site_template_text_privacy_paragraph4_row1": "顺手赚收集的有关您的信息和资料将保存在顺手赚及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或顺手赚收集信息和资料所在地的境外并在境外被访问、存储和展示。", "site_template_text_privacy_paragraph5_title": "信息安全", "site_template_text_privacy_paragraph5_row1": "顺手赚帐号均有安全保护功能，请妥善保管您的用户名及密码信息。顺手赚通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。", "site_template_text_index_page": "首页", "site_template_text_price": "价格", "site_template_text_we": "我们", "site_template_text_index_sign_in_main_title1": "您在终端", "site_template_text_index_sign_in_main_title2": "十万双专业的眼和手", "site_template_text_index_sign_in_sub_title": "按需使用，按效果付费", "site_template_text_index_description1_main_title": "A+现场用共享经济模式为消费品企业提供一站式服务，用大数据和科技让您的线下销售变得敏捷，精益，实现有利润的增长。", "site_template_text_index_description1_sub_title1": "理货补货", "site_template_text_index_description1_sub_title2": "门店调查", "site_template_text_index_description1_sub_title3": "新店&评级", "site_template_text_index_description1_details1": "比竞争对手的货更好、更快地出现在货架上", "site_template_text_index_description1_details2": "产品分销、陈列、促销合规、竞品、导购员在岗情况...想查什么就查什么", "site_template_text_index_description1_details3": "基于互联网大数据，千里之外对门店变化了然于胸", "site_template_text_index_description2_main_title": "A+理货/补货服务", "site_template_text_index_description2_sub_title": "比竞争对手的产品更快，更好的出现在货架上", "site_template_text_index_description2_details": "货架有货率（OSA)每提升2%，就会带来1%的销售提升。那些门店？什么时段做？完全由您控制！", "site_template_text_index_description3_main_title": "A+核查服务", "site_template_text_index_description3_sub_title": "千里之外，店内一切，您所见的就是消费者所见", "site_template_text_index_description3_details1": "·陈列合规", "site_template_text_index_description3_details2": "·促销检查", "site_template_text_index_description3_details3": "·价格", "site_template_text_index_description3_details4": "·铺货情况", "site_template_text_index_description3_details5": "·新品上市", "site_template_text_index_description3_details6": "·竞品", "site_template_text_index_description4_main_title": "A+新店发现&评级服务", "site_template_text_index_description4_sub_title": "高科技带您告别扫街", "site_template_text_index_description4_details": "来自高德、大众点评的2000万条大数据告诉你店在哪里，周边繁华程度，直击街景", "site_template_text_index_description5_main_title": "我们的客户", "site_template_text_index_about_us_title": "关于我们", "site_template_text_index_about_us_subtitle": "A+现场由来自联合利华、Yum! Brands、三星等消费品和零售行业专家，以及来自腾讯、阿里的互联网技术专家联合创立。", "site_template_text_index_about_us1_subtitle": "我们相信快递员不会是商品接触消费者的唯一渠道，", "site_template_text_index_about_us2_subtitle": "我们也相信消费品制造商沿用了十几年的人海战术无法适应新的经济常态，", "site_template_text_index_about_us3_subtitle": "我们更相信按需雇佣, 大数据, 移动互联网技术是制造商们在竞争中胜出的必备武器。", "site_template_text_index_about_us_team_member": "团队成员", "site_template_text_index_about_us_institutional_investors": "投资机构", "site_template_text_index_about_us_investors_name": "蓝驰创投", "site_template_text_index_about_us_investors_details": "蓝驰创投（BlueRun Ventures）成立于1998年，是一家专注早期创业公司的环球风险投资公司，管理基金超过10亿美元，国内成功投资案例包括：唱吧、赶集网、美丽说、趣分期等知名互联网企业。", "site_template_text_index_appointment_hint": "想试一试？请留下您的邮箱", "site_template_text_index_appointment": "预约演示", "site_template_text_index_top_appointment": "预约演示", "site_template_text_index_serial_number": "许可证编号：沪ICP备15056015", "site_template_text_index_price_top_title": "选择一种最适合您企业的增值服务", "site_template_text_index_price_bottom_title": "准备好了解更多关于A+现场的内容了吗？", "site_template_text_index_price_service_shop_big_data_free_name": "门店大数据（Free）", "site_template_text_index_price_service_shop_big_data_free_mode": "/月", "site_template_text_index_price_service_shop_big_data_free_content1": "·累计10000家门店/账户", "site_template_text_index_price_service_shop_big_data_free_content2": "·免费查看", "site_template_text_index_price_service_shop_big_data_free_content3": "·街景地图", "site_template_text_index_price_service_recommend": "优惠推荐", "site_template_text_index_price_service_shop_big_data_business_name": "门店大数据（企业版）", "site_template_text_index_price_service_shop_big_data_business_mode": "／人/月", "site_template_text_index_price_service_shop_big_data_business_content1": "·无限次数查看门店", "site_template_text_index_price_service_shop_big_data_business_content2": "·街景地图", "site_template_text_index_price_service_shop_big_data_business_content3": "·导出额外0.5元/门店", "site_template_text_index_price_service_tally_and_replenishment_name": "理货&补货服务", "site_template_text_index_price_service_tally_and_replenishment_mode": "／店次起", "site_template_text_index_price_service_shop_verification_name": "门店核查", "site_template_text_index_price_service_shop_verification_mode": "/店次起", "site_template_text_index_price_service_shop_verification_content1": "或99元/用户/月", "site_template_text_index_price_service_shop_verification_content2": "作为SASS软件，供企业内部稽查团队使用", "site_template_text_index_price_service_find_new_shop_and_rating_name": "新店发现&评级", "site_template_text_index_price_service_find_new_shop_and_rating_mode": "／店次起", "site_template_text_index_about_us_team_leader": "联合创始人", "site_template_text_index_about_us_member1_details_1": "Allen在消费品及零售行业拥有超过10年的科技解决方案和大数据分析建模经验曾创办快消品外勤销售管理SAAS公司, 服务欧莱雅,美赞臣, 雀巢等20余家大型公司曾任百胜餐饮战略规划经理, 对零售业大数据分析有深度研究。 ", "site_template_text_index_about_us_member1_details_2": "中欧商学院MBA ", "site_template_text_index_about_us_member2_details_1": "Micole在消费品行业拥有20年销售管理经验,曾任联合利华亚太区销售总监, Trade Marketing经理.对快消品的渠道管理,通路行销,店内营销有深度洞察和丰富的经验。", "site_template_text_index_about_us_member2_details_2": "菲律宾大学管理学士", "site_template_text_index_about_us_member3_details_1": "Marla在消费品行业拥有超过20年工作经验, 曾在强生, 辉瑞,庄臣等公司担任销售总监, Trade Marketing经理, 销售运营经理等职务。", "site_template_text_index_about_us_member3_details_2": "MBA, Ateneo Graduate School of Business", "site_template_text_index_about_us_member4_details": "James最富经验的移动应用开发者之一曾任WPP旗下快消品店内营销执行公司的产品总监上海交大计算机硕士,山东大学计算机学士 ", "site_template_text_index_please_enter_the_correct_email_address": "请输入正确的邮箱地址", "site_template_text_index_team_job_1": "Founder & CEO", "site_template_text_index_team_job_2": "海外业务总裁", "site_template_text_index_team_job_3": "总经理,菲律宾市场", "site_template_text_back": "退出", "site_template_text_please_input_name": "请输入您的名字", "site_template_text_please_input_company_name": "请输入您的公司的名称", "site_template_text_please_input_phone": "请输入正确的手机号码", "site_template_text_appointment_success": "感谢您的支持! 我们会尽快与您取得联系。", "site_template_text_your_company_name": "您公司的名称", "site_template_text_your_nick_name": "您的姓名", "site_template_text_your_email": "您的邮箱", "site_template_text_your_telephone": "您的手机号码", "site_template_text_index_copyright": "© 2016 - 豆角科技 版权所有", "site_template_text_index_contact_box_description": "您可以通过电子邮件联系我们", "site_template_text_index_contact_box_value": "bd@agilepops.com", "site_template_text_please_use_safari": "请使用safari浏览器下载", "site_template_text_app_cannot_install": "该系统没有适用的版本", "site_template_text_title_input_answer": "顺手赚钱数据录入", "site_template_text_tip_input_answer": "使用\"顺手赚钱\"app扫码登录", "siteTitle": "牛人搭档" };
  var mainPage = $('.new-index-view');
  var userInfoList = [];
  var pageElement = {
    username: mainPage.find('.manage-login-form .username input'),
    password: mainPage.find('.manage-login-form .password input'),
    submit: mainPage.find('.manage-login-form .submit button'),
    usernameList: mainPage.find('.manage-login-form .username .username-list'),
    topTips: mainPage.find('.manage-login-form .error-tip'),
    downloadApp: $('body').find('.header .download-mengniu-app-china')
  };

  var signInObject = {
    error: {
      param_null_error: globalLanguageDic.site_template_text_invalidParams,
      invalid_account: globalLanguageDic.site_template_text_invalidUsername,
      invalid_password: globalLanguageDic.site_template_text_invalidPassword,
      database_query_error: globalLanguageDic.site_template_text_serverError,
      account_not_exist: globalLanguageDic.site_template_text_accountNotExist,
      account_deleted: globalLanguageDic.site_template_text_accountHadDeleted,
      account_not_match: globalLanguageDic.site_template_text_accountNotMatch
    },
    showTip: function (text) {
      if (text) {
        pageElement.topTips.text(text);
        pageElement.topTips.show();
      }
      else {
        pageElement.topTips.text('');
        pageElement.topTips.hide();
      }
    },
    submit: function (username, password, callback) {
      if (!username) {
        return callback(globalLanguageDic.site_template_text_pleaseInputUsername);
      }
      if (!password) {
        return callback(globalLanguageDic.site_template_text_pleaseInputPassword);
      }
      var country = getCountryByAddress();
      var serverAddress = getServerAddress();

      this.showTip('');
      var str = '';
      for (var i = 0; i < password.length; i++) {
        str += "·";
      }
      pageElement.password.val(str);
      console.log(pageElement.password.val());
      pageElement.password.attr('type', 'text');
      $.ajax({
        url: serverAddress + '/api_backend/signin',
        type: 'post',
        dataType: 'json',
        data: {
          username: username.Trim(),
          password: password,
          language: $.cookie('cookie_language') || (country === 'china' ? 'zh_CN' : 'en'),
          country: country
        },
        success: function (data) {
          resetPasswordStyle(password);
          if (data.err) {
            return callback(signInObject.error[data.err.type] || globalLanguageDic.site_template_text_serverError);
          }
          if (data.code === 'ECONNREFUSED') {
            return callback(globalLanguageDic.site_template_text_serverReject);
          }

          if (data.success) {
            $.cookie('agilepops_username', username, { expires: 3650, path: '/' });
            $.cookie('agilepops_password', password, { expires: 3650, path: '/' });
            var userInfo = {
              username: username,
              password: password
            };
            for (var i = 0; i < userInfoList.length; i++) {
              if (userInfoList[i].username === username) {
                break;
              }
            }
            if (i < userInfoList.length) {
              userInfoList.splice(i, 1);
            }
            userInfoList.splice(0, 0, userInfo);
            $.cookie('agilepops_user_info_list', JSON.stringify(userInfoList), { expires: 3650, path: '/' });
            window.location = '/page_admin';
          }
          else {
            return callback(globalLanguageDic.site_template_text_loginFailed);
          }
        },
        error: function (err) {
          resetPasswordStyle(password);
          return callback(globalLanguageDic.site_template_text_serverError);
        }
      });
    }
  };

  function resetPasswordStyle(password) {
    pageElement.password.val(password);
    pageElement.password.attr('type', 'password');
  }

  function inputItemHtmlToUserInfoList(list) {
    pageElement.usernameList.empty();
    if (!list || list.length === 0) {
      return;
    }
    for (var i = 0; i < list.length; i++) {
      var userInfo = list[i];
      var str = $('<li class="list-item" index="' + i + '"  spwd="' + userInfo.password + '">' + userInfo.username + '</li>');
      str.on('mousedown', function () {
        var item = $(this);
        pageElement.username.val(item.text());
        pageElement.password.val(item.attr('spwd'));
        pageElement.usernameList.slideUp('fast');
      });
      pageElement.usernameList.append(str);
    }
  }

  function isShowElementUsernameList(isShow) {
    pageElement.usernameList.children().removeClass('select');
    if (isShow && pageElement.usernameList.find('.list-item').length > 0) {
      pageElement.usernameList.slideDown('fast');
    } else {
      pageElement.usernameList.slideUp('fast');
    }
  }

  function init() {
    $('.header-mask').css('opacity', 0.8);
    pageElement.submit.click(function (e) {
      var username = pageElement.username.val();
      var password = pageElement.password.val();
      signInObject.submit(username, password, function (errText) {
        signInObject.showTip(errText);
      });
      preventDefault(e);
    });

    pageElement.username.val($.cookie('agilepops_username') || '');
    pageElement.password.val($.cookie('agilepops_password') || '');
    pageElement.username.on('focus focusout input propertychange', function (e) {
      switch (e.type) {
        case 'focus':
          isShowElementUsernameList(true);
          break;
        case 'focusout':
          isShowElementUsernameList(false);
          break;
        case 'input':
        case 'propertychange':
          var newList = userInfoList;
          var inputStr = pageElement.username.val();
          if (!!inputStr) {
            newList = userInfoList.filter(function (userInfo) {
              return userInfo.username.indexOf(inputStr) !== -1;
            });
          }
          inputItemHtmlToUserInfoList(newList);
          isShowElementUsernameList(true);
          break;
      }
    });
    pageElement.username.keydown(function (e) {
      console.log(e.which || e.keyCode);
      switch (e.which || e.keyCode) {
        case 38: //up
          var selectItem = pageElement.usernameList.find('.list-item.select');
          var selectIndex = -1;
          if (selectItem.length > 0) {
            selectIndex = parseInt(selectItem.attr('index'));
          }
          selectIndex -= 1;
          if (selectIndex >= 0) {
            selectItem.removeClass('select');
            selectItem = pageElement.usernameList.find('.list-item[index=' + selectIndex + ']');
            selectItem.addClass('select');
            pageElement.username.val(selectItem.text());
            pageElement.password.val(selectItem.attr('spwd'));
          }
          break;
        case 40: //down
          var length = pageElement.usernameList.find('.list-item').length;
          var selectItem = pageElement.usernameList.find('.list-item.select');
          var selectIndex = -1;
          if (selectItem.length > 0) {
            selectIndex = parseInt(selectItem.attr('index'));
          }
          selectIndex += 1;
          if (selectIndex < length) {
            selectItem.removeClass('select');
            selectItem = pageElement.usernameList.find('.list-item[index=' + selectIndex + ']');
            selectItem.addClass('select');
            pageElement.username.val(selectItem.text());
            pageElement.password.val(selectItem.attr('spwd'));
          }
          break;
      }
    });


    var userInfoListStr = $.cookie('agilepops_user_info_list');
    if (userInfoListStr) {
      userInfoList = JSON.parse(userInfoListStr);
      inputItemHtmlToUserInfoList(userInfoList || []);
    }
  }

  init();
}
);
