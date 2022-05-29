var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValue = parts.shift().split("=");
  var name = nameValue.shift();
  var value = nameValue.join("=");
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e) {
    console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e);
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key === "expires") {
      cookie.expires = new Date(value2);
    } else if (key === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key === "secure") {
      cookie.secure = true;
    } else if (key === "httponly") {
      cookie.httpOnly = true;
    } else if (key === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key] = value2;
    }
  });
  return cookie;
}
function parse(input, options) {
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers && input.headers["set-cookie"]) {
    input = input.headers["set-cookie"];
  } else if (input.headers) {
    var sch = input.headers[Object.keys(input.headers).find(function(key) {
      return key.toLowerCase() === "set-cookie";
    })];
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!options.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
setCookie.exports.parseString = parseString;
setCookie.exports.splitCookiesString = splitCookiesString;
var cookieParser = setCookie.exports;
class Util {
  getCookieScopeDomain(domain = "") {
    if (!domain)
      return [];
    domain = domain.replace(/^\.+/gi, "");
    let scopes = domain.split(".").map((k) => [".", domain.slice(domain.indexOf(k))].join(""));
    return [domain].concat(scopes);
  }
  normalizeDomain(domain = "") {
    return domain.replace(/^(\.*)?(?=\S)/gi, ".");
  }
}
var util = new Util();
class Cookie {
  constructor(props) {
    this.name = props.name || "";
    this.value = props.value || "";
    this.domain = props.domain || "";
    this.path = props.path || "/";
    this.expires = props.expires ? new Date(props.expires) : null;
    this.maxAge = props.maxAge !== void 0 && props.maxAge !== null ? parseInt(props.maxAge) : null;
    this.httpOnly = !!props.httpOnly;
    this.dateTime = props.dateTime ? new Date(props.dateTime) : new Date();
  }
  set(setCookieStr = "") {
    var cookie = cookieParser.parse(setCookieStr, { decodeValues: false })[0];
    if (cookie) {
      Object.assign(this, cookie);
      this.dateTime = new Date();
    }
    return this;
  }
  merge(cookie) {
    return Object.assign(this, cookie);
  }
  isExpired() {
    if (this.maxAge === 0) {
      return true;
    }
    if (this.maxAge > 0) {
      let seconds = (Date.now() - this.dateTime.getTime()) / 1e3;
      return seconds > this.maxAge;
    }
    if (this.expires && this.expires < new Date()) {
      return true;
    }
    return false;
  }
  isPersistence() {
    return this.maxAge ? this.maxAge > 0 : true;
  }
  isInDomain(domain) {
    let scopeDomains = util.getCookieScopeDomain(domain);
    return scopeDomains.indexOf(this.domain) >= 0;
  }
  isInPath(path) {
    return path.indexOf(this.path) === 0 || this.path.replace(/\/$/, "") === path;
  }
  toString() {
    return [this.name, this.value].join("=");
  }
}
function getApi() {
  if (typeof my !== "undefined") {
    my.platform = "my";
    return my;
  } else if (typeof tt !== "undefined") {
    tt.platform = "tt";
    return tt;
  } else if (typeof swan !== "undefined") {
    swan.platform = "swan";
    return swan;
  } else if (typeof qq !== "undefined") {
    qq.platform = "qq";
    return qq;
  } else if (typeof wx !== "undefined") {
    wx.platform = typeof window !== "undefined" && typeof location !== "undefined" ? "h5" : "wx";
    return wx;
  }
  return { platform: "none" };
}
var api = getApi();
class LocalStorage {
  getItem(key) {
    if (api.platform === "my") {
      return api.getStorageSync({ key }).data;
    }
    return api.getStorageSync(key);
  }
  setItem(key, value) {
    if (api.platform === "my") {
      return api.setStorageSync({ key, data: value });
    }
    return api.setStorageSync(key, value);
  }
}
var localStorage = new LocalStorage(api);
class CookieStore {
  constructor() {
    this.__storageKey = "__cookie_store__";
    this.__cookiesMap = this.__readFromStorage() || new Map();
  }
  has(name, domain, path) {
    return this.getCookie(name, domain, path) !== void 0;
  }
  get(name = "", domain = "", path = "/") {
    let cookie = this.getCookie(name, domain, path);
    return cookie ? cookie.value : void 0;
  }
  set(name = "", value = "", options = {}) {
    let domain = options.domain;
    if (!domain || !name)
      throw new Error("name \u548C options.domain \u503C\u4E0D\u6B63\u786E\uFF01");
    let cookie = new Cookie(Object.assign(options, {
      name,
      value
    }));
    let cookies = this.__cookiesMap.get(domain) || new Map();
    cookies.set(name, cookie);
    this.__cookiesMap.set(domain, cookies);
    this.__saveToStorage();
    return cookie;
  }
  dir() {
    let dirObj = {};
    for (let domain of this.__cookiesMap.keys()) {
      dirObj[domain] = this.getCookies(domain);
    }
    return dirObj;
  }
  remove(name = "", domain = "") {
    if (domain) {
      let cookies = this.__cookiesMap.get(domain);
      cookies && cookies.delete(name);
      cookies = this.__cookiesMap.get(util.normalizeDomain(domain));
      cookies && cookies.delete(name);
    } else {
      for (let cookies of this.__cookiesMap.values()) {
        cookies.delete(name);
      }
    }
    this.__saveToStorage();
    return true;
  }
  getCookie(name = "", domain = "", path = "/") {
    let cookie;
    let scopeDomains = util.getCookieScopeDomain(domain);
    for (let [key, cookies] of this.__cookiesMap.entries()) {
      if (domain && scopeDomains.indexOf(key) < 0)
        continue;
      cookie = cookies.get(name);
      if (cookie && cookie.isInPath(path) && !cookie.isExpired())
        break;
      cookie = void 0;
    }
    return cookie;
  }
  getCookies(domain, path) {
    let cookieValues = {};
    this.getCookiesArray(domain, path).forEach((cookie) => {
      cookieValues[cookie.name] = cookie.value;
    });
    return cookieValues;
  }
  getCookiesArray(domain = "", path = "/") {
    let cookiesArr = [];
    let scopeDomains = util.getCookieScopeDomain(domain);
    for (let [key, cookies] of this.__cookiesMap.entries()) {
      if (domain && scopeDomains.indexOf(key) < 0)
        continue;
      for (let cookie of cookies.values()) {
        if (cookie.isInPath(path) && !cookie.isExpired()) {
          cookiesArr.push(cookie);
        }
      }
    }
    return cookiesArr;
  }
  setCookiesArray(cookies = []) {
    this.__cookiesMap = this.__cookiesMap || new Map();
    cookies.forEach((cookie) => {
      let cookieMap = this.__cookiesMap.get(cookie.domain);
      if (!cookieMap) {
        cookieMap = new Map();
        this.__cookiesMap.set(cookie.domain, cookieMap);
      }
      cookieMap.set(cookie.name, cookie);
    });
    this.__saveToStorage();
    return this.__cookiesMap;
  }
  clearCookies(domain) {
    if (domain) {
      let cookies = this.__cookiesMap.get(domain);
      cookies && cookies.clear();
    } else {
      this.__cookiesMap.clear();
    }
    this.__saveToStorage();
    return true;
  }
  getRequestCookies(domain, path) {
    let cookiesArr = this.getCookiesArray(domain, path);
    return this.stringify(cookiesArr);
  }
  setResponseCookies(setCookieStr, domain) {
    let parsedCookies = this.parse(setCookieStr, domain);
    return this.setCookiesArray(parsedCookies);
  }
  parse(setCookieStr = "", domain) {
    var cookies = cookieParser.parse(cookieParser.splitCookiesString(setCookieStr), { decodeValues: false });
    return cookies.map((item) => {
      item.domain = util.normalizeDomain(item.domain) || domain;
      return new Cookie(item);
    });
  }
  stringify(cookies) {
    return cookies.map((item) => item.toString()).join("; ");
  }
  __saveToStorage() {
    try {
      let saveCookies = [];
      for (let cookies of this.__cookiesMap.values()) {
        for (let cookie of cookies.values()) {
          if (cookie.isExpired()) {
            cookies.delete(cookie.name);
          } else if (cookie.isPersistence()) {
            saveCookies.push(cookie);
          }
        }
      }
      localStorage.setItem(this.__storageKey, saveCookies);
    } catch (err) {
      console.warn("Cookie \u5B58\u50A8\u5F02\u5E38\uFF1A", err);
    }
  }
  __readFromStorage() {
    try {
      let cookies = localStorage.getItem(this.__storageKey) || [];
      cookies = cookies.map((item) => new Cookie(item));
      return this.setCookiesArray(cookies);
    } catch (err) {
      console.warn("Cookie \u8BFB\u53D6\u5F02\u5E38\uFF1A", err);
    }
  }
}
const cookieStore = function() {
  const cookieStore2 = new CookieStore();
  function cookieRequestProxy(options) {
    options.cookie = options.cookie === void 0 || !!options.cookie;
    options.dataType = options.dataType || "json";
    options.header = options.headers = options.header || options.headers || {};
    options.header["X-Requested-With"] = "XMLHttpRequest";
    if (options.dataType === "json") {
      options.header["Accept"] = "application/json, text/plain, */*";
    }
    if (api.platform !== "h5" && options.cookie) {
      let domain = (options.url || "").split("/")[2];
      let path = options.url.split(domain).pop();
      let requestCookies = cookieStore2.getRequestCookies(domain, path);
      options.header["Cookie"] = requestCookies;
      let successCallback = options.success;
      options.success = function(response) {
        response.header = response.header || response.headers;
        let responseCookies = response.header ? response.header["Set-Cookie"] || response.header["set-cookie"] : "";
        if (responseCookies) {
          responseCookies = responseCookies.replace(/\;([^\s\;]*?(?=\=))/gi, ",$1");
          cookieStore2.setResponseCookies(responseCookies, domain);
        }
        successCallback && successCallback(response);
      };
    }
    return this(options);
  }
  const requestProxy = cookieRequestProxy.bind(api.request);
  const uploadFileProxy = cookieRequestProxy.bind(api.uploadFile);
  const downloadFileProxy = cookieRequestProxy.bind(api.downloadFile);
  try {
    Object.defineProperties(api, {
      requestWithCookie: {
        value: requestProxy
      },
      uploadFileWithCookie: {
        value: uploadFileProxy
      },
      downloadFileWithCookie: {
        value: downloadFileProxy
      }
    });
    Object.defineProperties(api, {
      request: {
        value: requestProxy
      },
      uploadFile: {
        value: uploadFileProxy
      },
      downloadFile: {
        value: downloadFileProxy
      }
    });
  } catch (err) {
    console.error("weapp-cookie: ", err);
  }
  cookieStore2.config = function(options) {
    options = Object.assign({
      requestAlias: "requestWithCookie",
      uploadFileAlias: "uploadFileWithCookie",
      downloadFileAlias: "downloadFileWithCookie"
    }, options);
    if (options.requestAlias) {
      Object.defineProperty(api, options.requestAlias, { value: requestProxy });
    }
    if (options.uploadFileAlias) {
      Object.defineProperty(api, options.uploadFileAlias, {
        value: uploadFileProxy
      });
    }
    if (options.downloadFileAlias) {
      Object.defineProperty(api, options.downloadFileAlias, {
        value: downloadFileProxy
      });
    }
  };
  return cookieStore2;
}();
export { cookieStore as default };
