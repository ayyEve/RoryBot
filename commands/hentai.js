var request = require('request');
var limit = 3;

module.exports = function(bot, msg, next) {
  if (msg.content.indexOf("!hentai") === 0) {
    var search;

    switch (Math.floor(Math.random() * 4)) {
      case 0: search = Danbooru; break;
      case 1: search = Konachan; break;
      case 2: search = Yandere; break;
    }

    search.get(msg.content.substring("!hentai ".length), (text) => {
      if (text != "") bot.reply(msg, `From ${search.name}, ${text}`);
      else bot.reply(msg, "Either no images were found with those tags, Eve's internet is dying, or some stupid error occurred, but there were no results")
    });
    return;
  }
  next();
}


var Sankaku = {
  name: "Sankaku",
  get: function(tags, next) {
    var out = "";
    request(`http://chan.sankakucomplex.com/post/index.json?tags=${tags}&limit=${limit}`, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        for (i = 0; i < limit; i++) {
          try {
            var link = body[i].file_url;
            out += link ? link + " \n" : "";
          } catch (err) {
            return next("");
          }
        }
        setTimeout(() => next(out), 1000);
      }
    });
  }
}

var Yandere = {
  name: "yande.re",
  get: function(tags, next) {
    var out = "";
    request(`http://yande.re/post.json?tags=${tags}&limit=${limit}`, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        for (i = 0; i < limit; i++) {
          try {
            var link = body[i].file_url;
            out += link ? link + " \n" : "";
          } catch (err) {
            return next("");
          }
        }
        setTimeout(() => next(out), 1000);
      }
    });
  }
}

var Konachan = {
  name: "Konachan",
  get: function(tags, next) {
    var out = "";
    request(`http://konachan.com/post.json?tags=${tags}&limit=${limit}`, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        for (i = 0; i < limit; i++) {
          try {
            var link = body[i].file_url;
            out += link ? link + " \n" : "";
          } catch (err) {
            return next("");
          }
        }
        setTimeout(() => next(out), 1000);
      }
    });
  }
}

var Danbooru = {
  name: "Danbooru",
  get: function(tags, next) {
    var out = "";
    request(`http://danbooru.donmai.us/posts.json?tags=${tags}&limit=${limit}`, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        for (i = 0; i < limit; i++) {
          try {
            getPic(body[i].id, (link) => {
              out += link ? link + " \n" : "";
            })
          } catch (err) {
            return next("");
          }
        }
        setTimeout(() => next(out), 1000);
      }
    })
  },
  getPic: function(id, next) {
    request(`http://danbooru.donmai.us/posts/${id}.json`, (error, response, body2) => {
      if (!error && response.statusCode == 200) {
        body2 = JSON.parse(body2);
        next(body2.large_file_url ? `http://danbooru.donmai.us/${body2.large_file_url}` : null);
        //next(`${body2.source}`);
      } else {
        console.log(error, response.statusCode);
      }
    })
  }
}
