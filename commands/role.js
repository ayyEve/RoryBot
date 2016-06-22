module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!role") == 0) {
    msg.getData(msg.author, (data) => {
      if (data.level < 7)
        return bot.reply(msg, "you aren't level 7 yet .-.");
      var stuff = msg.content.replace("!role", "").trim();

      if (msg.content.indexOf("#") > -1) {
        if (data.role == "") return bot.reply(msg, "you must set a role first .-.");

        var role = msg.getRole(data.role, msg.channel.server);
        bot.updateRole(role, {color:stuff.replace("#", "").trim()}, (err, nr) => {
          if (err) console.log("role.js, update role: " + err);
        });

      } else {
        if (data.role != "") {
          var role = msg.getRole(data.role, msg.channel.server);
          bot.updateRole(role, {name:stuff}, (err, nr) => {
            if (err) console.log("role.js, update role: " + err);
          });
        } else {
          msg.channel.server.createRole({
            hoist:true,
            name:stuff,
            position:(msg.getRole("cute kitty", msg.channel.server).position - 1),
          }, (err, nr) => {
            if (err) console.log("role.js, create role: " + err);
            bot.addMemberToRole(msg.author, nr, errorout);
          });
        }

        bot.reply(msg, "you have set your role to " + stuff)
        msg.db.update({_id:msg.author.id}, {role:stuff});
      }
    });
    return;
  }
  next();
}
