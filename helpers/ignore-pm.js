
module.exports = function(bot, msg, next) {

  if (msg.channel.server == undefined) {
    return bot.reply(msg, "I am unable to process pms > <");
  }
  next();
}
