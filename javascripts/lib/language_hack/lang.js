"use strict";!function(){function t(t){$(".platform-selector button").removeClass("btn-selected").filter("[data-platform-name='"+t+"']").addClass("btn-selected")}function e(t){$(".language-dropdown").text(i(t))}function i(t){return t.replace("_","-")}$(function(){$(".platform-selector button").on("click",function(){var t=$(this).data("platform-name");window.location="android"===t?"/android"+window.location.hash:"web"===t?"/javascript"+window.location.hash:"rest"===t?"/rest"+window.location.hash:"/ios"+window.location.hash});var n=window.location.pathname;-1!==n.indexOf("android")?(t("android"),localStorage.setItem("language","java"),setupLanguages(["java"])):-1!==n.indexOf("javascript")?(t("web"),localStorage.setItem("language","javascript"),setupLanguages(["javascript"])):(t("ios"),localStorage.setItem("language","objective_c"));var o=window.location.search.substr(1);!o||"objective_c"!==o&&"swift"!==o||e(o),$(".lang-selector").hide(),$(".language-dropdown").on("click",function(){$(".lang-selector").toggle()}),$(".lang-selector a").on("click",function(){e($(this).text()),$(".lang-selector").hide()}),$(document).on("click",function(t){$(t.target).is(".language-dropdown")||$(".lang-selector").hide()}),$(".language-dropdown, .lang-selector a").each(function(){$(this).text(i($(this).text()))})})}(window);