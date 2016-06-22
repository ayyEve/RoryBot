module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!flip") === 0) {
    bot.reply(msg, `flipped ${get()}`);
    return;
  }
  next();
}

function get() {
  if (Math.random() > 0.5) return "Heads";
  return "Tails";
}
