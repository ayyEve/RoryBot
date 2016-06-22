module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!gender") == 0) {
    var server = msg.channel.server;

    if (msg.mentions.length > 0) {
      if (bot.memberHasRole(msg.mentions[0], msg.getRole("male", server))) {
        return bot.reply(msg, `${msg.mentions[0].name}'s preferred gender is **male**`);
      }
      if (bot.memberHasRole(msg.mentions[0], msg.getRole("female", server))) {
        return bot.reply(msg, `${msg.mentions[0].name}'s preferred gender is **female**`);
      }
      if (bot.memberHasRole(msg.mentions[0], msg.getRole("other", server))) {
        return bot.reply(msg, `${msg.mentions[0].name}'s preferred gender is **other**`);
      }
      bot.reply(msg, `${msg.mentions[0].name} has not set their preferred gender`);

      return;
    }

    if (msg.content.toLowerCase().indexOf("other") > -1) {
      bot.reply(msg, "has set their preferred gender to **other**");
      return bot.addMemberToRole(msg.author, msg.getRole("other", server));
    }

    if (msg.content.toLowerCase().indexOf("female") > -1) {
      bot.reply(msg, "has set her preferred gender to **female**");
      return bot.addMemberToRole(msg.author, msg.getRole("female", server));
    }

    if (msg.content.indexOf("male") > -1) {
      bot.reply(msg, "has set his preferred gender to **male**");
      return bot.addMemberToRole(msg.author, msg.getRole("male", server));
    }
    return;
  }
  next();
}
