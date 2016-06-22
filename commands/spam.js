var messages = [];
messages.push("asdfg!");
messages.push("O-oooooooooo AAAAE-A-A-I-A-U- JO-oooooooooooo AAE-O-A-A-U-U-A- E-eee-ee-eee AAAAE-A-E-I-E-A- JO-ooo-oo-oo-oo EEEEO-A-AAA-AAAA")
messages.push(`What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo.`)
messages.push(`👌👀👌👀👌👀👌👀👌👀 good shit go౦ԁ sHit👌 thats ✔ some good👌👌shit right👌👌there👌👌👌 right✔there ✔✔if i do ƽaү so my self 💯 i say so 💯 thats what im talking about right there right there (chorus: ʳᶦᵍʰᵗ ᵗʰᵉʳᵉ) mMMMMᎷМ💯 👌👌 👌НO0ОଠOOOOOОଠଠOoooᵒᵒᵒᵒᵒᵒᵒᵒᵒ👌 👌👌 👌 💯 👌 👀 👀 👀 👌👌Good shit`);
messages.push(`No, friend. Your large box of Pokémon Cardstm are safe at my place of residence. As there is no reason to assume this box contains anything related to criminal activity pending or currently under investigation, there is no legal requirement to notify anyone of the existence or location of this box and no legal penalty for failing to do so.`);

module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!spam") === 0 && msg.channel.name.toLowerCase() == "spam") {

    if (msg.content.length > "!spam ".length) {
      if (msg.content.indexOf(":") >= 0) {
        return bot.reply(msg, "NO EMOJIS!");
      }
      return bot.sendMessage(msg.channel, repeat(msg.content.substring("!spam ".length)));
    }
    bot.reply(msg, messages[Math.floor(Math.random() * messages.length)]);
    return;
  }
  next();
}

function repeat(text) {
  var out = text + ",";
  while ((out + text + ",").length < 2000) {
    out += text + ",";
  }
  return out;
}
