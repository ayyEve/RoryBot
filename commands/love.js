var messages = [];
messages.push("you are an amazing person!");
messages.push("you can do it!");
messages.push("you need to know that everyone cares about you");

module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!love") === 0) {
    bot.reply(msg, messages[Math.floor(Math.random() * messages.length)]);
    return;
  }
  next();
}
