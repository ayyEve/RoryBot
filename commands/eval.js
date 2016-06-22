module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!eval") == 0) {
    if (msg.author.id != "138765720614993920") return;
    msg.content = msg.content
    .replace("pow", "Math.pow")
    .replace("cos", "Math.cos")
    .replace("tan", "Math.tan")
    .replace("sin", "Math.sin")
    .replace("sqrt", "Math.sqrt")
    .replace("pi", "Math.PI")
    try {
      bot.reply(msg, eval(msg.content.replace("!eval", "")))
    } catch (e) {
      bot.reply(msg, e.message)
    }
  }
  next();
}
