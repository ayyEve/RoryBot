module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!promote") == 0) {
    if (msg.author.id != "138765720614993920") return

    var user = msg.author;
    if (msg.mentions.length > 0) user = msg.mentions[0];

    msg.getData(user, (data) => {
      if (data.level >= 15) return;
      data.level++;
      msg.db.update({_id:user.id}, {level:data.level, xp:data.xp});
      bot.reply(msg, `has promoted ${user.mention()} to level ${data.level}!`);
      msg.author = user;
      msg.rankUp(bot, msg, data);
    });
    return;
  }
  next();
}
