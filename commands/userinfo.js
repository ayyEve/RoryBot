module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!userinfo") == 0) {
    
    var user = msg.author;
    if (msg.mentions.length > 0) user = msg.mentions[0];

    msg.getData(user, (data) => {
      bot.reply(msg, `here are the stats for ${user.name} ${"```"}
        name: ${user.name}
        id: ${user.id}
        last message: ${msg.timestamp - data.lastTime}
        level: ${data.level}
        xp: ${data.xp}
        rank: ${msg.roleNames[data.level]} ${"```"}`);
    });
    return;
  }
  next();
}
