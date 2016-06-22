var request = require('request');
var apiKey = "A2B446A003D63E25030D1C42689DA64ED081E5BD";
var limit = 3;

module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!rule34") === 0) {

    request(`https://ibsearch.xxx/api/v1/images.json?q=${msg.content.substring("!rule34 ".length)}&limit=${limit}&key=${apiKey}`, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        var out = "";
        body.forEach((b) => {
          out += `http://im1.ibsearch.xxx/${b.path} `;
        })
        if (out != "") bot.reply(msg, out);
        else bot.reply(msg, "Either no images were found with those tags, Eve's internet is dying, or some stupid error occurred, but there were no results")
      }
    });
    return;
  }
  next();
}
//https://ibsearch.xxx/api/v1/images?q=2girls&key=yourkeygoeshere
