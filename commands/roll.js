module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!roll") === 0) {
    var max = parseInt(msg.content.substring(6));
    if (!max) max = 100;
    bot.reply(msg, `rolled ${Math.ceil(Math.random() * max)}/${max}`);
    return;
  }
  next();
}
