module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!ranks") == 0) {
    var out = "```";
    for (i = 0; i < msg.roleNames.length; i++)
      out += `${i}: ${msg.roleNames[i]}\n`
    bot.reply(msg, `here are the ranks: ${out}`)
  }
  next();
}
