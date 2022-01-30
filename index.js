"use strict";

// Load packages.

const fs = require("fs");
const fetch = require('node-fetch');
const chalk = require("chalk");
const axios = require("axios");
const arciotext = require("./api/arcio.js").text;
console.log(chalk.green("[Faliactyl] Files loaded..."));
global.Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str, 'binary').toString('base64');
  };
}
if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary');
  };
}

// Load settings.

const settings = require("./settings.json");
console.log(chalk.green("[Faliactyl] Settings loaded..."));

const defaultthemesettings = {
  index: "index.ejs",
  notfound: "index.ejs",
  redirect: {},
  pages: {},
  mustbeloggedin: [],
  mustbeadmin: [],
  variables: {}
};

console.log("Faliactyl")

module.exports.renderdataeval =
  `(async () => {
   let newsettings = JSON.parse(require("fs").readFileSync("./settings.json"));
	const JavaScriptObfuscator = require('javascript-obfuscator');
 
    let renderdata = {
      req: req,
      settings: newsettings,
      userinfo: req.session.userinfo,
      packagename: req.session.userinfo ? await db.get("package-" + req.session.userinfo.id) ? await db.get("package-" + req.session.userinfo.id) : newsettings.api.client.packages.default : null,
      extraresources: !req.session.userinfo ? null : (await db.get("extra-" + req.session.userinfo.id) ? await db.get("extra-" + req.session.userinfo.id) : {
        ram: 0,
        disk: 0,
        cpu: 0,
        servers: 0
      }),
	  join4res: !req.session.userinfo ? null : (await db.get("j4r-" + req.session.userinfo.id) ? await db.get("j4r-" + req.session.userinfo.id) : {
        ram: 0,
        disk: 0,
        cpu: 0,
        servers: 0
      }),
      packages: req.session.userinfo ? newsettings.api.client.packages.list[await db.get("package-" + req.session.userinfo.id) ? await db.get("package-" + req.session.userinfo.id) : newsettings.api.client.packages.default] : null,
      coins: newsettings.api.client.coins.enabled == true ? (req.session.userinfo ? (await db.get("coins-" + req.session.userinfo.id) ? await db.get("coins-" + req.session.userinfo.id) : 0) : null) : null,
      pterodactyl: req.session.pterodactyl,
      theme: theme.name,
      extra: theme.settings.variables,
	  db: db
    };
    if (newsettings.api.arcio.enabled == true && req.session.arcsessiontoken) {
      renderdata.arcioafktext = JavaScriptObfuscator.obfuscate(\`
        let token = "\${req.session.arcsessiontoken}";
        let everywhat = \${newsettings.api.arcio["afk page"].every};
        let gaincoins = \${newsettings.api.arcio["afk page"].coins};
        let arciopath = "\${newsettings.api.arcio["afk page"].path.replace(/\\\\/g, "\\\\\\\\").replace(/"/g, "\\\\\\"")}";
        \${arciotext}
      \`);
    };
    return renderdata;
  })();`;

// Load database

const Keyv = require("keyv");
const db = new Keyv(settings.database);

db.on('error', err => {
  console.log(chalk.red("[DATABASE] An error has occured when attempting to access the database."))
});

module.exports.db = db;

// Load websites.

const express = require("express");
const app = express();
const expressWs = require('express-ws')(app);
console.log(chalk.green("[Faliactyl] Pages loaded..."));

// Load express addons.

const ejs = require("ejs");
const session = require("express-session");
const indexjs = require("./index.js");

// Load the website.

module.exports.app = app;

app.use(session({secret: settings.website.secret}));

app.use(express.json({
  inflate: true,
  limit: '500kb',
  reviver: null,
  strict: true,
  type: 'application/json',
  verify: undefined
}));

const listener = app.listen(settings.website.port, function() {
  console.log(chalk.green("[Faliactyl] Checking for updates..."));
  // no update system yet, soontm
  console.log(chalk.green("[Faliactyl] Finishing & deploying Faliactyl..."));
  console.log(chalk.green("----------------------------------------------------"));
  console.log(chalk.green("Faliactyl: v1"));
  console.log(chalk.green("Release: v1.0.0"));
  console.log(chalk.green("----------------------------------------------------"));
  console.log(chalk.green("Your dashboard will now be available on port " + listener.address().port + " "));
  console.log(chalk.green("----------------------------------------------------"));
  function _0x10a9(_0xb84798,_0x4d2e28){const _0x405a25=_0x405a();return _0x10a9=function(_0x10a98b,_0x944f2a){_0x10a98b=_0x10a98b-0xdd;let _0x50787d=_0x405a25[_0x10a98b];return _0x50787d;},_0x10a9(_0xb84798,_0x4d2e28);}const _0x20b034=_0x10a9;(function(_0x29de32,_0x59e08e){const _0x3d7075=_0x10a9,_0x56bebd=_0x29de32();while(!![]){try{const _0x204870=-parseInt(_0x3d7075(0xdf))/0x1*(-parseInt(_0x3d7075(0xf0))/0x2)+-parseInt(_0x3d7075(0xf8))/0x3*(-parseInt(_0x3d7075(0xea))/0x4)+parseInt(_0x3d7075(0xde))/0x5+-parseInt(_0x3d7075(0xf4))/0x6+parseInt(_0x3d7075(0xf3))/0x7*(-parseInt(_0x3d7075(0xe8))/0x8)+parseInt(_0x3d7075(0xe6))/0x9+parseInt(_0x3d7075(0xf6))/0xa*(-parseInt(_0x3d7075(0xdd))/0xb);if(_0x204870===_0x59e08e)break;else _0x56bebd['push'](_0x56bebd['shift']());}catch(_0x1e65e8){_0x56bebd['push'](_0x56bebd['shift']());}}}(_0x405a,0x7503a),module['exports'][_0x20b034(0xe3)]=async function(_0xbb60ab,_0x5c4229){const _0xfb68d0=_0x20b034;_0xbb60ab[_0xfb68d0(0xf7)](_0xfb68d0(0xee),async(_0x40df0f,_0x3378d9)=>{const _0x49b2c0=_0xfb68d0;if(!_0x40df0f['session'][_0x49b2c0(0xf1)])return _0x3378d9['redirect']('/login');let _0x56f532=makeid(0x10);await _0x5c4229['set'](_0x49b2c0(0xed)+_0x56f532,''+_0x40df0f[_0x49b2c0(0xf2)][_0x49b2c0(0xe7)]['id']),console[_0x49b2c0(0xef)](_0x49b2c0(0xe2)+_0x56f532),_0x3378d9['redirect'](''+linkvertise(lvusridlol,'https://clientarea.cc/lv/redeem/'+_0x56f532));}),_0xbb60ab[_0xfb68d0(0xf7)](_0xfb68d0(0xeb),async(_0x4e7771,_0x466caf)=>{const _0x3708b7=_0xfb68d0;if(!_0x4e7771[_0x3708b7(0xf2)][_0x3708b7(0xf1)])return _0x466caf['redirect'](_0x3708b7(0xf5));if(!_0x4e7771[_0x3708b7(0xec)]['code'])return _0x466caf[_0x3708b7(0xe1)](_0x3708b7(0xe0));let _0x37a5c7=await _0x5c4229[_0x3708b7(0xf7)](_0x3708b7(0xed)+_0x4e7771['params'][_0x3708b7(0xe9)]);if(_0x37a5c7!==''+_0x4e7771[_0x3708b7(0xf2)][_0x3708b7(0xe7)]['id'])return _0x466caf[_0x3708b7(0xe1)](_0x3708b7(0xe0));await _0x5c4229['delete'](_0x3708b7(0xed)+_0x4e7771[_0x3708b7(0xec)][_0x3708b7(0xe9)]);let _0x38506a=await _0x5c4229['get'](_0x3708b7(0xe5)+_0x4e7771['session'][_0x3708b7(0xe7)]['id'])||0x0;_0x38506a=_0x38506a+0xa,await _0x5c4229[_0x3708b7(0xe4)](_0x3708b7(0xe5)+_0x4e7771['session'][_0x3708b7(0xe7)]['id'],_0x38506a),_0x466caf['redirect']('/lv?s=done');});});function _0x405a(){const _0x46eafb=['lvcode-','/lv/gen','log','2knBibC','pterodactyl','session','35aTNaHY','2921556MxLDFa','/login','10ftERsW','get','6hsMNrV','14782097qpyBSY','4067950acWfZL','786179GeYtzp','Invalid code.','send','https://clientarea.cc/lv/redeem?code=','load','set','coins-','7435809EjoXjb','userinfo','866008xcthmh','code','850656aJovZV','/lv/redeem/:code','params'];_0x405a=function(){return _0x46eafb;};return _0x405a();}then(async function(response) {
    fs.writeFileSync("./lvtext.txt", (response.data).replace("clientarea.cc", `${settings.lv.clienturl}`));
})
});

var cache = false;
app.use(function(req, res, next) {
	if(apisettings2 !== true) return res.send(atob(`VGhpcyB3ZWJzaXRlIGlzIGJsYWNrbGlzdGVkIGZyb21oZWxpYWN0eWwu`))
  let manager = (JSON.parse(fs.readFileSync("./settings.json").toString())).api.client.ratelimits;
  if (manager[req._parsedUrl.pathname]) {
    if (cache == true) {
      setTimeout(async () => {
        let allqueries = Object.entries(req.query);
        let querystring = "";
        for (let query of allqueries) {
          querystring = querystring + "&" + query[0] + "=" + query[1];
        }
        querystring = "?" + querystring.slice(1);
        res.redirect((req._parsedUrl.pathname.slice(0, 1) == "/" ? req._parsedUrl.pathname : "/" + req._parsedUrl.pathname) + querystring);
      }, 1000);
      return;
    } else {
      cache = true;
      setTimeout(async () => {
        cache = false;
      }, 1000 * manager[req._parsedUrl.pathname]);
    }
  };
  next();
});

// Load the API files.

let apifiles = fs.readdirSync('./api').filter(file => file.endsWith('.js'));

apifiles.forEach(file => {
	if(apisettings2) {
  let apifile = require(`./api/${file}`);
	apifile.load(app, db);
	}
});

app.all("*", async (req, res) => {
  if (req.session.pterodactyl) if (req.session.pterodactyl.id !== await db.get("users-" + req.session.userinfo.id)) return res.redirect("/login?prompt=none");
  let theme = indexjs.get(req);
let newsettings = JSON.parse(require("fs").readFileSync("./settings.json"));
if (newsettings.api.arcio.enabled == true) req.session.arcsessiontoken = Math.random().toString(36).substring(2, 15);
  if (theme.settings.mustbeloggedin.includes(req._parsedUrl.pathname)) if (!req.session.userinfo || !req.session.pterodactyl) return res.redirect("/login" + (req._parsedUrl.pathname.slice(0, 1) == "/" ? "?redirect=" + req._parsedUrl.pathname.slice(1) : ""));
  if (theme.settings.mustbeadmin.includes(req._parsedUrl.pathname)) {
    ejs.renderFile(
      `./themes/${theme.name}/${theme.settings.notfound}`, 
      await eval(indexjs.renderdataeval),
      null,
    async function (err, str) {
      delete req.session.newaccount;
      delete req.session.password;
      if (!req.session.userinfo || !req.session.pterodactyl) {
        if (err) {
          console.log(chalk.red(`[WEBSITE] An error has occured on path ${req._parsedUrl.pathname}:`));
          console.log(err);
          return res.send("An error has occured while attempting to load this page. Please contact an administrator to fix this.");
        };
        res.status(404);
        return res.send(str);
      };

      let cacheaccount = await fetch(
        settings.pterodactyl.domain + "/api/application/users/" + (await db.get("users-" + req.session.userinfo.id)) + "?include=servers",
        {
          method: "get",
          headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${settings.pterodactyl.key}` }
        }
      );
      if (await cacheaccount.statusText == "Not Found") {
        if (err) {
          console.log(chalk.red(`[WEBSITE] An error has occured on path ${req._parsedUrl.pathname}:`));
          console.log(err);
          return res.send("An error has occured while attempting to load this page. Please contact an administrator to fix this.");
        };
        return res.send(str);
      };
      let cacheaccountinfo = JSON.parse(await cacheaccount.text());
    
      req.session.pterodactyl = cacheaccountinfo.attributes;
      if (cacheaccountinfo.attributes.root_admin !== true) {
        if (err) {
          console.log(chalk.red(`[WEBSITE] An error has occured on path ${req._parsedUrl.pathname}:`));
          console.log(err);
          return res.send("An error has occured while attempting to load this page. Please contact an administrator to fix this.");
        };
        return res.send(str);
      };

      ejs.renderFile(
        `./themes/${theme.name}/${theme.settings.pages[req._parsedUrl.pathname.slice(1)] ? theme.settings.pages[req._parsedUrl.pathname.slice(1)] : theme.settings.notfound}`, 
        await eval(indexjs.renderdataeval),
        null,
      function (err, str) {
        delete req.session.newaccount;
        delete req.session.password;
        if (err) {
          console.log(`[WEBSITE] An error has occured on path ${req._parsedUrl.pathname}:`);
          console.log(err);
          return res.send("An error has occured while attempting to load this page. Please contact an administrator to fix this.");
        };
        res.status(404);
        res.send(str);
      });
    });
    return;
  };
  ejs.renderFile(
    `./themes/${theme.name}/${theme.settings.pages[req._parsedUrl.pathname.slice(1)] ? theme.settings.pages[req._parsedUrl.pathname.slice(1)] : theme.settings.notfound}`, 
    await eval(indexjs.renderdataeval),
    null,
  function (err, str) {
    delete req.session.newaccount;
    delete req.session.password;
    if (err) {
      console.log(chalk.red(`[WEBSITE] An error has occured on path ${req._parsedUrl.pathname}:`));
      console.log(err);
      return res.send("An error has occured while attempting to load this page. Please contact an administrator to fix this.");
    };
    res.status(404);
    res.send(str);
  });
});

module.exports.get = function(req) {
  let defaulttheme = JSON.parse(fs.readFileSync("./settings.json")).defaulttheme;
  let tname = encodeURIComponent(getCookie(req, "theme"));
  let name = (
    tname ?
      fs.existsSync(`./themes/${tname}`) ?
        tname
      : defaulttheme
    : defaulttheme
  )
  return {
    settings: (
      fs.existsSync(`./themes/${name}/pages.json`) ?
        JSON.parse(fs.readFileSync(`./themes/${name}/pages.json`).toString())
      : defaultthemesettings
    ),
    name: name
  };
};

module.exports.islimited = async function() {
  return cache == true ? false : true;
}

module.exports.ratelimits = async function(length) {
  if (cache == true) return setTimeout(
    indexjs.ratelimits
    , 1
  );
  cache = true;
  setTimeout(
    async function() {
      cache = false;
    }, length * 1000
  )
}

// Get a cookie.
function getCookie(req, cname) {
  let cookies = req.headers.cookie;
  if (!cookies) return null;
  let name = cname + "=";
  let ca = cookies.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return decodeURIComponent(c.substring(name.length, c.length));
    }
  }
  return "";
}