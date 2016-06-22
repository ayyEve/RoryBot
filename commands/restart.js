module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!restart") == 0) {
    if (msg.author.id != "138765720614993920") return;
    process.exit(0);
  }
  next();
}
