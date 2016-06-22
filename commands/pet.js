module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!pet") === 0) {
    return bot.sendMessage(msg.channel, "_purrs_ :3");
  }
  next();
}
