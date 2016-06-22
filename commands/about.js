var about =
`  Hai! I'm RoryBot and I was made by Eve with help from tablekat :heart:
  I was written in javascript using many different modules but mainly discord.js
`
module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!about") === 0) {
    return bot.reply(msg, about);
  }
  next();
}
