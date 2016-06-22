module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!ds") == 0) {
    var server = msg.channel.server;

    if (msg.mentions.length > 0) {
      if (bot.memberHasRole(msg.mentions[0], msg.getRole("sub", server))) {
        return bot.reply(msg, `${msg.mentions[0].name}'s preferred role is **submissive**`);
      }
      if (bot.memberHasRole(msg.mentions[0], msg.getRole("dom", server))) {
        return bot.reply(msg, `${msg.mentions[0].name}'s preferred role is **dominant**`);
      }
      return bot.reply(msg, `${msg.mentions[0].name} has not set their preferred role`);
    }

    if (msg.content.toLowerCase().indexOf("sub") > -1) {
      bot.reply(msg, "has set their preferred role to **submissive**");
      return bot.addMemberToRole(msg.author, msg.getRole("sub", server));
    }

    if (msg.content.toLowerCase().indexOf("dom") > -1) {
      bot.reply(msg, "has set their preferred role to **dominant**");
      return bot.addMemberToRole(msg.author, msg.getRole("dom", server));
    }
    return;
  }
  next();
}
