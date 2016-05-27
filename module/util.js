/**
 * Nodejs端工具类
 */

var crypto = require('crypto');
var util = {};

/**
 * 对字符串进行md5编码
 * @param   str 
 * @return  
 */
util.md5Encode = function(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

module.exports = util;