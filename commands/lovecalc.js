module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!lovecalc") == 0) {
    return bot.reply(msg, `this is still a WIP ><`);
  }
  next();
}
