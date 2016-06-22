var help =
` Here are my current commands :3
  [thing] marks a required argument
  {thing} marks an optional argument
  __dont put brackets .-.__

  **!help** show this help message
  **!about** get info about RoryBot :3
  **!roll {number}** roll a number between 0 and number (100 if none)
  **!8ball** get an 8ball answer
  **!flip** flip a coin
  **!lovecalc [thing] [other thing]** calculate the love from thing to otherthing
  **!hentai [tags]** get 3 hentai pics from one of 4 sites
  **!rule34 [tags]** get 3 hentai pics from one rule34
  - - - - - - - - - - - - - - - - - - - - -
  **!userinfo {@user}** get info about yourself or the mentioned user
  **!level {@user}** display's your (or the mentioned user's) level information
  **!love** get an inspiring message if you're having a bad day
  **!spam {text}** gets a random spam message or spams the {text} provided
  **!gender [male/female/other]** set your preferred gender role
  **!ds [sub/dom]** set your preferred rp role

  - - - - - - level 7 commands - - - - - -
  **!role [role]** sets your role
  **!color #[hex color]** set your role color (you must have a role set first)
`
module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!help") === 0) {
    return bot.reply(msg, help);
  }
  next();
}
