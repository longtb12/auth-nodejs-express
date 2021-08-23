const crypto = require('crypto')

module.exports = function(stringHash){
    const hash = crypto.createHash('sha512');
    var data = hash.update(stringHash , 'utf-8')
    return data.digest('hex')
}