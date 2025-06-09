
// Global Variables
var lastCompatibleVersion = 2.031;
if (Game.version > lastCompatibleVersion) {
  console.log(
    "WARNING: The Cookie Clicker version is newer than this version of Frozen Cookies."
  );
  console.log(
    "This version of Frozen Cookies has only been tested through Cookie Clicker version " +
      lastCompatibleVersion
  );
  console.log(
    "There may be incompatibilities, undesirable effects, bugs, shifts in reality, immoral behavior, and who knows what else."
  );
}

var scriptElement =
  document.getElementById("frozenCookieScript") !== null
    ? document.getElementById("frozenCookieScript")
    : document.getElementById("modscript_frozen_cookies");
var baseUrl =  scriptElement !== null
    ? scriptElement.getAttribute("src").replace(/\/frozen_cookies\.js$/, "")
    : "https://icehawk78.github.io/FrozenCookies/";
var FrozenCookies = {
  baseUrl: baseUrl,
  branch: "Main-",
  version: "2.0.0",
};

// Load external libraries
var script_list = [
  "fc-assets/jquery-ui.min.js",
  "fc-assets/jquery-ui.css",
  "fc-assets/underscore-min.js",
  "fc-assets/jcanvas.min.js",
  "fc-assets/jquery.jqplot.min.js",
  "fc-assets/jquery.jqplot.min.css",
  "fc-assets/jqplot.canvasTextRenderer.min.js",
  "fc-assets/jqplot.canvasAxisLabelRenderer.min.js",
  "fc-assets/jqplot.canvasAxisTickRenderer.min.js",
  "fc-assets/jqplot.trendline.min.js",
  "fc-assets/jqplot.highlighter.min.js",
  "fc-assets/jqplot.logAxisRenderer.min.js",
  "fc-assets/jqplot.cursor.min.js",
  "fc-assets/fc_preferences.js",
  "fc-assets/cc_upgrade_prerequisites.js",
  "fc-assets/fc_main.js",
  "fc-assets/fc_button.js",
  "fc-assets/fc_spellpredict.js",
  "fc-assets/fc_infobox.js"
];

FrozenCookies.loadInterval = setInterval(function () {
  if (Game && Game.ready) {
    clearInterval(FrozenCookies.loadInterval);
    FrozenCookies.loadInterval = 0;
    fcInit();
  }
}, 100);

function loadScript(id) {
  if (id >= script_list.length) {
    registerMod("frozen_cookies"); // when the mod is registered, the save data is passed in the load function
  } else {
    var url = script_list[id];
    if (/\.js$/.exec(url)) {
      $.getScript(url, function () {
        loadScript(id + 1);
      });
    } else if (/\.css$/.exec(url)) {
      $("<link>")
        .attr({
          rel: "stylesheet",
          type: "text/css",
          href: url,
        })
        .appendTo($("head"));
      loadScript(id + 1);
    } else {
      console.log("Error loading script: " + url);
      loadScript(id + 1);
    }
  }
}

function fcInit() {
  var jquery = document.createElement("script");
  jquery.setAttribute("type", "text/javascript");
  jquery.setAttribute("src", "fc-assets/jquery-3.6.0.min.js");
  jquery.setAttribute(
    "integrity",
    "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  );
  jquery.setAttribute("crossorigin", "anonymous");
  jquery.onload = function () {
    loadScript(0);
  };
  document.head.appendChild(jquery);
}
