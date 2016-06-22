module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!level") == 0) {
    if (msg.mentions.length > 0) {
      msg.getData(msg.mentions[0], (data) => {
        var level = data.level;
        bot.reply(msg, `${msg.mentions[0].name} is level ${level} (${msg.roleNames[level]}) with ${data.xp.toFixed(2)}/${msg.xpForLevels[level]} LewdXP :3c`);
      });
    } else {
      msg.getData(msg.author, (data) => {
        var level = data.level;
        bot.reply(msg, `you are level ${level} (${msg.roleNames[level]}) with ${data.xp.toFixed(2)}/${msg.xpForLevels[level]} LewdXP :3c`);
      });
    }
    return;
  }
  next();
}
