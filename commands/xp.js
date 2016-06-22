module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!xp") == 0) {
    if (msg.mentions.length > 0) {
      msg.getData(msg.mentions[0], (data) => {
        var xp = data.xp.toFixed(2);
        bot.reply(msg, `${msg.mentions[0].name} has ${xp} LewdXP :3c`);
      });
    } else {
      msg.getData(msg.author, (data) => {
        var xp = data.xp.toFixed(2);
        bot.reply(msg, `you have ${xp} LewdXP :3c`);
      });
    }
    return;
  }
  next();
}
