// main.js

var DiscoExpress = require('./index');
var AuthDetails = require(`./auth.json`);
var Datastore = require('nedb');
var chroma = require(`./chroma`);
var cleverbot = require("cleverbot.io");
var cbot = new cleverbot('vnHqCpTYq8QbrBsw', 'YTXZRj34BRcgIidqV9wN9Nhn8Rq705fS');
var sessionSet = 0;

function errorout(err, thing) {
  if (err) console.log(err.message);
}

var db = new Datastore({filename:'RoryBotData.db', autoload:true});

var xpForLevels = [];
var roleNames = ["Guests",
                  "Newbie Lewds",
                  "Beginner Lewds",
                  "Rookie Lewds",
                  "Novice Lewds",
                  "Intermediate Lewds",
                  "Skilled Lewds",
                  "Experienced Lewds",
                  "Advanced Lewds",
                  "Expert Lewds",
                  "Elite Lewds"];

function UserData(id) {
    this._id = id;
    this.xp = 0;
    this.level = 0;
    this.lastTime = 0;
    this.role = "";
}

function xpStuff(bot, msg, next) {
  getData(msg.author, (data) => {
    if (msg.timestamp - data.lastTime < 5000) return;

    data.lastTime = msg.timestamp;
    data.xp += 1 + Math.random() * 3;

    //check for level up
    if (data.level < xpForLevels.length) {
      if (data.xp > xpForLevels[data.level]) {
        data.level++;
        rankUp(bot, msg, data);
        bot.reply(msg, `has just leveled up!`);
      }
    }
    db.update({_id:msg.author.id}, {xp:data.xp, level:data.level, lastTime:data.lastTime});
  });

  msg.getData = getData;
  msg.db = db;
  msg.rankUp = rankUp;
  msg.roleNames = roleNames;
  msg.xpForLevels = xpForLevels;
  msg.getRole = getRole;
  next();
}

function rankUp(bot, msg, data) {
  bot.removeMemberFromRole(msg.author, getRole(roleNames[data.level-1], msg.channel.server), errorout);

  var r = getRole(roleNames[data.level], msg.channel.server);
  if (r == null) {
    msg.channel.server.createRole({
      color:getColor(data.level / roleNames.length),
      hoist:true,
      name:roleNames[data.level],
      position:(data.level + getRole("guests", msg.channel.server).position)
    }, (err, nr) => {
      if (err) console.log(err);
      bot.addMemberToRole(msg.author, nr, errorout);
      console.log("pos: " + nr.position);
      console.log("bot pos: " + getRole("Better Than ~Nyaabot", msg.channel.server).position);
    });
    return;
  }
  bot.addMemberToRole(msg.author, r, errorout);
}

function getColor(amount) {
  var start = "2B65EC";
  var end = "42FFBC";
  return parseInt("0x" + chroma.scale([start, end]).mode('lab')(amount).hex().substring(1)); // probably dont need substring but meh
}

function getData(user, next) {
  db.findOne({_id:`${user.id}`}, (err, doc) => {
    if (err) {
      console.log("error: " + err);
    }

    if (!doc) {
      doc = new UserData(user.id);
      db.insert(doc);
      db.update({_id:user.id}, {level:doc.level, xp:doc.xp});
    }

    next(doc);
  });
}

function getRole(role, server) {
  for (var r of server.roles) {
    if (r.name.toLowerCase() == role.toLowerCase()) {
      return r;
    }
  }
  //console.log(`role *${role}* not found in server *${server.name}*`);
  return null;
}

function getChannel(channel, server) {
  for (var c of server.channels) {
    if (c.name.toLowerCase() == channel.toLowerCase()) {
      return c;
    }
  }
  console.log(`channel *${channel}* not found in server *${server.name}*`);
  return null;
}

function createAllRoles(bot, msg) {
  var server = msg.channel.server;
  for (i = 0; i < 5; i++) {
    var name = roleNames[i];
    var role = getRole(name, server);

    if (!role) {
      server.createRole({
        color:getColor(i / roleNames.length),
        hoist:true,
        name:roleNames[i],
        position:getRole(roleNames[i-1], server).position
      }, (err, nr) => {
          if (err) console.log("err: " + err);
          console.log(`prev role pos: ${getRole(roleNames[i-1], server).position}`);
          console.log(`new role pos: ${nr.position}`);
      });
    }
  };
}

function setupDiscoExpress() {
  var app = new DiscoExpress();

  app.on("ready", () => {
    console.log("[StartUp] RoryBot ready.");

    var amt = 300;
    for (i = 0; i < roleNames.length; i++) {
      xpForLevels.push(amt);
      amt *= 2;
    }
  });
  app.on("disconnected", () => {
    console.log("[Disconnected]");
    console.log("Attempting to reconnect");
    login(app);
  });

  app.on("serverNewMember", (bot, server, user, next) => {
    bot.sendMessage(server.defaultChannel, `Hello ${user.mention()}! Welcome to ${server.name}! We hope you enjoy your stay :3, please don't forget to read the #rules!`);
    bot.addMemberToRole(user, getRole("guests", server));
    next();
  });
  app.on("serverMemberRemoved", (bot, server, user, next) => {
    bot.sendMessage(server.defaultChannel, `${user.mention()} (${user.name}) has left ;-;`);
    next();
  });

  app.on("message", require("./helpers/ignore-self"));
  app.on("message", require("./helpers/ignore-pm"));
  app.on("message", xpStuff);

  app.on("message", (bot, msg, next) => {
    if (msg.content.toLowerCase().indexOf("slaps rorybot") > -1) {
      bot.sendMessage(msg.channel, `_slaps ${msg.author.mention()}_`);
      return;
    }

    if (msg.content.indexOf("/shrug") > -1) {
      bot.sendMessage(msg.channel, "¯\\_(ツ)_/¯");
      return;
    }

    next();
  });

  app.on("message", (bot, msg, next) => {
    if (msg.content.indexOf(bot.user.id) > -1) {
      return reply(bot, msg);
    }

    if (msg.content == "!makeroles") {
      createAllRoles(bot, msg);
      return;
    }

    next();
  });

  // commands
  app.on("message", require("./commands/help"));
  app.on("message", require("./commands/about"));
  app.on("message", require("./commands/xp"));
  app.on("message", require("./commands/level"));
  app.on("message", require("./commands/userinfo"));
  app.on("message", require("./commands/role"));
  app.on("message", require("./commands/ranks"));
  app.on("message", require("./commands/promote"));
  app.on("message", require("./commands/pronoun"));
  app.on("message", require("./commands/dominance"));
  app.on("message", require("./commands/restart"));

  app.on("message", require("./commands/hentai"));
  app.on("message", require("./commands/rule34"));

  app.on("message", require("./commands/roll"));
  app.on("message", require("./commands/flip"));
  app.on("message", require("./commands/8ball"));
  app.on("message", require("./commands/lovecalc"));
  app.on("message", require("./commands/love"));
  app.on("message", require("./commands/pet"));
  app.on("message", require("./commands/spam"));
  app.on("message", require("./commands/brainpower"));

  app.on("message", require("./commands/eval"));

  login(app);
}

function reply(bot, msg) {
  db.findOne({_id:`session`}, (err, doc) => {
    if (doc) cbot.setNick(doc.session);
    cbot.create((err, session) => {
      if (!doc) {
        db.insert({_id:"session", session:session});
        db.update({_id:"session"}, {session:session});
      }
      var check = msg.content.replace(`<@!${bot.user.id}>`, "").trim();
      cbot.ask(check, (err2, response) => {
        if (err2) console.log(`error: ${response}`);
        else bot.reply(msg, response);
      });
    });
  });
}

function login(app) {
  if (AuthDetails.token != undefined && AuthDetails.token != "") {
      app.login(AuthDetails.token);
  } else {
    app.login(AuthDetails.email, AuthDetails.password);
  }
}

setupDiscoExpress();
