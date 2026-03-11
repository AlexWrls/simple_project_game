/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ (function(module) {

"use strict";
eval("{\n\nmodule.exports = ansiHTML\n\n// Reference to https://github.com/sindresorhus/ansi-regex\nvar _regANSI = /(?:(?:\\u001b\\[)|\\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\\u001b[A-M]/\n\nvar _defColors = {\n  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]\n  black: '000',\n  red: 'ff0000',\n  green: '209805',\n  yellow: 'e8bf03',\n  blue: '0000ff',\n  magenta: 'ff00ff',\n  cyan: '00ffee',\n  lightgrey: 'f0f0f0',\n  darkgrey: '888'\n}\nvar _styles = {\n  30: 'black',\n  31: 'red',\n  32: 'green',\n  33: 'yellow',\n  34: 'blue',\n  35: 'magenta',\n  36: 'cyan',\n  37: 'lightgrey'\n}\nvar _openTags = {\n  '1': 'font-weight:bold', // bold\n  '2': 'opacity:0.5', // dim\n  '3': '<i>', // italic\n  '4': '<u>', // underscore\n  '8': 'display:none', // hidden\n  '9': '<del>' // delete\n}\nvar _closeTags = {\n  '23': '</i>', // reset italic\n  '24': '</u>', // reset underscore\n  '29': '</del>' // reset delete\n}\n\n;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {\n  _closeTags[n] = '</span>'\n})\n\n/**\n * Converts text with ANSI color codes to HTML markup.\n * @param {String} text\n * @returns {*}\n */\nfunction ansiHTML (text) {\n  // Returns the text if the string has no ANSI escape code.\n  if (!_regANSI.test(text)) {\n    return text\n  }\n\n  // Cache opened sequence.\n  var ansiCodes = []\n  // Replace with markup.\n  var ret = text.replace(/\\033\\[(\\d+)m/g, function (match, seq) {\n    var ot = _openTags[seq]\n    if (ot) {\n      // If current sequence has been opened, close it.\n      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast\n        ansiCodes.pop()\n        return '</span>'\n      }\n      // Open tag.\n      ansiCodes.push(seq)\n      return ot[0] === '<' ? ot : '<span style=\"' + ot + ';\">'\n    }\n\n    var ct = _closeTags[seq]\n    if (ct) {\n      // Pop sequence\n      ansiCodes.pop()\n      return ct\n    }\n    return ''\n  })\n\n  // Make sure tags are closed.\n  var l = ansiCodes.length\n  ;(l > 0) && (ret += Array(l + 1).join('</span>'))\n\n  return ret\n}\n\n/**\n * Customize colors.\n * @param {Object} colors reference to _defColors\n */\nansiHTML.setColors = function (colors) {\n  if (typeof colors !== 'object') {\n    throw new Error('`colors` parameter must be an Object.')\n  }\n\n  var _finalColors = {}\n  for (var key in _defColors) {\n    var hex = colors.hasOwnProperty(key) ? colors[key] : null\n    if (!hex) {\n      _finalColors[key] = _defColors[key]\n      continue\n    }\n    if ('reset' === key) {\n      if (typeof hex === 'string') {\n        hex = [hex]\n      }\n      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {\n        return typeof h !== 'string'\n      })) {\n        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')\n      }\n      var defHexColor = _defColors[key]\n      if (!hex[0]) {\n        hex[0] = defHexColor[0]\n      }\n      if (hex.length === 1 || !hex[1]) {\n        hex = [hex[0]]\n        hex.push(defHexColor[1])\n      }\n\n      hex = hex.slice(0, 2)\n    } else if (typeof hex !== 'string') {\n      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')\n    }\n    _finalColors[key] = hex\n  }\n  _setTags(_finalColors)\n}\n\n/**\n * Reset colors.\n */\nansiHTML.reset = function () {\n  _setTags(_defColors)\n}\n\n/**\n * Expose tags, including open and close.\n * @type {Object}\n */\nansiHTML.tags = {}\n\nif (Object.defineProperty) {\n  Object.defineProperty(ansiHTML.tags, 'open', {\n    get: function () { return _openTags }\n  })\n  Object.defineProperty(ansiHTML.tags, 'close', {\n    get: function () { return _closeTags }\n  })\n} else {\n  ansiHTML.tags.open = _openTags\n  ansiHTML.tags.close = _closeTags\n}\n\nfunction _setTags (colors) {\n  // reset all\n  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]\n  // inverse\n  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]\n  // dark grey\n  _openTags['90'] = 'color:#' + colors.darkgrey\n\n  for (var code in _styles) {\n    var color = _styles[code]\n    var oriColor = colors[color] || '000'\n    _openTags[code] = 'color:#' + oriColor\n    code = parseInt(code)\n    _openTags[(code + 10).toString()] = 'background:#' + oriColor\n  }\n}\n\nansiHTML.reset()\n\n\n//# sourceURL=webpack://space-cat/./node_modules/ansi-html-community/index.js?\n}");

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ (function(module) {

"use strict";
eval("{// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar R = typeof Reflect === 'object' ? Reflect : null\nvar ReflectApply = R && typeof R.apply === 'function'\n  ? R.apply\n  : function ReflectApply(target, receiver, args) {\n    return Function.prototype.apply.call(target, receiver, args);\n  }\n\nvar ReflectOwnKeys\nif (R && typeof R.ownKeys === 'function') {\n  ReflectOwnKeys = R.ownKeys\n} else if (Object.getOwnPropertySymbols) {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target)\n      .concat(Object.getOwnPropertySymbols(target));\n  };\n} else {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target);\n  };\n}\n\nfunction ProcessEmitWarning(warning) {\n  if (console && console.warn) console.warn(warning);\n}\n\nvar NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {\n  return value !== value;\n}\n\nfunction EventEmitter() {\n  EventEmitter.init.call(this);\n}\nmodule.exports = EventEmitter;\nmodule.exports.once = once;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._eventsCount = 0;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nvar defaultMaxListeners = 10;\n\nfunction checkListener(listener) {\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + typeof listener);\n  }\n}\n\nObject.defineProperty(EventEmitter, 'defaultMaxListeners', {\n  enumerable: true,\n  get: function() {\n    return defaultMaxListeners;\n  },\n  set: function(arg) {\n    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {\n      throw new RangeError('The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received ' + arg + '.');\n    }\n    defaultMaxListeners = arg;\n  }\n});\n\nEventEmitter.init = function() {\n\n  if (this._events === undefined ||\n      this._events === Object.getPrototypeOf(this)._events) {\n    this._events = Object.create(null);\n    this._eventsCount = 0;\n  }\n\n  this._maxListeners = this._maxListeners || undefined;\n};\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {\n  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {\n    throw new RangeError('The value of \"n\" is out of range. It must be a non-negative number. Received ' + n + '.');\n  }\n  this._maxListeners = n;\n  return this;\n};\n\nfunction _getMaxListeners(that) {\n  if (that._maxListeners === undefined)\n    return EventEmitter.defaultMaxListeners;\n  return that._maxListeners;\n}\n\nEventEmitter.prototype.getMaxListeners = function getMaxListeners() {\n  return _getMaxListeners(this);\n};\n\nEventEmitter.prototype.emit = function emit(type) {\n  var args = [];\n  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);\n  var doError = (type === 'error');\n\n  var events = this._events;\n  if (events !== undefined)\n    doError = (doError && events.error === undefined);\n  else if (!doError)\n    return false;\n\n  // If there is no 'error' event listener then throw.\n  if (doError) {\n    var er;\n    if (args.length > 0)\n      er = args[0];\n    if (er instanceof Error) {\n      // Note: The comments on the `throw` lines are intentional, they show\n      // up in Node's output if this results in an unhandled exception.\n      throw er; // Unhandled 'error' event\n    }\n    // At least give some kind of context to the user\n    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));\n    err.context = er;\n    throw err; // Unhandled 'error' event\n  }\n\n  var handler = events[type];\n\n  if (handler === undefined)\n    return false;\n\n  if (typeof handler === 'function') {\n    ReflectApply(handler, this, args);\n  } else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      ReflectApply(listeners[i], this, args);\n  }\n\n  return true;\n};\n\nfunction _addListener(target, type, listener, prepend) {\n  var m;\n  var events;\n  var existing;\n\n  checkListener(listener);\n\n  events = target._events;\n  if (events === undefined) {\n    events = target._events = Object.create(null);\n    target._eventsCount = 0;\n  } else {\n    // To avoid recursion in the case that type === \"newListener\"! Before\n    // adding it to the listeners, first emit \"newListener\".\n    if (events.newListener !== undefined) {\n      target.emit('newListener', type,\n                  listener.listener ? listener.listener : listener);\n\n      // Re-assign `events` because a newListener handler could have caused the\n      // this._events to be assigned to a new object\n      events = target._events;\n    }\n    existing = events[type];\n  }\n\n  if (existing === undefined) {\n    // Optimize the case of one listener. Don't need the extra array object.\n    existing = events[type] = listener;\n    ++target._eventsCount;\n  } else {\n    if (typeof existing === 'function') {\n      // Adding the second element, need to change to array.\n      existing = events[type] =\n        prepend ? [listener, existing] : [existing, listener];\n      // If we've already got an array, just append.\n    } else if (prepend) {\n      existing.unshift(listener);\n    } else {\n      existing.push(listener);\n    }\n\n    // Check for listener leak\n    m = _getMaxListeners(target);\n    if (m > 0 && existing.length > m && !existing.warned) {\n      existing.warned = true;\n      // No error code for this since it is a Warning\n      // eslint-disable-next-line no-restricted-syntax\n      var w = new Error('Possible EventEmitter memory leak detected. ' +\n                          existing.length + ' ' + String(type) + ' listeners ' +\n                          'added. Use emitter.setMaxListeners() to ' +\n                          'increase limit');\n      w.name = 'MaxListenersExceededWarning';\n      w.emitter = target;\n      w.type = type;\n      w.count = existing.length;\n      ProcessEmitWarning(w);\n    }\n  }\n\n  return target;\n}\n\nEventEmitter.prototype.addListener = function addListener(type, listener) {\n  return _addListener(this, type, listener, false);\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.prependListener =\n    function prependListener(type, listener) {\n      return _addListener(this, type, listener, true);\n    };\n\nfunction onceWrapper() {\n  if (!this.fired) {\n    this.target.removeListener(this.type, this.wrapFn);\n    this.fired = true;\n    if (arguments.length === 0)\n      return this.listener.call(this.target);\n    return this.listener.apply(this.target, arguments);\n  }\n}\n\nfunction _onceWrap(target, type, listener) {\n  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };\n  var wrapped = onceWrapper.bind(state);\n  wrapped.listener = listener;\n  state.wrapFn = wrapped;\n  return wrapped;\n}\n\nEventEmitter.prototype.once = function once(type, listener) {\n  checkListener(listener);\n  this.on(type, _onceWrap(this, type, listener));\n  return this;\n};\n\nEventEmitter.prototype.prependOnceListener =\n    function prependOnceListener(type, listener) {\n      checkListener(listener);\n      this.prependListener(type, _onceWrap(this, type, listener));\n      return this;\n    };\n\n// Emits a 'removeListener' event if and only if the listener was removed.\nEventEmitter.prototype.removeListener =\n    function removeListener(type, listener) {\n      var list, events, position, i, originalListener;\n\n      checkListener(listener);\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      list = events[type];\n      if (list === undefined)\n        return this;\n\n      if (list === listener || list.listener === listener) {\n        if (--this._eventsCount === 0)\n          this._events = Object.create(null);\n        else {\n          delete events[type];\n          if (events.removeListener)\n            this.emit('removeListener', type, list.listener || listener);\n        }\n      } else if (typeof list !== 'function') {\n        position = -1;\n\n        for (i = list.length - 1; i >= 0; i--) {\n          if (list[i] === listener || list[i].listener === listener) {\n            originalListener = list[i].listener;\n            position = i;\n            break;\n          }\n        }\n\n        if (position < 0)\n          return this;\n\n        if (position === 0)\n          list.shift();\n        else {\n          spliceOne(list, position);\n        }\n\n        if (list.length === 1)\n          events[type] = list[0];\n\n        if (events.removeListener !== undefined)\n          this.emit('removeListener', type, originalListener || listener);\n      }\n\n      return this;\n    };\n\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\n\nEventEmitter.prototype.removeAllListeners =\n    function removeAllListeners(type) {\n      var listeners, events, i;\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      // not listening for removeListener, no need to emit\n      if (events.removeListener === undefined) {\n        if (arguments.length === 0) {\n          this._events = Object.create(null);\n          this._eventsCount = 0;\n        } else if (events[type] !== undefined) {\n          if (--this._eventsCount === 0)\n            this._events = Object.create(null);\n          else\n            delete events[type];\n        }\n        return this;\n      }\n\n      // emit removeListener for all listeners on all events\n      if (arguments.length === 0) {\n        var keys = Object.keys(events);\n        var key;\n        for (i = 0; i < keys.length; ++i) {\n          key = keys[i];\n          if (key === 'removeListener') continue;\n          this.removeAllListeners(key);\n        }\n        this.removeAllListeners('removeListener');\n        this._events = Object.create(null);\n        this._eventsCount = 0;\n        return this;\n      }\n\n      listeners = events[type];\n\n      if (typeof listeners === 'function') {\n        this.removeListener(type, listeners);\n      } else if (listeners !== undefined) {\n        // LIFO order\n        for (i = listeners.length - 1; i >= 0; i--) {\n          this.removeListener(type, listeners[i]);\n        }\n      }\n\n      return this;\n    };\n\nfunction _listeners(target, type, unwrap) {\n  var events = target._events;\n\n  if (events === undefined)\n    return [];\n\n  var evlistener = events[type];\n  if (evlistener === undefined)\n    return [];\n\n  if (typeof evlistener === 'function')\n    return unwrap ? [evlistener.listener || evlistener] : [evlistener];\n\n  return unwrap ?\n    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);\n}\n\nEventEmitter.prototype.listeners = function listeners(type) {\n  return _listeners(this, type, true);\n};\n\nEventEmitter.prototype.rawListeners = function rawListeners(type) {\n  return _listeners(this, type, false);\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  if (typeof emitter.listenerCount === 'function') {\n    return emitter.listenerCount(type);\n  } else {\n    return listenerCount.call(emitter, type);\n  }\n};\n\nEventEmitter.prototype.listenerCount = listenerCount;\nfunction listenerCount(type) {\n  var events = this._events;\n\n  if (events !== undefined) {\n    var evlistener = events[type];\n\n    if (typeof evlistener === 'function') {\n      return 1;\n    } else if (evlistener !== undefined) {\n      return evlistener.length;\n    }\n  }\n\n  return 0;\n}\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];\n};\n\nfunction arrayClone(arr, n) {\n  var copy = new Array(n);\n  for (var i = 0; i < n; ++i)\n    copy[i] = arr[i];\n  return copy;\n}\n\nfunction spliceOne(list, index) {\n  for (; index + 1 < list.length; index++)\n    list[index] = list[index + 1];\n  list.pop();\n}\n\nfunction unwrapListeners(arr) {\n  var ret = new Array(arr.length);\n  for (var i = 0; i < ret.length; ++i) {\n    ret[i] = arr[i].listener || arr[i];\n  }\n  return ret;\n}\n\nfunction once(emitter, name) {\n  return new Promise(function (resolve, reject) {\n    function errorListener(err) {\n      emitter.removeListener(name, resolver);\n      reject(err);\n    }\n\n    function resolver() {\n      if (typeof emitter.removeListener === 'function') {\n        emitter.removeListener('error', errorListener);\n      }\n      resolve([].slice.call(arguments));\n    };\n\n    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });\n    if (name !== 'error') {\n      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });\n    }\n  });\n}\n\nfunction addErrorHandlerIfEventEmitter(emitter, handler, flags) {\n  if (typeof emitter.on === 'function') {\n    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);\n  }\n}\n\nfunction eventTargetAgnosticAddListener(emitter, name, listener, flags) {\n  if (typeof emitter.on === 'function') {\n    if (flags.once) {\n      emitter.once(name, listener);\n    } else {\n      emitter.on(name, listener);\n    }\n  } else if (typeof emitter.addEventListener === 'function') {\n    // EventTarget does not have `error` event semantics like Node\n    // EventEmitters, we do not listen for `error` events here.\n    emitter.addEventListener(name, function wrapListener(arg) {\n      // IE does not have builtin `{ once: true }` support so we\n      // have to do it manually.\n      if (flags.once) {\n        emitter.removeEventListener(name, wrapListener);\n      }\n      listener(arg);\n    });\n  } else {\n    throw new TypeError('The \"emitter\" argument must be of type EventEmitter. Received type ' + typeof emitter);\n  }\n}\n\n\n//# sourceURL=webpack://space-cat/./node_modules/events/events.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ WebSocketClient; }\n/* harmony export */ });\n/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ \"./node_modules/webpack-dev-server/client/utils/log.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return typeof key === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (typeof input !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (typeof res !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n\nvar WebSocketClient = /*#__PURE__*/function () {\n  /**\n   * @param {string} url\n   */\n  function WebSocketClient(url) {\n    _classCallCheck(this, WebSocketClient);\n    this.client = new WebSocket(url);\n    this.client.onerror = function (error) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);\n    };\n  }\n\n  /**\n   * @param {(...args: any[]) => void} f\n   */\n  _createClass(WebSocketClient, [{\n    key: \"onOpen\",\n    value: function onOpen(f) {\n      this.client.onopen = f;\n    }\n\n    /**\n     * @param {(...args: any[]) => void} f\n     */\n  }, {\n    key: \"onClose\",\n    value: function onClose(f) {\n      this.client.onclose = f;\n    }\n\n    // call f with the message string as the first argument\n    /**\n     * @param {(...args: any[]) => void} f\n     */\n  }, {\n    key: \"onMessage\",\n    value: function onMessage(f) {\n      this.client.onmessage = function (e) {\n        f(e.data);\n      };\n    }\n  }]);\n  return WebSocketClient;\n}();\n\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/clients/WebSocketClient.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true ***!
  \***********************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{var __resourceQuery = \"?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ \"./node_modules/webpack/hot/log.js\");\n/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/stripAnsi.js */ \"./node_modules/webpack-dev-server/client/utils/stripAnsi.js\");\n/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ \"./node_modules/webpack-dev-server/client/utils/parseURL.js\");\n/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ \"./node_modules/webpack-dev-server/client/socket.js\");\n/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ \"./node_modules/webpack-dev-server/client/overlay.js\");\n/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ \"./node_modules/webpack-dev-server/client/utils/log.js\");\n/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ \"./node_modules/webpack-dev-server/client/utils/sendMessage.js\");\n/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ \"./node_modules/webpack-dev-server/client/utils/reloadApp.js\");\n/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ \"./node_modules/webpack-dev-server/client/utils/createSocketURL.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return typeof key === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (typeof input !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (typeof res !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n/* global __resourceQuery, __webpack_hash__ */\n/// <reference types=\"webpack/module\" />\n\n\n\n\n\n\n\n\n\n\n/**\n * @typedef {Object} OverlayOptions\n * @property {boolean | (error: Error) => boolean} [warnings]\n * @property {boolean | (error: Error) => boolean} [errors]\n * @property {boolean | (error: Error) => boolean} [runtimeErrors]\n * @property {string} [trustedTypesPolicyName]\n */\n\n/**\n * @typedef {Object} Options\n * @property {boolean} hot\n * @property {boolean} liveReload\n * @property {boolean} progress\n * @property {boolean | OverlayOptions} overlay\n * @property {string} [logging]\n * @property {number} [reconnect]\n */\n\n/**\n * @typedef {Object} Status\n * @property {boolean} isUnloading\n * @property {string} currentHash\n * @property {string} [previousHash]\n */\n\n/**\n * @param {boolean | { warnings?: boolean | string; errors?: boolean | string; runtimeErrors?: boolean | string; }} overlayOptions\n */\nvar decodeOverlayOptions = function decodeOverlayOptions(overlayOptions) {\n  if (typeof overlayOptions === \"object\") {\n    [\"warnings\", \"errors\", \"runtimeErrors\"].forEach(function (property) {\n      if (typeof overlayOptions[property] === \"string\") {\n        var overlayFilterFunctionString = decodeURIComponent(overlayOptions[property]);\n\n        // eslint-disable-next-line no-new-func\n        var overlayFilterFunction = new Function(\"message\", \"var callback = \".concat(overlayFilterFunctionString, \"\\n        return callback(message)\"));\n        overlayOptions[property] = overlayFilterFunction;\n      }\n    });\n  }\n};\n\n/**\n * @type {Status}\n */\nvar status = {\n  isUnloading: false,\n  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement\n  // eslint-disable-next-line camelcase\n  currentHash:  true ? __webpack_require__.h() : 0\n};\n\n/** @type {Options} */\nvar options = {\n  hot: false,\n  liveReload: false,\n  progress: false,\n  overlay: false\n};\nvar parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(__resourceQuery);\nvar enabledFeatures = {\n  \"Hot Module Replacement\": false,\n  \"Live Reloading\": false,\n  Progress: false,\n  Overlay: false\n};\nif (parsedResourceQuery.hot === \"true\") {\n  options.hot = true;\n  enabledFeatures[\"Hot Module Replacement\"] = true;\n}\nif (parsedResourceQuery[\"live-reload\"] === \"true\") {\n  options.liveReload = true;\n  enabledFeatures[\"Live Reloading\"] = true;\n}\nif (parsedResourceQuery.progress === \"true\") {\n  options.progress = true;\n  enabledFeatures.Progress = true;\n}\nif (parsedResourceQuery.overlay) {\n  try {\n    options.overlay = JSON.parse(parsedResourceQuery.overlay);\n  } catch (e) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(\"Error parsing overlay options from resource query:\", e);\n  }\n\n  // Fill in default \"true\" params for partially-specified objects.\n  if (typeof options.overlay === \"object\") {\n    options.overlay = _objectSpread({\n      errors: true,\n      warnings: true,\n      runtimeErrors: true\n    }, options.overlay);\n    decodeOverlayOptions(options.overlay);\n  }\n  enabledFeatures.Overlay = true;\n}\nif (parsedResourceQuery.logging) {\n  options.logging = parsedResourceQuery.logging;\n}\nif (typeof parsedResourceQuery.reconnect !== \"undefined\") {\n  options.reconnect = Number(parsedResourceQuery.reconnect);\n}\n\n/**\n * @param {string} level\n */\nfunction setAllLogLevel(level) {\n  // This is needed because the HMR logger operate separately from dev server logger\n  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === \"verbose\" || level === \"log\" ? \"info\" : level);\n  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);\n}\nif (options.logging) {\n  setAllLogLevel(options.logging);\n}\n(0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.logEnabledFeatures)(enabledFeatures);\nself.addEventListener(\"beforeunload\", function () {\n  status.isUnloading = true;\n});\nvar overlay = typeof window !== \"undefined\" ? (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.createOverlay)(typeof options.overlay === \"object\" ? {\n  trustedTypesPolicyName: options.overlay.trustedTypesPolicyName,\n  catchRuntimeError: options.overlay.runtimeErrors\n} : {\n  trustedTypesPolicyName: false,\n  catchRuntimeError: options.overlay\n}) : {\n  send: function send() {}\n};\nvar onSocketMessage = {\n  hot: function hot() {\n    if (parsedResourceQuery.hot === \"false\") {\n      return;\n    }\n    options.hot = true;\n  },\n  liveReload: function liveReload() {\n    if (parsedResourceQuery[\"live-reload\"] === \"false\") {\n      return;\n    }\n    options.liveReload = true;\n  },\n  invalid: function invalid() {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"App updated. Recompiling...\");\n\n    // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.\n    if (options.overlay) {\n      overlay.send({\n        type: \"DISMISS\"\n      });\n    }\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"Invalid\");\n  },\n  /**\n   * @param {string} hash\n   */\n  hash: function hash(_hash) {\n    status.previousHash = status.currentHash;\n    status.currentHash = _hash;\n  },\n  logging: setAllLogLevel,\n  /**\n   * @param {boolean} value\n   */\n  overlay: function overlay(value) {\n    if (typeof document === \"undefined\") {\n      return;\n    }\n    options.overlay = value;\n    decodeOverlayOptions(options.overlay);\n  },\n  /**\n   * @param {number} value\n   */\n  reconnect: function reconnect(value) {\n    if (parsedResourceQuery.reconnect === \"false\") {\n      return;\n    }\n    options.reconnect = value;\n  },\n  /**\n   * @param {boolean} value\n   */\n  progress: function progress(value) {\n    options.progress = value;\n  },\n  /**\n   * @param {{ pluginName?: string, percent: number, msg: string }} data\n   */\n  \"progress-update\": function progressUpdate(data) {\n    if (options.progress) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"\".concat(data.pluginName ? \"[\".concat(data.pluginName, \"] \") : \"\").concat(data.percent, \"% - \").concat(data.msg, \".\"));\n    }\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"Progress\", data);\n  },\n  \"still-ok\": function stillOk() {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"Nothing changed.\");\n    if (options.overlay) {\n      overlay.send({\n        type: \"DISMISS\"\n      });\n    }\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"StillOk\");\n  },\n  ok: function ok() {\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"Ok\");\n    if (options.overlay) {\n      overlay.send({\n        type: \"DISMISS\"\n      });\n    }\n    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(options, status);\n  },\n  // TODO: remove in v5 in favor of 'static-changed'\n  /**\n   * @param {string} file\n   */\n  \"content-changed\": function contentChanged(file) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"\".concat(file ? \"\\\"\".concat(file, \"\\\"\") : \"Content\", \" from static directory was changed. Reloading...\"));\n    self.location.reload();\n  },\n  /**\n   * @param {string} file\n   */\n  \"static-changed\": function staticChanged(file) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"\".concat(file ? \"\\\"\".concat(file, \"\\\"\") : \"Content\", \" from static directory was changed. Reloading...\"));\n    self.location.reload();\n  },\n  /**\n   * @param {Error[]} warnings\n   * @param {any} params\n   */\n  warnings: function warnings(_warnings, params) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(\"Warnings while compiling.\");\n    var printableWarnings = _warnings.map(function (error) {\n      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)(\"warning\", error),\n        header = _formatProblem.header,\n        body = _formatProblem.body;\n      return \"\".concat(header, \"\\n\").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(body));\n    });\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"Warnings\", printableWarnings);\n    for (var i = 0; i < printableWarnings.length; i++) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);\n    }\n    var overlayWarningsSetting = typeof options.overlay === \"boolean\" ? options.overlay : options.overlay && options.overlay.warnings;\n    if (overlayWarningsSetting) {\n      var warningsToDisplay = typeof overlayWarningsSetting === \"function\" ? _warnings.filter(overlayWarningsSetting) : _warnings;\n      if (warningsToDisplay.length) {\n        overlay.send({\n          type: \"BUILD_ERROR\",\n          level: \"warning\",\n          messages: _warnings\n        });\n      }\n    }\n    if (params && params.preventReloading) {\n      return;\n    }\n    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(options, status);\n  },\n  /**\n   * @param {Error[]} errors\n   */\n  errors: function errors(_errors) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(\"Errors while compiling. Reload prevented.\");\n    var printableErrors = _errors.map(function (error) {\n      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)(\"error\", error),\n        header = _formatProblem2.header,\n        body = _formatProblem2.body;\n      return \"\".concat(header, \"\\n\").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(body));\n    });\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"Errors\", printableErrors);\n    for (var i = 0; i < printableErrors.length; i++) {\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);\n    }\n    var overlayErrorsSettings = typeof options.overlay === \"boolean\" ? options.overlay : options.overlay && options.overlay.errors;\n    if (overlayErrorsSettings) {\n      var errorsToDisplay = typeof overlayErrorsSettings === \"function\" ? _errors.filter(overlayErrorsSettings) : _errors;\n      if (errorsToDisplay.length) {\n        overlay.send({\n          type: \"BUILD_ERROR\",\n          level: \"error\",\n          messages: _errors\n        });\n      }\n    }\n  },\n  /**\n   * @param {Error} error\n   */\n  error: function error(_error) {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);\n  },\n  close: function close() {\n    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info(\"Disconnected!\");\n    if (options.overlay) {\n      overlay.send({\n        type: \"DISMISS\"\n      });\n    }\n    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(\"Close\");\n  }\n};\nvar socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(parsedResourceQuery);\n(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(socketURL, onSocketMessage, options.reconnect);\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/index.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("{/******/ (function() { // webpackBootstrap\n/******/ \t\"use strict\";\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ \"./client-src/modules/logger/SyncBailHookFake.js\":\n/*!*******************************************************!*\\\n  !*** ./client-src/modules/logger/SyncBailHookFake.js ***!\n  \\*******************************************************/\n/***/ (function(module) {\n\n\n\n/**\n * Client stub for tapable SyncBailHook\n */\nmodule.exports = function clientTapableSyncBailHook() {\n  return {\n    call: function call() {}\n  };\n};\n\n/***/ }),\n\n/***/ \"./node_modules/webpack/lib/logging/Logger.js\":\n/*!****************************************************!*\\\n  !*** ./node_modules/webpack/lib/logging/Logger.js ***!\n  \\****************************************************/\n/***/ (function(__unused_webpack_module, exports) {\n\n/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n\n\nfunction _toConsumableArray(arr) {\n  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();\n}\nfunction _nonIterableSpread() {\n  throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\nfunction _unsupportedIterableToArray(o, minLen) {\n  if (!o) return;\n  if (typeof o === \"string\") return _arrayLikeToArray(o, minLen);\n  var n = Object.prototype.toString.call(o).slice(8, -1);\n  if (n === \"Object\" && o.constructor) n = o.constructor.name;\n  if (n === \"Map\" || n === \"Set\") return Array.from(o);\n  if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);\n}\nfunction _iterableToArray(iter) {\n  if (typeof (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }) !== \"undefined\" && iter[(typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter);\n}\nfunction _arrayWithoutHoles(arr) {\n  if (Array.isArray(arr)) return _arrayLikeToArray(arr);\n}\nfunction _arrayLikeToArray(arr, len) {\n  if (len == null || len > arr.length) len = arr.length;\n  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];\n  return arr2;\n}\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\nfunction _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);\n  }\n}\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  Object.defineProperty(Constructor, \"prototype\", {\n    writable: false\n  });\n  return Constructor;\n}\nfunction _toPropertyKey(arg) {\n  var key = _toPrimitive(arg, \"string\");\n  return typeof key === \"symbol\" ? key : String(key);\n}\nfunction _toPrimitive(input, hint) {\n  if (typeof input !== \"object\" || input === null) return input;\n  var prim = input[(typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).toPrimitive];\n  if (prim !== undefined) {\n    var res = prim.call(input, hint || \"default\");\n    if (typeof res !== \"object\") return res;\n    throw new TypeError(\"@@toPrimitive must return a primitive value.\");\n  }\n  return (hint === \"string\" ? String : Number)(input);\n}\nvar LogType = Object.freeze({\n  error: /** @type {\"error\"} */\"error\",\n  // message, c style arguments\n  warn: /** @type {\"warn\"} */\"warn\",\n  // message, c style arguments\n  info: /** @type {\"info\"} */\"info\",\n  // message, c style arguments\n  log: /** @type {\"log\"} */\"log\",\n  // message, c style arguments\n  debug: /** @type {\"debug\"} */\"debug\",\n  // message, c style arguments\n\n  trace: /** @type {\"trace\"} */\"trace\",\n  // no arguments\n\n  group: /** @type {\"group\"} */\"group\",\n  // [label]\n  groupCollapsed: /** @type {\"groupCollapsed\"} */\"groupCollapsed\",\n  // [label]\n  groupEnd: /** @type {\"groupEnd\"} */\"groupEnd\",\n  // [label]\n\n  profile: /** @type {\"profile\"} */\"profile\",\n  // [profileName]\n  profileEnd: /** @type {\"profileEnd\"} */\"profileEnd\",\n  // [profileName]\n\n  time: /** @type {\"time\"} */\"time\",\n  // name, time as [seconds, nanoseconds]\n\n  clear: /** @type {\"clear\"} */\"clear\",\n  // no arguments\n  status: /** @type {\"status\"} */\"status\" // message, arguments\n});\n\nexports.LogType = LogType;\n\n/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */\n\nvar LOG_SYMBOL = (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; })(\"webpack logger raw log method\");\nvar TIMERS_SYMBOL = (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; })(\"webpack logger times\");\nvar TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; })(\"webpack logger aggregated times\");\nvar WebpackLogger = /*#__PURE__*/function () {\n  /**\n   * @param {function(LogTypeEnum, any[]=): void} log log function\n   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger\n   */\n  function WebpackLogger(log, getChildLogger) {\n    _classCallCheck(this, WebpackLogger);\n    this[LOG_SYMBOL] = log;\n    this.getChildLogger = getChildLogger;\n  }\n  _createClass(WebpackLogger, [{\n    key: \"error\",\n    value: function error() {\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n      this[LOG_SYMBOL](LogType.error, args);\n    }\n  }, {\n    key: \"warn\",\n    value: function warn() {\n      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n      this[LOG_SYMBOL](LogType.warn, args);\n    }\n  }, {\n    key: \"info\",\n    value: function info() {\n      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {\n        args[_key3] = arguments[_key3];\n      }\n      this[LOG_SYMBOL](LogType.info, args);\n    }\n  }, {\n    key: \"log\",\n    value: function log() {\n      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {\n        args[_key4] = arguments[_key4];\n      }\n      this[LOG_SYMBOL](LogType.log, args);\n    }\n  }, {\n    key: \"debug\",\n    value: function debug() {\n      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {\n        args[_key5] = arguments[_key5];\n      }\n      this[LOG_SYMBOL](LogType.debug, args);\n    }\n  }, {\n    key: \"assert\",\n    value: function assert(assertion) {\n      if (!assertion) {\n        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {\n          args[_key6 - 1] = arguments[_key6];\n        }\n        this[LOG_SYMBOL](LogType.error, args);\n      }\n    }\n  }, {\n    key: \"trace\",\n    value: function trace() {\n      this[LOG_SYMBOL](LogType.trace, [\"Trace\"]);\n    }\n  }, {\n    key: \"clear\",\n    value: function clear() {\n      this[LOG_SYMBOL](LogType.clear);\n    }\n  }, {\n    key: \"status\",\n    value: function status() {\n      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {\n        args[_key7] = arguments[_key7];\n      }\n      this[LOG_SYMBOL](LogType.status, args);\n    }\n  }, {\n    key: \"group\",\n    value: function group() {\n      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {\n        args[_key8] = arguments[_key8];\n      }\n      this[LOG_SYMBOL](LogType.group, args);\n    }\n  }, {\n    key: \"groupCollapsed\",\n    value: function groupCollapsed() {\n      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {\n        args[_key9] = arguments[_key9];\n      }\n      this[LOG_SYMBOL](LogType.groupCollapsed, args);\n    }\n  }, {\n    key: \"groupEnd\",\n    value: function groupEnd() {\n      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {\n        args[_key10] = arguments[_key10];\n      }\n      this[LOG_SYMBOL](LogType.groupEnd, args);\n    }\n  }, {\n    key: \"profile\",\n    value: function profile(label) {\n      this[LOG_SYMBOL](LogType.profile, [label]);\n    }\n  }, {\n    key: \"profileEnd\",\n    value: function profileEnd(label) {\n      this[LOG_SYMBOL](LogType.profileEnd, [label]);\n    }\n  }, {\n    key: \"time\",\n    value: function time(label) {\n      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();\n      this[TIMERS_SYMBOL].set(label, process.hrtime());\n    }\n  }, {\n    key: \"timeLog\",\n    value: function timeLog(label) {\n      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);\n      if (!prev) {\n        throw new Error(\"No such label '\".concat(label, \"' for WebpackLogger.timeLog()\"));\n      }\n      var time = process.hrtime(prev);\n      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));\n    }\n  }, {\n    key: \"timeEnd\",\n    value: function timeEnd(label) {\n      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);\n      if (!prev) {\n        throw new Error(\"No such label '\".concat(label, \"' for WebpackLogger.timeEnd()\"));\n      }\n      var time = process.hrtime(prev);\n      this[TIMERS_SYMBOL].delete(label);\n      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));\n    }\n  }, {\n    key: \"timeAggregate\",\n    value: function timeAggregate(label) {\n      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);\n      if (!prev) {\n        throw new Error(\"No such label '\".concat(label, \"' for WebpackLogger.timeAggregate()\"));\n      }\n      var time = process.hrtime(prev);\n      this[TIMERS_SYMBOL].delete(label);\n      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();\n      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);\n      if (current !== undefined) {\n        if (time[1] + current[1] > 1e9) {\n          time[0] += current[0] + 1;\n          time[1] = time[1] - 1e9 + current[1];\n        } else {\n          time[0] += current[0];\n          time[1] += current[1];\n        }\n      }\n      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);\n    }\n  }, {\n    key: \"timeAggregateEnd\",\n    value: function timeAggregateEnd(label) {\n      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;\n      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);\n      if (time === undefined) return;\n      this[TIMERS_AGGREGATES_SYMBOL].delete(label);\n      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));\n    }\n  }]);\n  return WebpackLogger;\n}();\nexports.Logger = WebpackLogger;\n\n/***/ }),\n\n/***/ \"./node_modules/webpack/lib/logging/createConsoleLogger.js\":\n/*!*****************************************************************!*\\\n  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!\n  \\*****************************************************************/\n/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_11285__) {\n\n/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n\n\nfunction _toConsumableArray(arr) {\n  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();\n}\nfunction _nonIterableSpread() {\n  throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\nfunction _unsupportedIterableToArray(o, minLen) {\n  if (!o) return;\n  if (typeof o === \"string\") return _arrayLikeToArray(o, minLen);\n  var n = Object.prototype.toString.call(o).slice(8, -1);\n  if (n === \"Object\" && o.constructor) n = o.constructor.name;\n  if (n === \"Map\" || n === \"Set\") return Array.from(o);\n  if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);\n}\nfunction _iterableToArray(iter) {\n  if (typeof (typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }) !== \"undefined\" && iter[(typeof Symbol !== \"undefined\" ? Symbol : function (i) { return i; }).iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter);\n}\nfunction _arrayWithoutHoles(arr) {\n  if (Array.isArray(arr)) return _arrayLikeToArray(arr);\n}\nfunction _arrayLikeToArray(arr, len) {\n  if (len == null || len > arr.length) len = arr.length;\n  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];\n  return arr2;\n}\nvar _require = __nested_webpack_require_11285__(/*! ./Logger */ \"./node_modules/webpack/lib/logging/Logger.js\"),\n  LogType = _require.LogType;\n\n/** @typedef {import(\"../../declarations/WebpackOptions\").FilterItemTypes} FilterItemTypes */\n/** @typedef {import(\"../../declarations/WebpackOptions\").FilterTypes} FilterTypes */\n/** @typedef {import(\"./Logger\").LogTypeEnum} LogTypeEnum */\n\n/** @typedef {function(string): boolean} FilterFunction */\n\n/**\n * @typedef {Object} LoggerConsole\n * @property {function(): void} clear\n * @property {function(): void} trace\n * @property {(...args: any[]) => void} info\n * @property {(...args: any[]) => void} log\n * @property {(...args: any[]) => void} warn\n * @property {(...args: any[]) => void} error\n * @property {(...args: any[]) => void=} debug\n * @property {(...args: any[]) => void=} group\n * @property {(...args: any[]) => void=} groupCollapsed\n * @property {(...args: any[]) => void=} groupEnd\n * @property {(...args: any[]) => void=} status\n * @property {(...args: any[]) => void=} profile\n * @property {(...args: any[]) => void=} profileEnd\n * @property {(...args: any[]) => void=} logTime\n */\n\n/**\n * @typedef {Object} LoggerOptions\n * @property {false|true|\"none\"|\"error\"|\"warn\"|\"info\"|\"log\"|\"verbose\"} level loglevel\n * @property {FilterTypes|boolean} debug filter for debug logging\n * @property {LoggerConsole} console the console to log to\n */\n\n/**\n * @param {FilterItemTypes} item an input item\n * @returns {FilterFunction} filter function\n */\nvar filterToFunction = function filterToFunction(item) {\n  if (typeof item === \"string\") {\n    var regExp = new RegExp(\"[\\\\\\\\/]\".concat(item.replace(\n    // eslint-disable-next-line no-useless-escape\n    /[-[\\]{}()*+?.\\\\^$|]/g, \"\\\\$&\"), \"([\\\\\\\\/]|$|!|\\\\?)\"));\n    return function (ident) {\n      return regExp.test(ident);\n    };\n  }\n  if (item && typeof item === \"object\" && typeof item.test === \"function\") {\n    return function (ident) {\n      return item.test(ident);\n    };\n  }\n  if (typeof item === \"function\") {\n    return item;\n  }\n  if (typeof item === \"boolean\") {\n    return function () {\n      return item;\n    };\n  }\n};\n\n/**\n * @enum {number}\n */\nvar LogLevel = {\n  none: 6,\n  false: 6,\n  error: 5,\n  warn: 4,\n  info: 3,\n  log: 2,\n  true: 2,\n  verbose: 1\n};\n\n/**\n * @param {LoggerOptions} options options object\n * @returns {function(string, LogTypeEnum, any[]): void} logging function\n */\nmodule.exports = function (_ref) {\n  var _ref$level = _ref.level,\n    level = _ref$level === void 0 ? \"info\" : _ref$level,\n    _ref$debug = _ref.debug,\n    debug = _ref$debug === void 0 ? false : _ref$debug,\n    console = _ref.console;\n  var debugFilters = typeof debug === \"boolean\" ? [function () {\n    return debug;\n  }] : /** @type {FilterItemTypes[]} */[].concat(debug).map(filterToFunction);\n  /** @type {number} */\n  var loglevel = LogLevel[\"\".concat(level)] || 0;\n\n  /**\n   * @param {string} name name of the logger\n   * @param {LogTypeEnum} type type of the log entry\n   * @param {any[]} args arguments of the log entry\n   * @returns {void}\n   */\n  var logger = function logger(name, type, args) {\n    var labeledArgs = function labeledArgs() {\n      if (Array.isArray(args)) {\n        if (args.length > 0 && typeof args[0] === \"string\") {\n          return [\"[\".concat(name, \"] \").concat(args[0])].concat(_toConsumableArray(args.slice(1)));\n        } else {\n          return [\"[\".concat(name, \"]\")].concat(_toConsumableArray(args));\n        }\n      } else {\n        return [];\n      }\n    };\n    var debug = debugFilters.some(function (f) {\n      return f(name);\n    });\n    switch (type) {\n      case LogType.debug:\n        if (!debug) return;\n        // eslint-disable-next-line node/no-unsupported-features/node-builtins\n        if (typeof console.debug === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.debug.apply(console, _toConsumableArray(labeledArgs()));\n        } else {\n          console.log.apply(console, _toConsumableArray(labeledArgs()));\n        }\n        break;\n      case LogType.log:\n        if (!debug && loglevel > LogLevel.log) return;\n        console.log.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n      case LogType.info:\n        if (!debug && loglevel > LogLevel.info) return;\n        console.info.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n      case LogType.warn:\n        if (!debug && loglevel > LogLevel.warn) return;\n        console.warn.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n      case LogType.error:\n        if (!debug && loglevel > LogLevel.error) return;\n        console.error.apply(console, _toConsumableArray(labeledArgs()));\n        break;\n      case LogType.trace:\n        if (!debug) return;\n        console.trace();\n        break;\n      case LogType.groupCollapsed:\n        if (!debug && loglevel > LogLevel.log) return;\n        if (!debug && loglevel > LogLevel.verbose) {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          if (typeof console.groupCollapsed === \"function\") {\n            // eslint-disable-next-line node/no-unsupported-features/node-builtins\n            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));\n          } else {\n            console.log.apply(console, _toConsumableArray(labeledArgs()));\n          }\n          break;\n        }\n      // falls through\n      case LogType.group:\n        if (!debug && loglevel > LogLevel.log) return;\n        // eslint-disable-next-line node/no-unsupported-features/node-builtins\n        if (typeof console.group === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.group.apply(console, _toConsumableArray(labeledArgs()));\n        } else {\n          console.log.apply(console, _toConsumableArray(labeledArgs()));\n        }\n        break;\n      case LogType.groupEnd:\n        if (!debug && loglevel > LogLevel.log) return;\n        // eslint-disable-next-line node/no-unsupported-features/node-builtins\n        if (typeof console.groupEnd === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.groupEnd();\n        }\n        break;\n      case LogType.time:\n        {\n          if (!debug && loglevel > LogLevel.log) return;\n          var ms = args[1] * 1000 + args[2] / 1000000;\n          var msg = \"[\".concat(name, \"] \").concat(args[0], \": \").concat(ms, \" ms\");\n          if (typeof console.logTime === \"function\") {\n            console.logTime(msg);\n          } else {\n            console.log(msg);\n          }\n          break;\n        }\n      case LogType.profile:\n        // eslint-disable-next-line node/no-unsupported-features/node-builtins\n        if (typeof console.profile === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.profile.apply(console, _toConsumableArray(labeledArgs()));\n        }\n        break;\n      case LogType.profileEnd:\n        // eslint-disable-next-line node/no-unsupported-features/node-builtins\n        if (typeof console.profileEnd === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));\n        }\n        break;\n      case LogType.clear:\n        if (!debug && loglevel > LogLevel.log) return;\n        // eslint-disable-next-line node/no-unsupported-features/node-builtins\n        if (typeof console.clear === \"function\") {\n          // eslint-disable-next-line node/no-unsupported-features/node-builtins\n          console.clear();\n        }\n        break;\n      case LogType.status:\n        if (!debug && loglevel > LogLevel.info) return;\n        if (typeof console.status === \"function\") {\n          if (args.length === 0) {\n            console.status();\n          } else {\n            console.status.apply(console, _toConsumableArray(labeledArgs()));\n          }\n        } else {\n          if (args.length !== 0) {\n            console.info.apply(console, _toConsumableArray(labeledArgs()));\n          }\n        }\n        break;\n      default:\n        throw new Error(\"Unexpected LogType \".concat(type));\n    }\n  };\n  return logger;\n};\n\n/***/ }),\n\n/***/ \"./node_modules/webpack/lib/logging/runtime.js\":\n/*!*****************************************************!*\\\n  !*** ./node_modules/webpack/lib/logging/runtime.js ***!\n  \\*****************************************************/\n/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_21334__) {\n\n/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n\n\nfunction _extends() {\n  _extends = Object.assign ? Object.assign.bind() : function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n    return target;\n  };\n  return _extends.apply(this, arguments);\n}\nvar SyncBailHook = __nested_webpack_require_21334__(/*! tapable/lib/SyncBailHook */ \"./client-src/modules/logger/SyncBailHookFake.js\");\nvar _require = __nested_webpack_require_21334__(/*! ./Logger */ \"./node_modules/webpack/lib/logging/Logger.js\"),\n  Logger = _require.Logger;\nvar createConsoleLogger = __nested_webpack_require_21334__(/*! ./createConsoleLogger */ \"./node_modules/webpack/lib/logging/createConsoleLogger.js\");\n\n/** @type {createConsoleLogger.LoggerOptions} */\nvar currentDefaultLoggerOptions = {\n  level: \"info\",\n  debug: false,\n  console: console\n};\nvar currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);\n\n/**\n * @param {string} name name of the logger\n * @returns {Logger} a logger\n */\nexports.getLogger = function (name) {\n  return new Logger(function (type, args) {\n    if (exports.hooks.log.call(name, type, args) === undefined) {\n      currentDefaultLogger(name, type, args);\n    }\n  }, function (childName) {\n    return exports.getLogger(\"\".concat(name, \"/\").concat(childName));\n  });\n};\n\n/**\n * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options\n * @returns {void}\n */\nexports.configureDefaultLogger = function (options) {\n  _extends(currentDefaultLoggerOptions, options);\n  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);\n};\nexports.hooks = {\n  log: new SyncBailHook([\"origin\", \"type\", \"args\"])\n};\n\n/***/ })\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tvar __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __nested_webpack_require_23461__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tvar cachedModule = __webpack_module_cache__[moduleId];\n/******/ \t\tif (cachedModule !== undefined) {\n/******/ \t\t\treturn cachedModule.exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_23461__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t/* webpack/runtime/define property getters */\n/******/ \t!function() {\n/******/ \t\t// define getter functions for harmony exports\n/******/ \t\t__nested_webpack_require_23461__.d = function(exports, definition) {\n/******/ \t\t\tfor(var key in definition) {\n/******/ \t\t\t\tif(__nested_webpack_require_23461__.o(definition, key) && !__nested_webpack_require_23461__.o(exports, key)) {\n/******/ \t\t\t\t\tObject.defineProperty(exports, key, { enumerable: true, get: definition[key] });\n/******/ \t\t\t\t}\n/******/ \t\t\t}\n/******/ \t\t};\n/******/ \t}();\n/******/ \t\n/******/ \t/* webpack/runtime/hasOwnProperty shorthand */\n/******/ \t!function() {\n/******/ \t\t__nested_webpack_require_23461__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }\n/******/ \t}();\n/******/ \t\n/******/ \t/* webpack/runtime/make namespace object */\n/******/ \t!function() {\n/******/ \t\t// define __esModule on exports\n/******/ \t\t__nested_webpack_require_23461__.r = function(exports) {\n/******/ \t\t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t\t}\n/******/ \t\t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t\t};\n/******/ \t}();\n/******/ \t\n/************************************************************************/\nvar __nested_webpack_exports__ = {};\n// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.\n!function() {\n/*!********************************************!*\\\n  !*** ./client-src/modules/logger/index.js ***!\n  \\********************************************/\n__nested_webpack_require_23461__.r(__nested_webpack_exports__);\n/* harmony export */ __nested_webpack_require_23461__.d(__nested_webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }\n/* harmony export */ });\n/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_23461__(/*! webpack/lib/logging/runtime.js */ \"./node_modules/webpack/lib/logging/runtime.js\");\n\n}();\nvar __webpack_export_target__ = exports;\nfor(var i in __nested_webpack_exports__) __webpack_export_target__[i] = __nested_webpack_exports__[i];\nif(__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, \"__esModule\", { value: true });\n/******/ })()\n;\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/modules/logger/index.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createOverlay: function() { return /* binding */ createOverlay; },\n/* harmony export */   formatProblem: function() { return /* binding */ formatProblem; }\n/* harmony export */ });\n/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ \"./node_modules/ansi-html-community/index.js\");\n/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-entities */ \"./node_modules/html-entities/dist/esm/index.js\");\n/* harmony import */ var _overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overlay/runtime-error.js */ \"./node_modules/webpack-dev-server/client/overlay/runtime-error.js\");\n/* harmony import */ var _overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overlay/state-machine.js */ \"./node_modules/webpack-dev-server/client/overlay/state-machine.js\");\n/* harmony import */ var _overlay_styles_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay/styles.js */ \"./node_modules/webpack-dev-server/client/overlay/styles.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return typeof key === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (typeof input !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (typeof res !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)\n// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).\n\n\n\n\n\n\nvar colors = {\n  reset: [\"transparent\", \"transparent\"],\n  black: \"181818\",\n  red: \"E36049\",\n  green: \"B3CB74\",\n  yellow: \"FFD080\",\n  blue: \"7CAFC2\",\n  magenta: \"7FACCA\",\n  cyan: \"C3C2EF\",\n  lightgrey: \"EBE7E3\",\n  darkgrey: \"6D7891\"\n};\nansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);\n\n/**\n * @param {string} type\n * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string; stack?: string[] }} item\n * @returns {{ header: string, body: string }}\n */\nfunction formatProblem(type, item) {\n  var header = type === \"warning\" ? \"WARNING\" : \"ERROR\";\n  var body = \"\";\n  if (typeof item === \"string\") {\n    body += item;\n  } else {\n    var file = item.file || \"\";\n    // eslint-disable-next-line no-nested-ternary\n    var moduleName = item.moduleName ? item.moduleName.indexOf(\"!\") !== -1 ? \"\".concat(item.moduleName.replace(/^(\\s|\\S)*!/, \"\"), \" (\").concat(item.moduleName, \")\") : \"\".concat(item.moduleName) : \"\";\n    var loc = item.loc;\n    header += \"\".concat(moduleName || file ? \" in \".concat(moduleName ? \"\".concat(moduleName).concat(file ? \" (\".concat(file, \")\") : \"\") : file).concat(loc ? \" \".concat(loc) : \"\") : \"\");\n    body += item.message || \"\";\n  }\n  if (Array.isArray(item.stack)) {\n    item.stack.forEach(function (stack) {\n      if (typeof stack === \"string\") {\n        body += \"\\r\\n\".concat(stack);\n      }\n    });\n  }\n  return {\n    header: header,\n    body: body\n  };\n}\n\n/**\n * @typedef {Object} CreateOverlayOptions\n * @property {string | null} trustedTypesPolicyName\n * @property {boolean | (error: Error) => void} [catchRuntimeError]\n */\n\n/**\n *\n * @param {CreateOverlayOptions} options\n */\nvar createOverlay = function createOverlay(options) {\n  /** @type {HTMLIFrameElement | null | undefined} */\n  var iframeContainerElement;\n  /** @type {HTMLDivElement | null | undefined} */\n  var containerElement;\n  /** @type {HTMLDivElement | null | undefined} */\n  var headerElement;\n  /** @type {Array<(element: HTMLDivElement) => void>} */\n  var onLoadQueue = [];\n  /** @type {TrustedTypePolicy | undefined} */\n  var overlayTrustedTypesPolicy;\n\n  /**\n   *\n   * @param {HTMLElement} element\n   * @param {CSSStyleDeclaration} style\n   */\n  function applyStyle(element, style) {\n    Object.keys(style).forEach(function (prop) {\n      element.style[prop] = style[prop];\n    });\n  }\n\n  /**\n   * @param {string | null} trustedTypesPolicyName\n   */\n  function createContainer(trustedTypesPolicyName) {\n    // Enable Trusted Types if they are available in the current browser.\n    if (window.trustedTypes) {\n      overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || \"webpack-dev-server#overlay\", {\n        createHTML: function createHTML(value) {\n          return value;\n        }\n      });\n    }\n    iframeContainerElement = document.createElement(\"iframe\");\n    iframeContainerElement.id = \"webpack-dev-server-client-overlay\";\n    iframeContainerElement.src = \"about:blank\";\n    applyStyle(iframeContainerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_4__.iframeStyle);\n    iframeContainerElement.onload = function () {\n      var contentElement = /** @type {Document} */\n      /** @type {HTMLIFrameElement} */\n      iframeContainerElement.contentDocument.createElement(\"div\");\n      containerElement = /** @type {Document} */\n      /** @type {HTMLIFrameElement} */\n      iframeContainerElement.contentDocument.createElement(\"div\");\n      contentElement.id = \"webpack-dev-server-client-overlay-div\";\n      applyStyle(contentElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_4__.containerStyle);\n      headerElement = document.createElement(\"div\");\n      headerElement.innerText = \"Compiled with problems:\";\n      applyStyle(headerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_4__.headerStyle);\n      var closeButtonElement = document.createElement(\"button\");\n      applyStyle(closeButtonElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_4__.dismissButtonStyle);\n      closeButtonElement.innerText = \"×\";\n      closeButtonElement.ariaLabel = \"Dismiss\";\n      closeButtonElement.addEventListener(\"click\", function () {\n        // eslint-disable-next-line no-use-before-define\n        overlayService.send({\n          type: \"DISMISS\"\n        });\n      });\n      contentElement.appendChild(headerElement);\n      contentElement.appendChild(closeButtonElement);\n      contentElement.appendChild(containerElement);\n\n      /** @type {Document} */\n      /** @type {HTMLIFrameElement} */\n      iframeContainerElement.contentDocument.body.appendChild(contentElement);\n      onLoadQueue.forEach(function (onLoad) {\n        onLoad( /** @type {HTMLDivElement} */contentElement);\n      });\n      onLoadQueue = [];\n\n      /** @type {HTMLIFrameElement} */\n      iframeContainerElement.onload = null;\n    };\n    document.body.appendChild(iframeContainerElement);\n  }\n\n  /**\n   * @param {(element: HTMLDivElement) => void} callback\n   * @param {string | null} trustedTypesPolicyName\n   */\n  function ensureOverlayExists(callback, trustedTypesPolicyName) {\n    if (containerElement) {\n      containerElement.innerHTML = \"\";\n      // Everything is ready, call the callback right away.\n      callback(containerElement);\n      return;\n    }\n    onLoadQueue.push(callback);\n    if (iframeContainerElement) {\n      return;\n    }\n    createContainer(trustedTypesPolicyName);\n  }\n\n  // Successful compilation.\n  function hide() {\n    if (!iframeContainerElement) {\n      return;\n    }\n\n    // Clean up and reset internal state.\n    document.body.removeChild(iframeContainerElement);\n    iframeContainerElement = null;\n    containerElement = null;\n  }\n\n  // Compilation with errors (e.g. syntax error or missing modules).\n  /**\n   * @param {string} type\n   * @param {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages\n   * @param {string | null} trustedTypesPolicyName\n   * @param {'build' | 'runtime'} messageSource\n   */\n  function show(type, messages, trustedTypesPolicyName, messageSource) {\n    ensureOverlayExists(function () {\n      headerElement.innerText = messageSource === \"runtime\" ? \"Uncaught runtime errors:\" : \"Compiled with problems:\";\n      messages.forEach(function (message) {\n        var entryElement = document.createElement(\"div\");\n        var msgStyle = type === \"warning\" ? _overlay_styles_js__WEBPACK_IMPORTED_MODULE_4__.msgStyles.warning : _overlay_styles_js__WEBPACK_IMPORTED_MODULE_4__.msgStyles.error;\n        applyStyle(entryElement, _objectSpread(_objectSpread({}, msgStyle), {}, {\n          padding: \"1rem 1rem 1.5rem 1rem\"\n        }));\n        var typeElement = document.createElement(\"div\");\n        var _formatProblem = formatProblem(type, message),\n          header = _formatProblem.header,\n          body = _formatProblem.body;\n        typeElement.innerText = header;\n        applyStyle(typeElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_4__.msgTypeStyle);\n        if (message.moduleIdentifier) {\n          applyStyle(typeElement, {\n            cursor: \"pointer\"\n          });\n          // element.dataset not supported in IE\n          typeElement.setAttribute(\"data-can-open\", true);\n          typeElement.addEventListener(\"click\", function () {\n            fetch(\"/webpack-dev-server/open-editor?fileName=\".concat(message.moduleIdentifier));\n          });\n        }\n\n        // Make it look similar to our terminal.\n        var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_1__.encode)(body));\n        var messageTextNode = document.createElement(\"div\");\n        applyStyle(messageTextNode, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_4__.msgTextStyle);\n        messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;\n        entryElement.appendChild(typeElement);\n        entryElement.appendChild(messageTextNode);\n\n        /** @type {HTMLDivElement} */\n        containerElement.appendChild(entryElement);\n      });\n    }, trustedTypesPolicyName);\n  }\n  var overlayService = (0,_overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n    showOverlay: function showOverlay(_ref) {\n      var _ref$level = _ref.level,\n        level = _ref$level === void 0 ? \"error\" : _ref$level,\n        messages = _ref.messages,\n        messageSource = _ref.messageSource;\n      return show(level, messages, options.trustedTypesPolicyName, messageSource);\n    },\n    hideOverlay: hide\n  });\n  if (options.catchRuntimeError) {\n    /**\n     * @param {Error | undefined} error\n     * @param {string} fallbackMessage\n     */\n    var handleError = function handleError(error, fallbackMessage) {\n      var errorObject = error instanceof Error ? error : new Error(error || fallbackMessage);\n      var shouldDisplay = typeof options.catchRuntimeError === \"function\" ? options.catchRuntimeError(errorObject) : true;\n      if (shouldDisplay) {\n        overlayService.send({\n          type: \"RUNTIME_ERROR\",\n          messages: [{\n            message: errorObject.message,\n            stack: (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_2__.parseErrorToStacks)(errorObject)\n          }]\n        });\n      }\n    };\n    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_2__.listenToRuntimeError)(function (errorEvent) {\n      // error property may be empty in older browser like IE\n      var error = errorEvent.error,\n        message = errorEvent.message;\n      if (!error && !message) {\n        return;\n      }\n      handleError(error, message);\n    });\n    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_2__.listenToUnhandledRejection)(function (promiseRejectionEvent) {\n      var reason = promiseRejectionEvent.reason;\n      handleError(reason, \"Unknown promise rejection reason\");\n    });\n  }\n  return overlayService;\n};\n\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/overlay.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/fsm.js":
/*!***************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/fsm.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return typeof key === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (typeof input !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (typeof res !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n/**\n * @typedef {Object} StateDefinitions\n * @property {{[event: string]: { target: string; actions?: Array<string> }}} [on]\n */\n\n/**\n * @typedef {Object} Options\n * @property {{[state: string]: StateDefinitions}} states\n * @property {object} context;\n * @property {string} initial\n */\n\n/**\n * @typedef {Object} Implementation\n * @property {{[actionName: string]: (ctx: object, event: any) => object}} actions\n */\n\n/**\n * A simplified `createMachine` from `@xstate/fsm` with the following differences:\n *\n *  - the returned machine is technically a \"service\". No `interpret(machine).start()` is needed.\n *  - the state definition only support `on` and target must be declared with { target: 'nextState', actions: [] } explicitly.\n *  - event passed to `send` must be an object with `type` property.\n *  - actions implementation will be [assign action](https://xstate.js.org/docs/guides/context.html#assign-action) if you return any value.\n *  Do not return anything if you just want to invoke side effect.\n *\n * The goal of this custom function is to avoid installing the entire `'xstate/fsm'` package, while enabling modeling using\n * state machine. You can copy the first parameter into the editor at https://stately.ai/viz to visualize the state machine.\n *\n * @param {Options} options\n * @param {Implementation} implementation\n */\nfunction createMachine(_ref, _ref2) {\n  var states = _ref.states,\n    context = _ref.context,\n    initial = _ref.initial;\n  var actions = _ref2.actions;\n  var currentState = initial;\n  var currentContext = context;\n  return {\n    send: function send(event) {\n      var currentStateOn = states[currentState].on;\n      var transitionConfig = currentStateOn && currentStateOn[event.type];\n      if (transitionConfig) {\n        currentState = transitionConfig.target;\n        if (transitionConfig.actions) {\n          transitionConfig.actions.forEach(function (actName) {\n            var actionImpl = actions[actName];\n            var nextContextValue = actionImpl && actionImpl(currentContext, event);\n            if (nextContextValue) {\n              currentContext = _objectSpread(_objectSpread({}, currentContext), nextContextValue);\n            }\n          });\n        }\n      }\n    }\n  };\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (createMachine);\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/overlay/fsm.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/runtime-error.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   listenToRuntimeError: function() { return /* binding */ listenToRuntimeError; },\n/* harmony export */   listenToUnhandledRejection: function() { return /* binding */ listenToUnhandledRejection; },\n/* harmony export */   parseErrorToStacks: function() { return /* binding */ parseErrorToStacks; }\n/* harmony export */ });\n/**\n *\n * @param {Error} error\n */\nfunction parseErrorToStacks(error) {\n  if (!error || !(error instanceof Error)) {\n    throw new Error(\"parseErrorToStacks expects Error object\");\n  }\n  if (typeof error.stack === \"string\") {\n    return error.stack.split(\"\\n\").filter(function (stack) {\n      return stack !== \"Error: \".concat(error.message);\n    });\n  }\n}\n\n/**\n * @callback ErrorCallback\n * @param {ErrorEvent} error\n * @returns {void}\n */\n\n/**\n * @param {ErrorCallback} callback\n */\nfunction listenToRuntimeError(callback) {\n  window.addEventListener(\"error\", callback);\n  return function cleanup() {\n    window.removeEventListener(\"error\", callback);\n  };\n}\n\n/**\n * @callback UnhandledRejectionCallback\n * @param {PromiseRejectionEvent} rejectionEvent\n * @returns {void}\n */\n\n/**\n * @param {UnhandledRejectionCallback} callback\n */\nfunction listenToUnhandledRejection(callback) {\n  window.addEventListener(\"unhandledrejection\", callback);\n  return function cleanup() {\n    window.removeEventListener(\"unhandledrejection\", callback);\n  };\n}\n\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/overlay/runtime-error.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/state-machine.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/state-machine.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fsm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fsm.js */ \"./node_modules/webpack-dev-server/client/overlay/fsm.js\");\n\n\n/**\n * @typedef {Object} ShowOverlayData\n * @property {'warning' | 'error'} level\n * @property {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages\n * @property {'build' | 'runtime'} messageSource\n */\n\n/**\n * @typedef {Object} CreateOverlayMachineOptions\n * @property {(data: ShowOverlayData) => void} showOverlay\n * @property {() => void} hideOverlay\n */\n\n/**\n * @param {CreateOverlayMachineOptions} options\n */\nvar createOverlayMachine = function createOverlayMachine(options) {\n  var hideOverlay = options.hideOverlay,\n    showOverlay = options.showOverlay;\n  var overlayMachine = (0,_fsm_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    initial: \"hidden\",\n    context: {\n      level: \"error\",\n      messages: [],\n      messageSource: \"build\"\n    },\n    states: {\n      hidden: {\n        on: {\n          BUILD_ERROR: {\n            target: \"displayBuildError\",\n            actions: [\"setMessages\", \"showOverlay\"]\n          },\n          RUNTIME_ERROR: {\n            target: \"displayRuntimeError\",\n            actions: [\"setMessages\", \"showOverlay\"]\n          }\n        }\n      },\n      displayBuildError: {\n        on: {\n          DISMISS: {\n            target: \"hidden\",\n            actions: [\"dismissMessages\", \"hideOverlay\"]\n          },\n          BUILD_ERROR: {\n            target: \"displayBuildError\",\n            actions: [\"appendMessages\", \"showOverlay\"]\n          }\n        }\n      },\n      displayRuntimeError: {\n        on: {\n          DISMISS: {\n            target: \"hidden\",\n            actions: [\"dismissMessages\", \"hideOverlay\"]\n          },\n          RUNTIME_ERROR: {\n            target: \"displayRuntimeError\",\n            actions: [\"appendMessages\", \"showOverlay\"]\n          },\n          BUILD_ERROR: {\n            target: \"displayBuildError\",\n            actions: [\"setMessages\", \"showOverlay\"]\n          }\n        }\n      }\n    }\n  }, {\n    actions: {\n      dismissMessages: function dismissMessages() {\n        return {\n          messages: [],\n          level: \"error\",\n          messageSource: \"build\"\n        };\n      },\n      appendMessages: function appendMessages(context, event) {\n        return {\n          messages: context.messages.concat(event.messages),\n          level: event.level || context.level,\n          messageSource: event.type === \"RUNTIME_ERROR\" ? \"runtime\" : \"build\"\n        };\n      },\n      setMessages: function setMessages(context, event) {\n        return {\n          messages: event.messages,\n          level: event.level || context.level,\n          messageSource: event.type === \"RUNTIME_ERROR\" ? \"runtime\" : \"build\"\n        };\n      },\n      hideOverlay: hideOverlay,\n      showOverlay: showOverlay\n    }\n  });\n  return overlayMachine;\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (createOverlayMachine);\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/overlay/state-machine.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/styles.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/styles.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   containerStyle: function() { return /* binding */ containerStyle; },\n/* harmony export */   dismissButtonStyle: function() { return /* binding */ dismissButtonStyle; },\n/* harmony export */   headerStyle: function() { return /* binding */ headerStyle; },\n/* harmony export */   iframeStyle: function() { return /* binding */ iframeStyle; },\n/* harmony export */   msgStyles: function() { return /* binding */ msgStyles; },\n/* harmony export */   msgTextStyle: function() { return /* binding */ msgTextStyle; },\n/* harmony export */   msgTypeStyle: function() { return /* binding */ msgTypeStyle; }\n/* harmony export */ });\n// styles are inspired by `react-error-overlay`\n\nvar msgStyles = {\n  error: {\n    backgroundColor: \"rgba(206, 17, 38, 0.1)\",\n    color: \"#fccfcf\"\n  },\n  warning: {\n    backgroundColor: \"rgba(251, 245, 180, 0.1)\",\n    color: \"#fbf5b4\"\n  }\n};\nvar iframeStyle = {\n  position: \"fixed\",\n  top: 0,\n  left: 0,\n  right: 0,\n  bottom: 0,\n  width: \"100vw\",\n  height: \"100vh\",\n  border: \"none\",\n  \"z-index\": 9999999999\n};\nvar containerStyle = {\n  position: \"fixed\",\n  boxSizing: \"border-box\",\n  left: 0,\n  top: 0,\n  right: 0,\n  bottom: 0,\n  width: \"100vw\",\n  height: \"100vh\",\n  fontSize: \"large\",\n  padding: \"2rem 2rem 4rem 2rem\",\n  lineHeight: \"1.2\",\n  whiteSpace: \"pre-wrap\",\n  overflow: \"auto\",\n  backgroundColor: \"rgba(0, 0, 0, 0.9)\",\n  color: \"white\"\n};\nvar headerStyle = {\n  color: \"#e83b46\",\n  fontSize: \"2em\",\n  whiteSpace: \"pre-wrap\",\n  fontFamily: \"sans-serif\",\n  margin: \"0 2rem 2rem 0\",\n  flex: \"0 0 auto\",\n  maxHeight: \"50%\",\n  overflow: \"auto\"\n};\nvar dismissButtonStyle = {\n  color: \"#ffffff\",\n  lineHeight: \"1rem\",\n  fontSize: \"1.5rem\",\n  padding: \"1rem\",\n  cursor: \"pointer\",\n  position: \"absolute\",\n  right: 0,\n  top: 0,\n  backgroundColor: \"transparent\",\n  border: \"none\"\n};\nvar msgTypeStyle = {\n  color: \"#e83b46\",\n  fontSize: \"1.2em\",\n  marginBottom: \"1rem\",\n  fontFamily: \"sans-serif\"\n};\nvar msgTextStyle = {\n  lineHeight: \"1.5\",\n  fontSize: \"1rem\",\n  fontFamily: \"Menlo, Consolas, monospace\"\n};\n\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/overlay/styles.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   client: function() { return /* binding */ client; }\n/* harmony export */ });\n/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ \"./node_modules/webpack-dev-server/client/clients/WebSocketClient.js\");\n/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ \"./node_modules/webpack-dev-server/client/utils/log.js\");\n/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ \"./node_modules/webpack-dev-server/client/clients/WebSocketClient.js\");\n/* global __webpack_dev_server_client__ */\n\n\n\n\n// this WebsocketClient is here as a default fallback, in case the client is not injected\n/* eslint-disable camelcase */\nvar Client =\n// eslint-disable-next-line no-nested-ternary\ntypeof __webpack_dev_server_client__ !== \"undefined\" ? typeof __webpack_dev_server_client__.default !== \"undefined\" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n/* eslint-enable camelcase */\n\nvar retries = 0;\nvar maxRetries = 10;\n\n// Initialized client is exported so external consumers can utilize the same instance\n// It is mutable to enforce singleton\n// eslint-disable-next-line import/no-mutable-exports\nvar client = null;\n\n/**\n * @param {string} url\n * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers\n * @param {number} [reconnect]\n */\nvar socket = function initSocket(url, handlers, reconnect) {\n  client = new Client(url);\n  client.onOpen(function () {\n    retries = 0;\n    if (typeof reconnect !== \"undefined\") {\n      maxRetries = reconnect;\n    }\n  });\n  client.onClose(function () {\n    if (retries === 0) {\n      handlers.close();\n    }\n\n    // Try to reconnect.\n    client = null;\n\n    // After 10 retries stop trying, to prevent logspam.\n    if (retries < maxRetries) {\n      // Exponentially increase timeout to reconnect.\n      // Respectfully copied from the package `got`.\n      // eslint-disable-next-line no-restricted-properties\n      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;\n      retries += 1;\n      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info(\"Trying to reconnect...\");\n      setTimeout(function () {\n        socket(url, handlers, reconnect);\n      }, retryInMs);\n    }\n  });\n  client.onMessage(\n  /**\n   * @param {any} data\n   */\n  function (data) {\n    var message = JSON.parse(data);\n    if (handlers[message.type]) {\n      handlers[message.type](message.data, message.params);\n    }\n  });\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (socket);\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/socket.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/**\n * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL\n * @returns {string}\n */\nfunction format(objURL) {\n  var protocol = objURL.protocol || \"\";\n  if (protocol && protocol.substr(-1) !== \":\") {\n    protocol += \":\";\n  }\n  var auth = objURL.auth || \"\";\n  if (auth) {\n    auth = encodeURIComponent(auth);\n    auth = auth.replace(/%3A/i, \":\");\n    auth += \"@\";\n  }\n  var host = \"\";\n  if (objURL.hostname) {\n    host = auth + (objURL.hostname.indexOf(\":\") === -1 ? objURL.hostname : \"[\".concat(objURL.hostname, \"]\"));\n    if (objURL.port) {\n      host += \":\".concat(objURL.port);\n    }\n  }\n  var pathname = objURL.pathname || \"\";\n  if (objURL.slashes) {\n    host = \"//\".concat(host || \"\");\n    if (pathname && pathname.charAt(0) !== \"/\") {\n      pathname = \"/\".concat(pathname);\n    }\n  } else if (!host) {\n    host = \"\";\n  }\n  var search = objURL.search || \"\";\n  if (search && search.charAt(0) !== \"?\") {\n    search = \"?\".concat(search);\n  }\n  var hash = objURL.hash || \"\";\n  if (hash && hash.charAt(0) !== \"#\") {\n    hash = \"#\".concat(hash);\n  }\n  pathname = pathname.replace(/[?#]/g,\n  /**\n   * @param {string} match\n   * @returns {string}\n   */\n  function (match) {\n    return encodeURIComponent(match);\n  });\n  search = search.replace(\"#\", \"%23\");\n  return \"\".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);\n}\n\n/**\n * @param {URL & { fromCurrentScript?: boolean }} parsedURL\n * @returns {string}\n */\nfunction createSocketURL(parsedURL) {\n  var hostname = parsedURL.hostname;\n\n  // Node.js module parses it as `::`\n  // `new URL(urlString, [baseURLString])` parses it as '[::]'\n  var isInAddrAny = hostname === \"0.0.0.0\" || hostname === \"::\" || hostname === \"[::]\";\n\n  // why do we need this check?\n  // hostname n/a for file protocol (example, when using electron, ionic)\n  // see: https://github.com/webpack/webpack-dev-server/pull/384\n  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf(\"http\") === 0) {\n    hostname = self.location.hostname;\n  }\n  var socketURLProtocol = parsedURL.protocol || self.location.protocol;\n\n  // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.\n  if (socketURLProtocol === \"auto:\" || hostname && isInAddrAny && self.location.protocol === \"https:\") {\n    socketURLProtocol = self.location.protocol;\n  }\n  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, \"ws\");\n  var socketURLAuth = \"\";\n\n  // `new URL(urlString, [baseURLstring])` doesn't have `auth` property\n  // Parse authentication credentials in case we need them\n  if (parsedURL.username) {\n    socketURLAuth = parsedURL.username;\n\n    // Since HTTP basic authentication does not allow empty username,\n    // we only include password if the username is not empty.\n    if (parsedURL.password) {\n      // Result: <username>:<password>\n      socketURLAuth = socketURLAuth.concat(\":\", parsedURL.password);\n    }\n  }\n\n  // In case the host is a raw IPv6 address, it can be enclosed in\n  // the brackets as the brackets are needed in the final URL string.\n  // Need to remove those as url.format blindly adds its own set of brackets\n  // if the host string contains colons. That would lead to non-working\n  // double brackets (e.g. [[::]]) host\n  //\n  // All of these web socket url params are optionally passed in through resourceQuery,\n  // so we need to fall back to the default if they are not provided\n  var socketURLHostname = (hostname || self.location.hostname || \"localhost\").replace(/^\\[(.*)\\]$/, \"$1\");\n  var socketURLPort = parsedURL.port;\n  if (!socketURLPort || socketURLPort === \"0\") {\n    socketURLPort = self.location.port;\n  }\n\n  // If path is provided it'll be passed in via the resourceQuery as a\n  // query param so it has to be parsed out of the querystring in order for the\n  // client to open the socket to the correct location.\n  var socketURLPathname = \"/ws\";\n  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {\n    socketURLPathname = parsedURL.pathname;\n  }\n  return format({\n    protocol: socketURLProtocol,\n    auth: socketURLAuth,\n    hostname: socketURLHostname,\n    port: socketURLPort,\n    pathname: socketURLPathname,\n    slashes: true\n  });\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (createSocketURL);\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/utils/createSocketURL.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/**\n * @returns {string}\n */\nfunction getCurrentScriptSource() {\n  // `document.currentScript` is the most accurate way to find the current script,\n  // but is not supported in all browsers.\n  if (document.currentScript) {\n    return document.currentScript.getAttribute(\"src\");\n  }\n\n  // Fallback to getting all scripts running in the document.\n  var scriptElements = document.scripts || [];\n  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {\n    return element.getAttribute(\"src\");\n  });\n  if (scriptElementsWithSrc.length > 0) {\n    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];\n    return currentScript.getAttribute(\"src\");\n  }\n\n  // Fail as there was no script to use.\n  throw new Error(\"[webpack-dev-server] Failed to get current script source.\");\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (getCurrentScriptSource);\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   log: function() { return /* binding */ log; },\n/* harmony export */   logEnabledFeatures: function() { return /* binding */ logEnabledFeatures; },\n/* harmony export */   setLogLevel: function() { return /* binding */ setLogLevel; }\n/* harmony export */ });\n/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ \"./node_modules/webpack-dev-server/client/modules/logger/index.js\");\n/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);\n\nvar name = \"webpack-dev-server\";\n// default level is set on the client side, so it does not need\n// to be set by the CLI or API\nvar defaultLevel = \"info\";\n\n// options new options, merge with old options\n/**\n * @param {false | true | \"none\" | \"error\" | \"warn\" | \"info\" | \"log\" | \"verbose\"} level\n * @returns {void}\n */\nfunction setLogLevel(level) {\n  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({\n    level: level\n  });\n}\nsetLogLevel(defaultLevel);\nvar log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);\nvar logEnabledFeatures = function logEnabledFeatures(features) {\n  var enabledFeatures = Object.keys(features);\n  if (!features || enabledFeatures.length === 0) {\n    return;\n  }\n  var logString = \"Server started:\";\n\n  // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.\n  for (var i = 0; i < enabledFeatures.length; i++) {\n    var key = enabledFeatures[i];\n    logString += \" \".concat(key, \" \").concat(features[key] ? \"enabled\" : \"disabled\", \",\");\n  }\n  // replace last comma with a period\n  logString = logString.slice(0, -1).concat(\".\");\n  log.info(logString);\n};\n\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/utils/log.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ \"./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js\");\n\n\n/**\n * @param {string} resourceQuery\n * @returns {{ [key: string]: string | boolean }}\n */\nfunction parseURL(resourceQuery) {\n  /** @type {{ [key: string]: string }} */\n  var options = {};\n  if (typeof resourceQuery === \"string\" && resourceQuery !== \"\") {\n    var searchParams = resourceQuery.slice(1).split(\"&\");\n    for (var i = 0; i < searchParams.length; i++) {\n      var pair = searchParams[i].split(\"=\");\n      options[pair[0]] = decodeURIComponent(pair[1]);\n    }\n  } else {\n    // Else, get the url from the <script> this file was called with.\n    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    var scriptSourceURL;\n    try {\n      // The placeholder `baseURL` with `window.location.href`,\n      // is to allow parsing of path-relative or protocol-relative URLs,\n      // and will have no effect if `scriptSource` is a fully valid URL.\n      scriptSourceURL = new URL(scriptSource, self.location.href);\n    } catch (error) {\n      // URL parsing failed, do nothing.\n      // We will still proceed to see if we can recover using `resourceQuery`\n    }\n    if (scriptSourceURL) {\n      options = scriptSourceURL;\n      options.fromCurrentScript = true;\n    }\n  }\n  return options;\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (parseURL);\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/utils/parseURL.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ \"./node_modules/webpack/hot/emitter.js\");\n/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ \"./node_modules/webpack-dev-server/client/utils/log.js\");\n\n\n\n/** @typedef {import(\"../index\").Options} Options\n/** @typedef {import(\"../index\").Status} Status\n\n/**\n * @param {Options} options\n * @param {Status} status\n */\nfunction reloadApp(_ref, status) {\n  var hot = _ref.hot,\n    liveReload = _ref.liveReload;\n  if (status.isUnloading) {\n    return;\n  }\n  var currentHash = status.currentHash,\n    previousHash = status.previousHash;\n  var isInitial = currentHash.indexOf( /** @type {string} */previousHash) >= 0;\n  if (isInitial) {\n    return;\n  }\n\n  /**\n   * @param {Window} rootWindow\n   * @param {number} intervalId\n   */\n  function applyReload(rootWindow, intervalId) {\n    clearInterval(intervalId);\n    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info(\"App updated. Reloading...\");\n    rootWindow.location.reload();\n  }\n  var search = self.location.search.toLowerCase();\n  var allowToHot = search.indexOf(\"webpack-dev-server-hot=false\") === -1;\n  var allowToLiveReload = search.indexOf(\"webpack-dev-server-live-reload=false\") === -1;\n  if (hot && allowToHot) {\n    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info(\"App hot update...\");\n    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit(\"webpackHotUpdate\", status.currentHash);\n    if (typeof self !== \"undefined\" && self.window) {\n      // broadcast update to window\n      self.postMessage(\"webpackHotUpdate\".concat(status.currentHash), \"*\");\n    }\n  }\n  // allow refreshing the page only if liveReload isn't disabled\n  else if (liveReload && allowToLiveReload) {\n    var rootWindow = self;\n\n    // use parent window for reload (in case we're in an iframe with no valid src)\n    var intervalId = self.setInterval(function () {\n      if (rootWindow.location.protocol !== \"about:\") {\n        // reload immediately if protocol is valid\n        applyReload(rootWindow, intervalId);\n      } else {\n        rootWindow = rootWindow.parent;\n        if (rootWindow.parent === rootWindow) {\n          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways\n          applyReload(rootWindow, intervalId);\n        }\n      }\n    });\n  }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (reloadApp);\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/utils/reloadApp.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* global __resourceQuery WorkerGlobalScope */\n\n// Send messages to the outside, so plugins can consume it.\n/**\n * @param {string} type\n * @param {any} [data]\n */\nfunction sendMsg(type, data) {\n  if (typeof self !== \"undefined\" && (typeof WorkerGlobalScope === \"undefined\" || !(self instanceof WorkerGlobalScope))) {\n    self.postMessage({\n      type: \"webpack\".concat(type),\n      data: data\n    }, \"*\");\n  }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (sendMsg);\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/utils/sendMessage.js?\n}");

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/stripAnsi.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\nvar ansiRegex = new RegExp([\"[\\\\u001B\\\\u009B][[\\\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]+)*|[a-zA-Z\\\\d]+(?:;[-a-zA-Z\\\\d\\\\/#&.:=?%@~_]*)*)?\\\\u0007)\", \"(?:(?:\\\\d{1,4}(?:;\\\\d{0,4})*)?[\\\\dA-PR-TZcf-nq-uy=><~]))\"].join(\"|\"), \"g\");\n\n/**\n *\n * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.\n * Adapted from code originally released by Sindre Sorhus\n * Licensed the MIT License\n *\n * @param {string} string\n * @return {string}\n */\nfunction stripAnsi(string) {\n  if (typeof string !== \"string\") {\n    throw new TypeError(\"Expected a `string`, got `\".concat(typeof string, \"`\"));\n  }\n  return string.replace(ansiRegex, \"\");\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (stripAnsi);\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack-dev-server/client/utils/stripAnsi.js?\n}");

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("{/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n/* globals __webpack_hash__ */\nif (true) {\n\t/** @type {undefined|string} */\n\tvar lastHash;\n\tvar upToDate = function upToDate() {\n\t\treturn /** @type {string} */ (lastHash).indexOf(__webpack_require__.h()) >= 0;\n\t};\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\tvar check = function check() {\n\t\tmodule.hot\n\t\t\t.check(true)\n\t\t\t.then(function (updatedModules) {\n\t\t\t\tif (!updatedModules) {\n\t\t\t\t\tlog(\n\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\"[HMR] Cannot find update. \" +\n\t\t\t\t\t\t\t(typeof window !== \"undefined\"\n\t\t\t\t\t\t\t\t? \"Need to do a full reload!\"\n\t\t\t\t\t\t\t\t: \"Please reload manually!\")\n\t\t\t\t\t);\n\t\t\t\t\tlog(\n\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\"[HMR] (Probably because of restarting the webpack-dev-server)\"\n\t\t\t\t\t);\n\t\t\t\t\tif (typeof window !== \"undefined\") {\n\t\t\t\t\t\twindow.location.reload();\n\t\t\t\t\t}\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tif (!upToDate()) {\n\t\t\t\t\tcheck();\n\t\t\t\t}\n\n\t\t\t\t__webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\n\t\t\t\tif (upToDate()) {\n\t\t\t\t\tlog(\"info\", \"[HMR] App is up to date.\");\n\t\t\t\t}\n\t\t\t})\n\t\t\t.catch(function (err) {\n\t\t\t\tvar status = module.hot.status();\n\t\t\t\tif ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n\t\t\t\t\tlog(\n\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\"[HMR] Cannot apply update. \" +\n\t\t\t\t\t\t\t(typeof window !== \"undefined\"\n\t\t\t\t\t\t\t\t? \"Need to do a full reload!\"\n\t\t\t\t\t\t\t\t: \"Please reload manually!\")\n\t\t\t\t\t);\n\t\t\t\t\tlog(\"warning\", \"[HMR] \" + log.formatError(err));\n\t\t\t\t\tif (typeof window !== \"undefined\") {\n\t\t\t\t\t\twindow.location.reload();\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\tlog(\"warning\", \"[HMR] Update failed: \" + log.formatError(err));\n\t\t\t\t}\n\t\t\t});\n\t};\n\t/** @type {EventTarget | NodeJS.EventEmitter} */\n\tvar hotEmitter = __webpack_require__(/*! ./emitter */ \"./node_modules/webpack/hot/emitter.js\");\n\t/**\n\t * @param {CustomEvent<{ currentHash: string }>} event event or hash\n\t */\n\tvar handler = function (event) {\n\t\tlastHash = typeof event === \"string\" ? event : event.detail.currentHash;\n\t\tif (!upToDate() && module.hot.status() === \"idle\") {\n\t\t\tlog(\"info\", \"[HMR] Checking for updates on the server...\");\n\t\t\tcheck();\n\t\t}\n\t};\n\n\tif (typeof EventTarget !== \"undefined\" && hotEmitter instanceof EventTarget) {\n\t\thotEmitter.addEventListener(\n\t\t\t\"webpackHotUpdate\",\n\t\t\t/** @type {EventListener} */\n\t\t\t(handler)\n\t\t);\n\t} else {\n\t\thotEmitter.on(\"webpackHotUpdate\", handler);\n\t}\n\n\tlog(\"info\", \"[HMR] Waiting for update signal from WDS...\");\n} else // removed by dead control flow\n{}\n\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack/hot/dev-server.js?\n}");

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("{var EventEmitter = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\nmodule.exports = new EventEmitter();\n\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack/hot/emitter.js?\n}");

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("{/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n/**\n * @param {(string | number)[]} updatedModules updated modules\n * @param {(string | number)[] | null} renewedModules renewed modules\n */\nmodule.exports = function (updatedModules, renewedModules) {\n\tvar unacceptedModules = updatedModules.filter(function (moduleId) {\n\t\treturn renewedModules && renewedModules.indexOf(moduleId) < 0;\n\t});\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tif (unacceptedModules.length > 0) {\n\t\tlog(\n\t\t\t\"warning\",\n\t\t\t\"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\"\n\t\t);\n\t\tunacceptedModules.forEach(function (moduleId) {\n\t\t\tlog(\"warning\", \"[HMR]  - \" + moduleId);\n\t\t});\n\t}\n\n\tif (!renewedModules || renewedModules.length === 0) {\n\t\tlog(\"info\", \"[HMR] Nothing hot updated.\");\n\t} else {\n\t\tlog(\"info\", \"[HMR] Updated modules:\");\n\t\trenewedModules.forEach(function (moduleId) {\n\t\t\tif (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n\t\t\t\tvar parts = moduleId.split(\"!\");\n\t\t\t\tlog.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t\tlog.groupEnd(\"info\");\n\t\t\t} else {\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t}\n\t\t});\n\t\tvar numberIds = renewedModules.every(function (moduleId) {\n\t\t\treturn typeof moduleId === \"number\";\n\t\t});\n\t\tif (numberIds)\n\t\t\tlog(\n\t\t\t\t\"info\",\n\t\t\t\t'[HMR] Consider using the optimization.moduleIds: \"named\" for module names.'\n\t\t\t);\n\t}\n};\n\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack/hot/log-apply-result.js?\n}");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ (function(module) {

eval("{/** @typedef {\"info\" | \"warning\" | \"error\"} LogLevel */\n\n/** @type {LogLevel} */\nvar logLevel = \"info\";\n\nfunction dummy() {}\n\n/**\n * @param {LogLevel} level log level\n * @returns {boolean} true, if should log\n */\nfunction shouldLog(level) {\n\tvar shouldLog =\n\t\t(logLevel === \"info\" && level === \"info\") ||\n\t\t([\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\") ||\n\t\t([\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\");\n\treturn shouldLog;\n}\n\n/**\n * @param {(msg?: string) => void} logFn log function\n * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient\n */\nfunction logGroup(logFn) {\n\treturn function (level, msg) {\n\t\tif (shouldLog(level)) {\n\t\t\tlogFn(msg);\n\t\t}\n\t};\n}\n\n/**\n * @param {LogLevel} level log level\n * @param {string|Error} msg message\n */\nmodule.exports = function (level, msg) {\n\tif (shouldLog(level)) {\n\t\tif (level === \"info\") {\n\t\t\tconsole.log(msg);\n\t\t} else if (level === \"warning\") {\n\t\t\tconsole.warn(msg);\n\t\t} else if (level === \"error\") {\n\t\t\tconsole.error(msg);\n\t\t}\n\t}\n};\n\n/**\n * @param {Error} err error\n * @returns {string} formatted error\n */\nmodule.exports.formatError = function (err) {\n\tvar message = err.message;\n\tvar stack = err.stack;\n\tif (!stack) {\n\t\treturn message;\n\t} else if (stack.indexOf(message) < 0) {\n\t\treturn message + \"\\n\" + stack;\n\t}\n\treturn stack;\n};\n\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n\nmodule.exports.group = logGroup(group);\n\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\n\nmodule.exports.groupEnd = logGroup(groupEnd);\n\n/**\n * @param {LogLevel} level log level\n */\nmodule.exports.setLogLevel = function (level) {\n\tlogLevel = level;\n};\n\n\n//# sourceURL=webpack://space-cat/./node_modules/webpack/hot/log.js?\n}");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GAME_OBJ: function() { return /* binding */ GAME_OBJ; },\n/* harmony export */   GRID_SIZE: function() { return /* binding */ GRID_SIZE; },\n/* harmony export */   SOUND: function() { return /* binding */ SOUND; },\n/* harmony export */   background: function() { return /* binding */ background; },\n/* harmony export */   baseHeight: function() { return /* binding */ baseHeight; },\n/* harmony export */   baseWidth: function() { return /* binding */ baseWidth; },\n/* harmony export */   canvas: function() { return /* binding */ canvas; },\n/* harmony export */   cat: function() { return /* binding */ cat; },\n/* harmony export */   ctx: function() { return /* binding */ ctx; },\n/* harmony export */   \"default\": function() { return /* binding */ resizeCanvas; },\n/* harmony export */   game_debug: function() { return /* binding */ game_debug; },\n/* harmony export */   initCanvas: function() { return /* binding */ initCanvas; },\n/* harmony export */   state: function() { return /* binding */ state; }\n/* harmony export */ });\nconst GRID_SIZE = 60;\r\n\r\nlet canvas = null;\r\nlet ctx = null;\r\nlet state = null;\r\n\r\n\r\nfunction initCanvas(canvasElement) {\r\n    canvas = canvasElement;\r\n    ctx = canvas.getContext('2d');\r\n    state = {\r\n        stage: 1,\r\n        stageDescription: '',\r\n        time: null,\r\n        fps: 0,\r\n        player: null,\r\n        walls: [],\r\n        ladders: [],\r\n        boxes: [],\r\n        buttons: [],\r\n        gates: [],\r\n        portals: [],\r\n        guns: [],\r\n        objects: [],\r\n        target: null,\r\n        keys: null,\r\n        eventKey: null,\r\n        audio: [],\r\n        inventory: null\r\n    }\r\n    return true;\r\n}\r\n\r\nconst game_debug = false;\r\nconst baseWidth = 1200;\r\nconst baseHeight = 1000;\r\n\r\nconst SOUND = Object.freeze({\r\n    BACKGROUND: 'BACKGROUND',\r\n    STEP: 'STEP',\r\n    BTN: 'BTN',\r\n    OPEN: 'OPEN',\r\n    CLOSE: 'CLOSE',\r\n    FALL: 'FALL',\r\n    NEW_OBJ: 'NEW_OBJ',\r\n    PORTAL: 'PORTAL',\r\n    NEW_LEVEL: 'NEW_LEVEL',\r\n    RELOAD_LEVEL: 'RELOAD_LEVEL',\r\n    BANG: 'BANG',\r\n    SHOT: 'SHOT',\r\n})\r\n\r\nconst GAME_OBJ = Object.freeze({\r\n    BOX: 'resource/obj/game_object/box_obj.png',\r\n    BARREL: 'resource/obj/game_object/barrel_obj.png',\r\n    LADDER: 'LADDER',\r\n    GUN: 'resource/obj/game_object/gun_obj.png',\r\n    GOLD: 'resource/obj/target1.png',\r\n})\r\n\r\nconst background = new Image();\r\nbackground.src = 'resource/cover.png'\r\n\r\nconst cat = new Image();\r\ncat.src = 'resource/player/cat-stand.png'\r\n\r\n\r\nfunction resizeCanvas() {\r\n    const container = canvas.parentElement;\r\n    const containerWidth = container.clientWidth;\r\n    const containerHeight = container.clientHeight;\r\n\r\n    const scale = Math.min(containerWidth / baseWidth, containerHeight / baseHeight);\r\n\r\n    canvas.width = baseWidth;\r\n    canvas.height = baseHeight;\r\n\r\n    canvas.style.width = `${baseWidth * scale}px`;\r\n    canvas.style.height = `${baseHeight * scale}px`;\r\n}\n\n//# sourceURL=webpack://space-cat/./src/constants.js?\n}");

/***/ }),

/***/ "./src/core/GameEngine.js":
/*!********************************!*\
  !*** ./src/core/GameEngine.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ GameEngine; }\n/* harmony export */ });\n/* harmony import */ var _Stages_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stages.js */ \"./src/core/Stages.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n/* harmony import */ var _SoundEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SoundEffect */ \"./src/core/SoundEffect.js\");\n/* harmony import */ var _effects_DrawSpeechBubble__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../effects/DrawSpeechBubble */ \"./src/effects/DrawSpeechBubble.js\");\n\r\n\r\n\r\n\r\n\r\nclass GameEngine {\r\n\r\n    stages\r\n\r\n    constructor() {\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio = this.initSound()\r\n        this.stages = new _Stages_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.handleKeyDown = this.handleKeyDown.bind(this);\r\n        this.handleKeyUp = this.handleKeyUp.bind(this);\r\n        window.addEventListener('keydown', this.handleKeyDown);\r\n        window.addEventListener('keyup', this.handleKeyUp);\r\n        this.preview(undefined,undefined);\r\n    }\r\n\r\n    initSound() {\r\n        let map = new Map()\r\n\r\n        map.set(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.BACKGROUND, new _SoundEffect__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('back_sound.mp3', 1, 0.3, 1));\r\n        map.set(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.STEP, new _SoundEffect__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('step.mp3', 1.5, 0.4, 1));\r\n        map.set(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.BTN, new _SoundEffect__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('btn.mp3', 1, 1, 5));\r\n        map.set(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.OPEN, new _SoundEffect__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('open.mp3', 3, 0.8, 5));\r\n        map.set(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.CLOSE, new _SoundEffect__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('close.mp3', 3, 0.8, 5));\r\n        map.set(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.FALL, new _SoundEffect__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('fall.mp3', 1.5, 0.6, 5));\r\n        map.set(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.NEW_OBJ, new _SoundEffect__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('new_obj.mp3', 1.5, 0.6, 5));\r\n        map.set(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.PORTAL, new _SoundEffect__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('portal.mp3', 1.5, 0.8, 5));\r\n        map.set(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.NEW_LEVEL, new _SoundEffect__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('new_level.mp3', 1, 0.4, 5));\r\n        map.set(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.RELOAD_LEVEL, new _SoundEffect__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('reload_level.mp3', 1, 1, 1));\r\n        map.set(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.BANG, new _SoundEffect__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('bang.mp3', 1, 0.8, 5));\r\n        map.set(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.SHOT, new _SoundEffect__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('fire.mp3', 1, 0.6, 5));\r\n\r\n        return map\r\n    }\r\n\r\n    preview(step,reloadText) {\r\n        // document.getElementById('loader').style.display = 'block';\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.BACKGROUND).pauseSound()\r\n        clearInterval(_constants__WEBPACK_IMPORTED_MODULE_1__.state.time)\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.clearRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_1__.canvas.width, _constants__WEBPACK_IMPORTED_MODULE_1__.canvas.height);\r\n        this.stages.loadLevel(_constants__WEBPACK_IMPORTED_MODULE_1__.state.stage)\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.clearRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_1__.canvas.width, _constants__WEBPACK_IMPORTED_MODULE_1__.canvas.height);\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillStyle = '#02850c';\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.font = '40px Calibri';\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillText(`Уровень ${_constants__WEBPACK_IMPORTED_MODULE_1__.state.stage}`, 100, 300);\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillStyle = '#caccc1';\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.font = '30px Calibri';\r\n        // ctx.fillText(`== ${state.stageDescription} ==`, 400 - (state.stageDescription.length * 3), 400);\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.font = '30px Calibri';\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillStyle = '#69d1e3';\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillText(`Для начала уровня жми 'Enter' или 'Space'`, 100, 650);\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillText(`Переключение уровней: клавиша 'Z'- назад, клавиша 'X' - вперед`, 100, 700);\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(_constants__WEBPACK_IMPORTED_MODULE_1__.cat, 350, 500, 92, 110)\r\n        if (reloadText !== undefined) {\r\n            (0,_effects_DrawSpeechBubble__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_constants__WEBPACK_IMPORTED_MODULE_1__.ctx, 150, 350, 800, 110, 250, 500, this.stages.getReloadLevelText());\r\n        } else {\r\n            (0,_effects_DrawSpeechBubble__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_constants__WEBPACK_IMPORTED_MODULE_1__.ctx, 150, 350, 800, 110, 250, 500, _constants__WEBPACK_IMPORTED_MODULE_1__.state.stageDescription);\r\n        }\r\n        if (step !== undefined) {\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillText(`Уровень ${_constants__WEBPACK_IMPORTED_MODULE_1__.state.stage - 1} пройден за ${step} шагов`, 100, 100);\r\n        }\r\n    }\r\n\r\n    initial() {\r\n        this.preview()\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.BACKGROUND).setLoop(true)\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.BACKGROUND).playSound()\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.STEP).setLoop(true)\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.time = setInterval(() => {\r\n            this.main()\r\n        }, 8)\r\n    }\r\n\r\n\r\n    main(timestamp) {\r\n        // Очистка canvas\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.clearRect(0, 0, _constants__WEBPACK_IMPORTED_MODULE_1__.canvas.width, _constants__WEBPACK_IMPORTED_MODULE_1__.canvas.height);\r\n        if (!_constants__WEBPACK_IMPORTED_MODULE_1__.game_debug) {\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(_constants__WEBPACK_IMPORTED_MODULE_1__.background, 0, 0, _constants__WEBPACK_IMPORTED_MODULE_1__.canvas.width, _constants__WEBPACK_IMPORTED_MODULE_1__.canvas.height);\r\n        }\r\n        // Расчет FPS\r\n        if (_constants__WEBPACK_IMPORTED_MODULE_1__.state.lastTime) {\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.fps = Math.round(1000 / (timestamp - _constants__WEBPACK_IMPORTED_MODULE_1__.state.lastTime));\r\n        }\r\n\r\n\r\n        //------ Основное перемещение -------------\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.gravity = !_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.collision(_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x, _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.y, [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.ladders])\r\n            && !_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.collision(_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x, _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.y + _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE, [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.walls, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.boxes, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.ladders])\r\n        if (_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.gravity) {\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetY = _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.y + _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE;\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isFalling = true;\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isMoving = true;\r\n        }\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.move()\r\n        for (const box of _constants__WEBPACK_IMPORTED_MODULE_1__.state.boxes) {\r\n            box.checkState()\r\n            box.gravity = !box.collision(box.x, box.y + _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE, [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.walls, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.boxes, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.ladders, _constants__WEBPACK_IMPORTED_MODULE_1__.state.player])\r\n            if (box.gravity) {\r\n                box.targetY = box.y + _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE;\r\n                box.isFalling = true;\r\n                box.isMoving = true;\r\n            }\r\n            box.move()\r\n        }\r\n        //------ /Кнопки - Ворота-------------\r\n        for (const button of _constants__WEBPACK_IMPORTED_MODULE_1__.state.buttons) {\r\n            button.checkState()\r\n            button.active = _constants__WEBPACK_IMPORTED_MODULE_1__.state.boxes.some(box => box.collision(box.targetX, box.targetY, [button])) ||\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.collision(_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetX, _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetY, [button])\r\n        }\r\n        for (const gate of _constants__WEBPACK_IMPORTED_MODULE_1__.state.gates) {\r\n            gate.checkState()\r\n            if (!gate.open && !_constants__WEBPACK_IMPORTED_MODULE_1__.state.walls.includes(gate)) {\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.state.walls.push(gate)\r\n            }\r\n            if (gate.open && _constants__WEBPACK_IMPORTED_MODULE_1__.state.walls.includes(gate)) {\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.state.walls = _constants__WEBPACK_IMPORTED_MODULE_1__.state.walls.filter(wall => !wall.open)\r\n            }\r\n        }\r\n        //------ /Выстрелы -------------\r\n        for (const gun of [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.guns]) {\r\n            gun.checkState()\r\n            gun.move()\r\n        }\r\n        //------ /Объекты -------------\r\n        for (const obj of [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.objects]) {\r\n            if (_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.collision(_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x, _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.y, [obj])) {\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.state.inventory.addObject(obj.imgStandSrc)\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.state.objects = _constants__WEBPACK_IMPORTED_MODULE_1__.state.objects.filter(i => i.id !== obj.id)\r\n            }\r\n        }\r\n        //------ Порталы/ -------------\r\n        for (const portal of [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.portals]) {\r\n            const outPortal = portal.getAnotherPortal();\r\n            if (!_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isMoving && portal.collision(portal.x, portal.y, [_constants__WEBPACK_IMPORTED_MODULE_1__.state.player])) {\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.PORTAL).playSound()\r\n                const dirX = _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.direction === 'ArrowLeft' ? -_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE : _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE;\r\n                if (!this.handlePlayerMove(outPortal.x, outPortal.y, outPortal.x + dirX)) {\r\n                    _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x = portal.x;\r\n                    _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetX = portal.x - dirX;\r\n                    _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.y = _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetY = portal.y;\r\n                    _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isPush = false;\r\n                    _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isMoving = true;\r\n                }\r\n            }\r\n            for (const obj of [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.boxes]) {\r\n                const dirX = obj.x - _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetX > 1 ? _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE : -_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE;\r\n                if (!obj.isMoving && portal.collision(portal.x, portal.y, [obj])) {\r\n                    _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.PORTAL).playSound()\r\n                    const objX = obj.x\r\n                    const objY = obj.y\r\n                    obj.x = outPortal.x\r\n                    obj.targetX = outPortal.x + dirX\r\n                    obj.y = obj.targetY = outPortal.y;\r\n                    if (obj.collision(obj.targetX, obj.y, [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.boxes])) {\r\n                        obj.direction = 0\r\n                        obj.x = objX\r\n                        obj.targetX = portal.x - dirX\r\n                        obj.y = obj.targetY = objY\r\n                        if (obj.collision(obj.targetX, obj.y, [_constants__WEBPACK_IMPORTED_MODULE_1__.state.player])) {\r\n                            _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetX = _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetX - dirX;\r\n                            _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isPush = false;\r\n                            _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isMoving = true;\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n            for (const obj of [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.guns]) {\r\n                const dirX = obj.x - _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetX > 1 ? _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE : -_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE;\r\n                if (portal.collision(portal.x, portal.y, [obj])) {\r\n                    _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.PORTAL).playSound()\r\n                    obj.x = outPortal.x + dirX\r\n                    obj.targetX = outPortal.x + dirX\r\n                    obj.y = obj.targetY = outPortal.y;\r\n                }\r\n            }\r\n        }\r\n\r\n        //------ Кнопки - Ворота/ -------------\r\n\r\n        // state.buttons.forEach(e => console.log(e.type + \"|\" + e.active))\r\n        // state.gates.forEach(e => console.log(e.type + \"|\" + e.open))\r\n        //-------------------\r\n\r\n        if (_constants__WEBPACK_IMPORTED_MODULE_1__.game_debug) {\r\n            for (const obj of [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.guns, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.portals, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.walls, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.ladders, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.boxes, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.buttons, _constants__WEBPACK_IMPORTED_MODULE_1__.state.target, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.objects, _constants__WEBPACK_IMPORTED_MODULE_1__.state.player]) {\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillStyle = obj.color;\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillText(`${obj.id}`, obj.x, obj.y);\r\n            }\r\n            //сетка\r\n            for (let i = 0; i < _constants__WEBPACK_IMPORTED_MODULE_1__.canvas.width; i += _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE) {\r\n                for (let j = 0; j < _constants__WEBPACK_IMPORTED_MODULE_1__.canvas.height; j += _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE) {\r\n                    _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillStyle = '#e1e1e0';\r\n                    _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.font = '12px Calibri';\r\n                    _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillText(`x:${i / _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE} y:${j / _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE}`, i + 3, j + 25);\r\n                    _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.strokeRect(i, j, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE);\r\n                }\r\n            }\r\n        } else {\r\n            const drawObj = [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.portals, _constants__WEBPACK_IMPORTED_MODULE_1__.state.target, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.walls, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.boxes, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.gates, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.buttons]\r\n                .sort((a, b) => a.targetX - b.targetX || b.targetY - a.targetY || b.zIndex - a.zIndex)\r\n            // drawObj.forEach(i=>console.log(i.x))\r\n            for (const obj of [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.ladders, ...drawObj, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.objects, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.guns]) {\r\n                obj.draw()\r\n            }\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.draw()\r\n        }\r\n\r\n        // Отрисовка информации\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillStyle = '#fff';\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.font = '20px \"Comic Sans MS\", cursive, sans-serif';\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillText(`Для начала уровня заново жми 'Enter'`, 10, _constants__WEBPACK_IMPORTED_MODULE_1__.baseHeight - 20);\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillText(`Переключение уровней 'Z'- назад, 'X' - вперед`, 10, _constants__WEBPACK_IMPORTED_MODULE_1__.baseHeight - 40);\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillText(`Отключение музыки  'M'- mute sound`, 10, _constants__WEBPACK_IMPORTED_MODULE_1__.baseHeight - 60);\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.font = '24px \"Comic Sans MS\", cursive, sans-serif';\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.fillText(`Шаги: ${Math.round(_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.steps / _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE)}`, _constants__WEBPACK_IMPORTED_MODULE_1__.baseWidth - _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE * 2, _constants__WEBPACK_IMPORTED_MODULE_1__.baseHeight - _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE / 2);\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.inventory.draw()\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.lastTime = timestamp;\r\n        //Проверка прохождения\r\n        if (_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x === _constants__WEBPACK_IMPORTED_MODULE_1__.state.target.x && _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.y === _constants__WEBPACK_IMPORTED_MODULE_1__.state.target.y) {\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.STEP).setLoop(false)\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.NEW_LEVEL).playSound()\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.stage++\r\n            this.preview(Math.round(_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.steps / _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE))\r\n        }\r\n        //Проверка ухода за границу\r\n        if (_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x > _constants__WEBPACK_IMPORTED_MODULE_1__.canvas.width || _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.y > _constants__WEBPACK_IMPORTED_MODULE_1__.canvas.height) {\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.STEP).setLoop(false)\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.RELOAD_LEVEL).playSound()\r\n            this.preview(undefined,true)\r\n        }\r\n    }\r\n\r\n\r\n    handleKeyDown(event) {\r\n        event.preventDefault();\r\n        this.handlePlayerInput(event.key);\r\n    }\r\n\r\n    handleKeyUp(event) {\r\n        event.preventDefault();\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.eventKey = 'stop'\r\n    }\r\n\r\n    handlePlayerInput = (key) => {\r\n        if (key === 'Enter' || key === ' ') {\r\n            this.initial();\r\n        }\r\n        if (key === 'z' || key === 'я') {\r\n            if (_constants__WEBPACK_IMPORTED_MODULE_1__.state.stage > 1) _constants__WEBPACK_IMPORTED_MODULE_1__.state.stage--;\r\n            this.preview();\r\n        }\r\n        if (key === 'x' || key === 'ч') {\r\n            if (_constants__WEBPACK_IMPORTED_MODULE_1__.state.stage < 12) _constants__WEBPACK_IMPORTED_MODULE_1__.state.stage++;\r\n            this.preview();\r\n        }\r\n        if (key === 'm' || key === 'ь') {\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.BACKGROUND).muteSound();\r\n        }\r\n\r\n        // Если игрок уже движется\r\n        if (_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isMoving || _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.gravity) {\r\n            return;\r\n        }\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.inventory.handleCreate(key)\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.eventKey = key;\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.keys = key;\r\n\r\n        let targetY = key === 'ArrowDown' ? _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.y + _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE : _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.y - _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE;\r\n        let targetX = key === 'ArrowRight' ? _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x + _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE : _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x - _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE;\r\n\r\n        // Логика движения по лестнице\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.onLadder = _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.collision(_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x, _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.y, [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.ladders]) ||\r\n            (key === 'ArrowDown' && _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.collision(_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x, _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.y + _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE, [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.ladders]));\r\n\r\n        if (_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.onLadder && !_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isMoving && !_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.collision(_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x, targetY, [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.walls]) && ['ArrowUp', 'ArrowDown'].includes(key)) {\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isPush = false;\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetY = targetY;\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isMoving = true;\r\n\r\n            // Логика горизонтального движения\r\n        } else if (['ArrowLeft', 'ArrowRight'].includes(key)) {\r\n            this.handlePlayerMove(_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x, _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.y, targetX)\r\n        }\r\n    };\r\n\r\n    //Проверяет перемещение игрока, устанавливает координаты в случае успеха\r\n    // return true - перемещение возможно / false - иначе\r\n    handlePlayerMove(x, y, targetX) {\r\n        console.log(\"x=\" + x + \"   targetX=\" + targetX)\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x = x\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.y = y\r\n        let isCollisionBox = false;\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.STEP).playSound();\r\n\r\n        if (!_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isMoving && !_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.collision(targetX, _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.y, [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.walls])) {\r\n            for (const box of [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.boxes]) {\r\n                if (!box.isMoving && !box.gravity && _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.collision(targetX, _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.y, [box])) {\r\n                    console.log(_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.direction)\r\n                    const dirX = _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x - targetX > 0 ? -_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE : _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE;\r\n                    const boxTargetX = box.x + dirX;\r\n                    _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isPush = true;\r\n                    isCollisionBox = true;\r\n                    if (!box.collision(boxTargetX, box.y, [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.boxes, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.walls])) {\r\n                        box.targetX = boxTargetX;\r\n                        box.direction = dirX;\r\n                        box.isMoving = true;\r\n                        _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetX = targetX;\r\n                        _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetY = y;\r\n                        _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isMoving = true;\r\n                        return true\r\n                    }\r\n                }\r\n            }\r\n            if (!isCollisionBox) {\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isPush = false;\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetX = targetX;\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetY = y;\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isMoving = true;\r\n                return true\r\n            }\r\n        }\r\n        return false\r\n    }\r\n}\n\n//# sourceURL=webpack://space-cat/./src/core/GameEngine.js?\n}");

/***/ }),

/***/ "./src/core/SoundEffect.js":
/*!*********************************!*\
  !*** ./src/core/SoundEffect.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ SoundEffect; }\n/* harmony export */ });\nclass SoundEffect {\r\n\r\n    playbackRate;\r\n    volume;\r\n    loop;\r\n    audioPool;\r\n    currentIndex;\r\n    maxOverlap;\r\n    mute;\r\n\r\n    constructor(audioSrc, playbackRate, volume, maxOverlap) {\r\n        this.playbackRate = playbackRate;\r\n        this.volume = volume;\r\n        this.loop = false;\r\n        this.mute = false;\r\n        this.audioPool = []\r\n        this.maxOverlap = maxOverlap\r\n        for (let i = 0; i < this.maxOverlap; i++) {\r\n            let audio = new Audio();\r\n            audio.src = 'resource/sound/' + audioSrc;\r\n            audio.playbackRate = playbackRate\r\n            audio.volume = volume\r\n            audio.loop = false;\r\n            this.audioPool.push(audio)\r\n        }\r\n        this.currentIndex = 0;\r\n    }\r\n\r\n    playSound() {  //воспроизвести\r\n        const audio = this.audioPool[this.currentIndex];\r\n        audio.play().catch(error => {\r\n            console.error(\"Ошибка воспроизведения:\", error);\r\n        });\r\n        this.currentIndex = (this.currentIndex + 1) % this.maxOverlap;\r\n    }\r\n\r\n    setLoop(value) { //зацикливание (true/false)\r\n        for (const audio of this.audioPool) {\r\n            audio.loop = value\r\n        }\r\n    }\r\n\r\n    pauseSound() { //пауза\r\n        for (const audio of this.audioPool) {\r\n            audio.pause()\r\n        }\r\n    }\r\n\r\n    muteSound() {\r\n        if (!this.mute) {\r\n            for (const audio of this.audioPool) {\r\n                audio.volume = 0;\r\n            }\r\n            this.mute = true;\r\n        } else {\r\n            for (const audio of this.audioPool) {\r\n                audio.volume = this.volume\r\n            }\r\n            this.mute = false;\r\n        }\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n\n\n//# sourceURL=webpack://space-cat/./src/core/SoundEffect.js?\n}");

/***/ }),

/***/ "./src/core/Stages.js":
/*!****************************!*\
  !*** ./src/core/Stages.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Stages; }\n/* harmony export */ });\n/* harmony import */ var _objects_Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/Box */ \"./src/objects/Box.js\");\n/* harmony import */ var _objects_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/Player */ \"./src/objects/Player.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n/* harmony import */ var _objects_Ground__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../objects/Ground */ \"./src/objects/Ground.js\");\n/* harmony import */ var _ui_Inventory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/Inventory */ \"./src/ui/Inventory.js\");\n/* harmony import */ var _objects_Gold__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../objects/Gold */ \"./src/objects/Gold.js\");\n/* harmony import */ var _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../objects/Ladder */ \"./src/objects/Ladder.js\");\n/* harmony import */ var _objects_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../objects/Button */ \"./src/objects/Button.js\");\n/* harmony import */ var _objects_Gate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../objects/Gate */ \"./src/objects/Gate.js\");\n/* harmony import */ var _objects_Barrel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../objects/Barrel */ \"./src/objects/Barrel.js\");\n/* harmony import */ var _objects_Item__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../objects/Item */ \"./src/objects/Item.js\");\n/* harmony import */ var _objects_Portal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../objects/Portal */ \"./src/objects/Portal.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass Stages {\r\n\r\n    stages\r\n\r\n    constructor() {\r\n        this.stages = this.initLevels()\r\n    }\r\n\r\n    loadLevel(num) {\r\n        _constants__WEBPACK_IMPORTED_MODULE_2__.state.player = null\r\n        _constants__WEBPACK_IMPORTED_MODULE_2__.state.target = null\r\n        _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes = []\r\n        _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls = []\r\n        _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders = []\r\n        _constants__WEBPACK_IMPORTED_MODULE_2__.state.buttons = []\r\n        _constants__WEBPACK_IMPORTED_MODULE_2__.state.gates = []\r\n        _constants__WEBPACK_IMPORTED_MODULE_2__.state.portals = []\r\n        _constants__WEBPACK_IMPORTED_MODULE_2__.state.guns = []\r\n        _constants__WEBPACK_IMPORTED_MODULE_2__.state.objects = []\r\n        _constants__WEBPACK_IMPORTED_MODULE_2__.state.inventory = new _ui_Inventory__WEBPACK_IMPORTED_MODULE_4__[\"default\"](0, 0, 0, 0)\r\n        this.stages.get(num)()\r\n    }\r\n\r\n    getReloadLevelText() {\r\n        const txt = [\r\n            'Повернуть бы время вспать!',\r\n            'Сдаюсь. Ты подебил!',\r\n            'Просто будь совой!',\r\n            'Русалка утопилась!',\r\n            'Ты не ты, когды ты холоден!',\r\n            'Больше знаешь, крепче мстишь!',\r\n            'Удачного дна!',\r\n        ]\r\n        return txt[Math.floor(Math.random() * txt.length)] + ' Попробую еще раз =)';\r\n    }\r\n\r\n    initLevels() {\r\n        const stages = new Map();\r\n\r\n        // Первй уровень\r\n        stages.set(1, () => {\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.stageDescription = 'Я легко втираюсь в доверие'\r\n            // walls\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](3, 8, 8, 1, 'rgba(2,138,12,1)'))\r\n            // inventory\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.inventory = new _ui_Inventory__WEBPACK_IMPORTED_MODULE_4__[\"default\"](5, 5, 5, 5)\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.player = new _objects_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](3, 7, 1, 1, 'rgba(15,75,208,1)')\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.target = new _objects_Gold__WEBPACK_IMPORTED_MODULE_5__[\"default\"](10, 7, 'rgba(105,209,227,1)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.GOLD)\r\n        });\r\n// Второй уровень\r\n        stages.set(2, () => {\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.stageDescription = 'Собака, если ее позвать, прибежит, кот — примет к сведению.'\r\n            // walls\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](1, 8, 4, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](6, 8, 5, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](13, 8, 3, 1, 'rgba(2,138,12,1)'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](4, 5, 2, 1, 'rgba(2,138,12,1)'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](5, 9, 1, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](11, 9, 2, 1, 'rgba(2,138,12,1)'))\r\n            // ladders\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](3, 5, 1, 3, 'rgba(225,225,224,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](8, 6, 1, 2, 'rgba(225,225,224,1)'))\r\n\r\n            // boxes\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5, 4, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](9, 7, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2, 7, 1, 1, 'rgba(183,113,28,1)'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.player = new _objects_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](7, 7, 1, 1, 'rgba(15,75,208,1)')\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.target = new _objects_Gold__WEBPACK_IMPORTED_MODULE_5__[\"default\"](14, 7, 'rgba(105,209,227,1)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.GOLD)\r\n        });\r\n\r\n\r\n// Третий уровень\r\n        stages.set(3, () => {\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.stageDescription = 'Жизненный опыт показывает, что провинившиеся коты хорошо\\n понимают азбуку Морзе. Только стучать надо тапком по морде.'\r\n            // walls\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](2, 8, 10, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](4, 4, 2, 1, 'rgba(2,138,12,1)'))\r\n\r\n            // ladders\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](6, 4, 1, 4, 'rgba(225,225,224,1)'))\r\n\r\n            // boxes\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](9, 7, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](10, 7, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5, 2, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5, 3, 1, 1, 'rgba(183,113,28,1)'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.player = new _objects_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](4, 7, 1, 1, 'rgba(15,75,208,1)')\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.target = new _objects_Gold__WEBPACK_IMPORTED_MODULE_5__[\"default\"](11, 7, 'rgba(105,209,227,1)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.GOLD)\r\n        });\r\n\r\n// Четвертый уровень\r\n        stages.set(4, () => {\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.stageDescription = 'А ты чего кошечку не заводишь? \\nКто тебе на старости лет стакан воды со стола опрокинет?'\r\n            // walls\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](6, 3, 5, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](2, 5, 13, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](1, 8, 7, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](9, 8, 7, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](4, 13, 9, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](2, 12, 3, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](12, 12, 3, 1, 'rgba(2,138,12,1)'))\r\n            // ladders\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](8, 8, 1, 5, 'rgba(225,225,224,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](8, 1, 1, 2, 'rgba(225,225,224,1)'))\r\n            // boxes\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2, 4, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3, 4, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](13, 4, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](14, 4, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](9, 10, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](9, 11, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](9, 12, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](7, 2, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](9, 2, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](9, 1, 1, 1, 'rgba(183,113,28,1)'))\r\n\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.player = new _objects_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](8, 2, 1, 1, 'rgba(15,75,208,1)')\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.target = new _objects_Gold__WEBPACK_IMPORTED_MODULE_5__[\"default\"](2, 11, 'rgba(105,209,227,1)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.GOLD)\r\n        });\r\n\r\n// Пятый уровень\r\n        stages.set(5, () => {\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.stageDescription = 'Кошки — одни из немногих животных, которые убивают просто\\n ради удовольствия. Моя ради удовольствия убила мою мебель.'\r\n            // walls\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](1, 8, 15, 1, 'rgba(2,138,12,1)'))\r\n            // ladders\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](6, 4, 1, 4, 'rgba(225,225,224,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](10, 4, 1, 4, 'rgba(225,225,224,1)'))\r\n            // boxes\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](9, 7, 1, 1, 'rgba(183,113,28,1)'))\r\n\r\n            // buttons\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.buttons.push(new _objects_Button__WEBPACK_IMPORTED_MODULE_7__[\"default\"](8, 7, 1, 1, 'rgba(138,22,2,0.5)', 'blue'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.gates.push(new _objects_Gate__WEBPACK_IMPORTED_MODULE_8__[\"default\"](13, 7, 1, 1, 'rgb(138,22,2)', 'blue'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.player = new _objects_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](4, 7, 1, 1, 'rgba(15,75,208,1)')\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.target = new _objects_Gold__WEBPACK_IMPORTED_MODULE_5__[\"default\"](15, 7, 'rgba(105,209,227,1)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.GOLD)\r\n        });\r\n\r\n// Шестой уровень\r\n        stages.set(6, () => {\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.stageDescription = 'Подлокотник — это место для подлого кота.'\r\n            // walls\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](1, 10, 13, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](14, 11, 1, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](15, 10, 1, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](4, 7, 6, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](3, 4, 4, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](8, 4, 5, 1, 'rgba(2,138,12,1)'))\r\n            // ladders\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](10, 7, 1, 3, 'rgba(225,225,224,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](7, 4, 1, 3, 'rgba(225,225,224,1)'))\r\n            // boxes\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3, 3, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](4, 3, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](4, 2, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](9, 1, 1, 1, 'rgba(183,113,28,1)'))\r\n\r\n\r\n            // buttons\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.buttons.push(new _objects_Button__WEBPACK_IMPORTED_MODULE_7__[\"default\"](2, 9, 1, 1, 'rgba(138,22,2,0.5)', 'blue'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.buttons.push(new _objects_Button__WEBPACK_IMPORTED_MODULE_7__[\"default\"](8, 9, 1, 1, 'rgba(138,22,2,0.5)', 'yellow'))\r\n            //gate\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.gates.push(new _objects_Gate__WEBPACK_IMPORTED_MODULE_8__[\"default\"](9, 3, 1, 1, 'rgb(138,22,2)', 'blue'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.gates.push(new _objects_Gate__WEBPACK_IMPORTED_MODULE_8__[\"default\"](13, 9, 1, 1, 'rgb(138,22,2)', 'yellow'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.player = new _objects_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](4, 9, 1, 1, 'rgba(15,75,208,1)')\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.target = new _objects_Gold__WEBPACK_IMPORTED_MODULE_5__[\"default\"](15, 9, 'rgba(105,209,227,1)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.GOLD)\r\n        });\r\n\r\n// Седьмой уровень\r\n        stages.set(7, () => {\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.stageDescription = 'Все коты умеют летать. Летают коты сверху вниз.'\r\n            // walls\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](1, 10, 6, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](9, 10, 5, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](14, 11, 1, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](15, 10, 1, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](6, 2, 3, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](7, 11, 2, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](6, 2, 3, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](9, 7, 3, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](3, 2, 2, 1, 'rgba(2,138,12,1)'))\r\n\r\n            // ladders\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](5, 2, 1, 7, 'rgba(225,225,224,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](12, 7, 1, 3, 'rgba(225,225,224,1)'))\r\n\r\n            // boxes\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](12, 9, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](9, 3, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](9, 4, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](9, 5, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](9, 6, 1, 1, 'rgba(183,113,28,1)'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Barrel__WEBPACK_IMPORTED_MODULE_9__[\"default\"](4, 1, 1, 1, 'rgba(183,113,28,1)'))\r\n            // objects\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.objects.push(new _objects_Item__WEBPACK_IMPORTED_MODULE_10__[\"default\"](15, 9, 'rgb(164,105,227)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.BOX))\r\n            // buttons\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.buttons.push(new _objects_Button__WEBPACK_IMPORTED_MODULE_7__[\"default\"](1, 9, 1, 1, 'rgba(138,22,2,0.5)', 'blue'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.buttons.push(new _objects_Button__WEBPACK_IMPORTED_MODULE_7__[\"default\"](14, 10, 1, 1, 'rgba(234,223,0,0.5)', 'yellow'))\r\n            //gate\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.gates.push(new _objects_Gate__WEBPACK_IMPORTED_MODULE_8__[\"default\"](7, 1, 1, 1, 'rgb(138,22,2)', 'blue'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.gates.push(new _objects_Gate__WEBPACK_IMPORTED_MODULE_8__[\"default\"](3, 1, 1, 1, 'rgb(132,127,26)', 'yellow'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.player = new _objects_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](9, 9, 1, 1, 'rgba(15,75,208,1)')\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.target = new _objects_Gold__WEBPACK_IMPORTED_MODULE_5__[\"default\"](8, 1, 'rgba(105,209,227,1)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.GOLD)\r\n        });\r\n\r\n// Восьмой уровень\r\n        stages.set(8, () => {\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.stageDescription = 'Однажды мне домой хомяка в клетке принесли. \\nТак у меня появился телевизор.'\r\n            // walls\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](7, 7, 6, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](1, 12, 2, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](3, 13, 1, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](4, 12, 1, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](5, 13, 1, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](6, 14, 2, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](8, 13, 2, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](10, 12, 9, 1, 'rgba(2,138,12,1)'))\r\n            // boxes\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Barrel__WEBPACK_IMPORTED_MODULE_9__[\"default\"](6, 0, 1, 1, 'rgba(183,113,28,1)'))\r\n            // objects\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.objects.push(new _objects_Item__WEBPACK_IMPORTED_MODULE_10__[\"default\"](10, 6, 'rgb(164,105,227)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.BARREL))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.objects.push(new _objects_Item__WEBPACK_IMPORTED_MODULE_10__[\"default\"](9, 6, 'rgb(164,105,227)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.BARREL))\r\n            // ladders\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](13, 7, 1, 5, 'rgba(225,225,224,1)'))\r\n            // buttons\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.buttons.push(new _objects_Button__WEBPACK_IMPORTED_MODULE_7__[\"default\"](7, 13, 1, 1, 'rgba(138,22,2,0.5)', 'blue'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.buttons.push(new _objects_Button__WEBPACK_IMPORTED_MODULE_7__[\"default\"](15, 11, 1, 1, 'rgba(138,22,2,0.5)', 'yellow'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.buttons.push(new _objects_Button__WEBPACK_IMPORTED_MODULE_7__[\"default\"](9, 12, 1, 1, 'rgba(138,22,2,0.5)', 'red'))\r\n            //gate\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.gates.push(new _objects_Gate__WEBPACK_IMPORTED_MODULE_8__[\"default\"](3, 12, 1, 1, 'rgb(138,22,2)', 'blue'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.gates.push(new _objects_Gate__WEBPACK_IMPORTED_MODULE_8__[\"default\"](10, 11, 1, 1, 'rgb(132,127,26)', 'yellow'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.gates.push(new _objects_Gate__WEBPACK_IMPORTED_MODULE_8__[\"default\"](6, 2, 1, 1, 'rgb(132,127,26)', 'red'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.player = new _objects_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](13, 11, 1, 1, 'rgba(15,75,208,1)')\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.target = new _objects_Gold__WEBPACK_IMPORTED_MODULE_5__[\"default\"](1, 11, 'rgba(105,209,227,1)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.GOLD)\r\n        });\r\n\r\n// Девятый уровень\r\n        stages.set(9, () => {\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.stageDescription = 'Кот — это такое животное, которое на простой вопрос «Куда?»,\\n автоматически меняет направление движения в пространстве.'\r\n            // walls\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](3, 8, 5, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](10, 8, 5, 1, 'rgba(2,138,12,1)'))\r\n            //portals\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.portals.push(new _objects_Portal__WEBPACK_IMPORTED_MODULE_11__[\"default\"](10, 7, 1, 1, '#69d1e3', 'blue'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.portals.push(new _objects_Portal__WEBPACK_IMPORTED_MODULE_11__[\"default\"](7, 7, 1, 1, '#69d1e3', 'blue'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.player = new _objects_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](13, 7, 1, 1, 'rgba(15,75,208,1)')\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.target = new _objects_Gold__WEBPACK_IMPORTED_MODULE_5__[\"default\"](3, 7, 'rgba(105,209,227,1)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.GOLD)\r\n        });\r\n\r\n// Десятый уровень\r\n        stages.set(10, () => {\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.stageDescription = 'Главным отличием между животными и людьми то, что животные\\n не держат дома людей. Хотя коты уверены в обратном.'\r\n            // walls\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](1, 8, 8, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](10, 8, 3, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](13, 9, 4, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](17, 8, 1, 1, 'rgba(2,138,12,1)'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](4, 5, 5, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](10, 5, 3, 1, 'rgba(2,138,12,1)'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](1, 12, 12, 1, 'rgba(2,138,12,1)'))\r\n\r\n            // boxes\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Barrel__WEBPACK_IMPORTED_MODULE_9__[\"default\"](12, 4, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Barrel__WEBPACK_IMPORTED_MODULE_9__[\"default\"](7, 7, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](8, 4, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](8, 10, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](8, 11, 1, 1, 'rgba(183,113,28,1)'))\r\n\r\n            // ladders\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](9, 4, 1, 8, 'rgba(225,225,224,1)'))\r\n            // buttons\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.buttons.push(new _objects_Button__WEBPACK_IMPORTED_MODULE_7__[\"default\"](5, 11, 1, 1, 'rgba(138,22,2,0.5)', 'red'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.buttons.push(new _objects_Button__WEBPACK_IMPORTED_MODULE_7__[\"default\"](4, 7, 1, 1, 'rgba(138,22,2,0.5)', 'red'))\r\n            //gate\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.gates.push(new _objects_Gate__WEBPACK_IMPORTED_MODULE_8__[\"default\"](2, 11, 1, 1, 'rgb(132,127,26)', 'red'))\r\n\r\n            //portals\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.portals.push(new _objects_Portal__WEBPACK_IMPORTED_MODULE_11__[\"default\"](1, 7, 1, 1, '#69d1e3', 'blue'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.portals.push(new _objects_Portal__WEBPACK_IMPORTED_MODULE_11__[\"default\"](17, 7, 1, 1, '#69d1e3', 'blue'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.portals.push(new _objects_Portal__WEBPACK_IMPORTED_MODULE_11__[\"default\"](12, 11, 1, 1, '#69d1e3', 'red'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.portals.push(new _objects_Portal__WEBPACK_IMPORTED_MODULE_11__[\"default\"](5, 4, 1, 1, '#69d1e3', 'red'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.player = new _objects_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](11, 7, 1, 1, 'rgba(15,75,208,1)')\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.target = new _objects_Gold__WEBPACK_IMPORTED_MODULE_5__[\"default\"](1, 11, 'rgba(105,209,227,1)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.GOLD)\r\n        });\r\n\r\n// Последний уровень\r\n        stages.set(11, () => {\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.stageDescription = 'Кастрированный кот Маркиз категорически \\nне согласен с утверждением:\\n «Все, что нас не убивает, делает нас сильнее»'\r\n            // objects\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.objects.push(new _objects_Item__WEBPACK_IMPORTED_MODULE_10__[\"default\"](3, 1, 'rgb(164,105,227)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.GUN))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.objects.push(new _objects_Item__WEBPACK_IMPORTED_MODULE_10__[\"default\"](4, 1, 'rgb(164,105,227)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.GUN))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.objects.push(new _objects_Item__WEBPACK_IMPORTED_MODULE_10__[\"default\"](5, 1, 'rgb(164,105,227)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.GUN))\r\n            // walls\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](2, 2, 6, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](3, 6, 8, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](2, 10, 3, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](5, 11, 2, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](7, 10, 4, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](15, 4, 3, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](13, 14, 3, 1, 'rgba(2,138,12,1)'))\r\n            //Ladder\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](8, 2, 1, 4, 'rgba(225,225,224,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](2, 6, 1, 4, 'rgba(225,225,224,1)'))\r\n            //Box\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](6, 1, 1, 1, 'rgb(136,110,0)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](7, 1, 1, 1, 'rgb(136,110,0)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](16, 2, 1, 1, 'rgb(136,110,0)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](14, 12, 1, 1, 'rgb(136,110,0)'))\r\n\r\n            // buttons\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.buttons.push(new _objects_Button__WEBPACK_IMPORTED_MODULE_7__[\"default\"](16, 3, 1, 1, 'rgba(138,22,2,0.5)', 'blue'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.buttons.push(new _objects_Button__WEBPACK_IMPORTED_MODULE_7__[\"default\"](14, 13, 1, 1, 'rgba(138,22,2,0.5)', 'red'))\r\n            //gate\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.gates.push(new _objects_Gate__WEBPACK_IMPORTED_MODULE_8__[\"default\"](5, 10, 1, 1, 'rgb(138,22,2)', 'blue'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.gates.push(new _objects_Gate__WEBPACK_IMPORTED_MODULE_8__[\"default\"](6, 10, 1, 1, 'rgb(138,22,2)', 'red'))\r\n            //portals\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.portals.push(new _objects_Portal__WEBPACK_IMPORTED_MODULE_11__[\"default\"](15, 9, 1, 1, '#69d1e3', 'blue'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.portals.push(new _objects_Portal__WEBPACK_IMPORTED_MODULE_11__[\"default\"](3, 13, 1, 1, '#69d1e3', 'blue'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.player = new _objects_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](2, 1, 1, 1, 'rgba(15,75,208,1)')\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.target = new _objects_Gold__WEBPACK_IMPORTED_MODULE_5__[\"default\"](9, 9, 'rgba(105,209,227,1)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.GOLD)\r\n        });\r\n\r\n// Последний уровень\r\n        stages.set(12, () => {\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.stageDescription = 'Продолжение следует...'\r\n            // inventory\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.inventory = new _ui_Inventory__WEBPACK_IMPORTED_MODULE_4__[\"default\"](99, 99, 0, 99)\r\n            // walls\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](1, 10, 15, 1, 'rgba(2,138,12,1)'))\r\n\r\n            //E\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Barrel__WEBPACK_IMPORTED_MODULE_9__[\"default\"](3, 5, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Barrel__WEBPACK_IMPORTED_MODULE_9__[\"default\"](3, 6, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Barrel__WEBPACK_IMPORTED_MODULE_9__[\"default\"](3, 7, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Barrel__WEBPACK_IMPORTED_MODULE_9__[\"default\"](3, 8, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Barrel__WEBPACK_IMPORTED_MODULE_9__[\"default\"](3, 9, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](4, 5, 2, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](4, 7, 2, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](4, 9, 2, 1, 'rgba(2,138,12,1)'))\r\n\r\n            //N\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](7, 5, 1, 5, 'rgba(225,225,224,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](10, 5, 1, 5, 'rgba(225,225,224,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](8, 7, 1, 2, 'rgba(225,225,224,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](9, 5, 1, 2, 'rgba(225,225,224,1)'))\r\n\r\n            //D\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](12, 5, 1, 1, 'rgb(136,110,0)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](12, 6, 1, 1, 'rgb(136,110,0)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](12, 7, 1, 1, 'rgb(136,110,0)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](12, 8, 1, 1, 'rgb(136,110,0)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](12, 9, 1, 1, 'rgb(136,110,0)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.walls.push(new _objects_Ground__WEBPACK_IMPORTED_MODULE_3__[\"default\"](13, 5, 2, 1, 'rgba(2,138,12,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](15, 6, 1, 1, 'rgba(183,113,28,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_0__[\"default\"](15, 7, 1, 1, 'rgba(183,113,28,1)'))\r\n\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](13, 9, 1, 1, 'rgba(225,225,224,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](14, 9, 1, 1, 'rgba(225,225,224,1)'))\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_6__[\"default\"](15, 8, 1, 1, 'rgba(225,225,224,1)'))\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.player = new _objects_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](9, 9, 1, 1, 'rgba(15,75,208,1)')\r\n            _constants__WEBPACK_IMPORTED_MODULE_2__.state.target = new _objects_Gold__WEBPACK_IMPORTED_MODULE_5__[\"default\"](8, 1, 'rgba(105,209,227,1)', _constants__WEBPACK_IMPORTED_MODULE_2__.GAME_OBJ.GOLD)\r\n        });\r\n        return stages\r\n    }\r\n\r\n\r\n}\n\n//# sourceURL=webpack://space-cat/./src/core/Stages.js?\n}");

/***/ }),

/***/ "./src/effects/DrawSpeechBubble.js":
/*!*****************************************!*\
  !*** ./src/effects/DrawSpeechBubble.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ drawSpeechBubble; }\n/* harmony export */ });\n\r\n\r\nfunction drawSpeechBubble(ctx, x, y, width, height, tailX, tailY, text) {\r\n    ctx.save();\r\n    ctx.beginPath();\r\n    ctx.moveTo(x + 20, y);\r\n    ctx.arcTo(x + width, y, x + width, y + height, 20);\r\n    ctx.arcTo(x + width, y + height, x, y + height, 20);\r\n    ctx.arcTo(x, y + height, x, y, 20);\r\n    ctx.arcTo(x, y, x + width, y, 20);\r\n    ctx.closePath();\r\n\r\n    ctx.fillStyle = '#fff';\r\n    ctx.strokeStyle = '#000';\r\n    ctx.lineWidth = 2;\r\n    ctx.fill();\r\n    ctx.stroke();\r\n\r\n    // хвост\r\n    ctx.beginPath();\r\n    ctx.moveTo(x + 20, y + height);\r\n    ctx.lineTo(tailX, tailY);\r\n    ctx.lineTo(x + 40, y + height);\r\n    ctx.closePath();\r\n    ctx.fillStyle = '#fff';\r\n    ctx.strokeStyle = '#000';\r\n    ctx.lineWidth = 2;\r\n    ctx.fill();\r\n    ctx.stroke();\r\n\r\n    ctx.restore();\r\n\r\n    // текст\r\n    drawText(ctx, text, x, y, width, height);\r\n}\r\n\r\n// текст внутри диалога\r\nfunction drawText(ctx, text, x, y, width, height) {\r\n    ctx.save();\r\n    ctx.font = '24px \"Comic Sans MS\", cursive, sans-serif';\r\n    ctx.fillStyle = '#000';\r\n    ctx.textAlign = 'center';\r\n    ctx.textBaseline = 'middle';\r\n\r\n    const lines = text.split('\\n');\r\n    const lineHeight = 30;\r\n    let currentY = y + (height / 2) - ((lines.length - 1) * lineHeight / 2);\r\n\r\n    for (let i = 0; i < lines.length; i++) {\r\n        ctx.fillText(lines[i], x + width / 2, currentY);\r\n        currentY += lineHeight;\r\n    }\r\n    ctx.restore();\r\n}\n\n//# sourceURL=webpack://space-cat/./src/effects/DrawSpeechBubble.js?\n}");

/***/ }),

/***/ "./src/effects/Gun.js":
/*!****************************!*\
  !*** ./src/effects/Gun.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Gun; }\n/* harmony export */ });\n/* harmony import */ var _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/MoveBlock */ \"./src/entities/MoveBlock.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\r\n\r\n\r\nclass Gun extends _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    direction;\r\n    zIndex;\r\n    imgBang;\r\n    imgBull;\r\n    tick;\r\n    bang;\r\n    coll;\r\n\r\n    constructor(x, y, width, height, color) {\r\n        super(x, y, width / 2, height / 2, color);\r\n        this.zIndex = 99\r\n        this.imgBang = new Image();\r\n        this.imgBull = new Image();\r\n        this.imgBang.src = 'resource/obj/bang.png'\r\n        this.imgBull.src = 'resource/obj/bul.png'\r\n        this.moveSpeed = 3\r\n        this.coll = false\r\n        this.direction = _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.direction === 'ArrowLeft' ? -2 : 2\r\n        this.tick = 0\r\n        this.bang = setInterval(() => {\r\n            this.tick++\r\n            if (this.tick >= 4) {\r\n                this.tick = 0\r\n            }\r\n        }, 30)\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isGun = true\r\n        setTimeout(() => {\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.isGun = false\r\n        }, 300)\r\n    }\r\n\r\n    checkState() {\r\n        this.targetX = this.x + this.direction\r\n        if (this.collision(this.x, this.y, [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.walls])) {\r\n            this.direction = 0\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.guns = _constants__WEBPACK_IMPORTED_MODULE_1__.state.guns.filter(g => g.id !== this.id)\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.NEW_OBJ).playSound();\r\n        }\r\n        for (const box of [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.boxes]) {\r\n            if (box.collision(box.x, box.y, [this])) {\r\n                this.x = box.x\r\n                this.direction = 0\r\n                if (!this.coll) {\r\n                    this.tick = 0\r\n                    _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.BANG).playSound()\r\n                }\r\n                this.coll = true\r\n                setTimeout(() => {\r\n                    _constants__WEBPACK_IMPORTED_MODULE_1__.state.guns = _constants__WEBPACK_IMPORTED_MODULE_1__.state.guns.filter(g => g.id !== this.id)\r\n                    _constants__WEBPACK_IMPORTED_MODULE_1__.state.boxes = _constants__WEBPACK_IMPORTED_MODULE_1__.state.boxes.filter(b => b.id !== box.id)\r\n                    clearInterval(this.bang)\r\n                }, 300)\r\n            }\r\n        }\r\n    }\r\n\r\n    draw() {\r\n        if (!this.coll) {\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(this.imgBull, this.x, this.y + _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE / 4, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE / 2)\r\n        } else {\r\n            let frame = this.tick % 10;\r\n            let xf = frame * 100;\r\n            const srcWidth = 100;\r\n            const srcHeight = 100;\r\n            //  масштаб по меньшей стороне\r\n            const scale = Math.min(_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE / srcWidth, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE / srcHeight);\r\n            const scaledWidth = srcWidth * scale;\r\n            const scaledHeight = srcHeight * scale;\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(\r\n                this.imgBang,        // изображение спрайт-листа\r\n                Math.floor(xf), 0, Math.floor(srcWidth), Math.floor(srcHeight + _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE),  // исходные координаты (x,y,w,h)\r\n                Math.floor(this.x), Math.floor(this.y),\r\n                Math.floor(scaledWidth * 2), Math.floor(scaledHeight * 2.5),  // конечные координаты (x,y,w,h)\r\n            );\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://space-cat/./src/effects/Gun.js?\n}");

/***/ }),

/***/ "./src/entities/Block.js":
/*!*******************************!*\
  !*** ./src/entities/Block.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Block; }\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\r\n\r\nclass Block {\r\n    id;\r\n    x;\r\n    y;\r\n    width;\r\n    height;\r\n    color;\r\n\r\n    constructor(x, y, width, height, color) {\r\n        if (this.constructor === Block) {\r\n            throw new Error(\"class Block является абстрактным классом, от его не создаются экземпляры!!!\")\r\n        }\r\n        if (this.draw === Block.prototype.draw) {\r\n            throw new Error(\"Метот draw() не переопередлен!!!\")\r\n        }\r\n        this.id = Math.round(Math.random() * Math.pow(50, 10));\r\n        this.x = x * _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE;\r\n        this.y = y * _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE;\r\n        this.width = width * _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE;\r\n        this.height = height * _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE;\r\n        this.color = color;\r\n    }\r\n\r\n    draw() {\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://space-cat/./src/entities/Block.js?\n}");

/***/ }),

/***/ "./src/entities/MoveBlock.js":
/*!***********************************!*\
  !*** ./src/entities/MoveBlock.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ MoveBlock; }\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Block */ \"./src/entities/Block.js\");\n\r\n\r\n\r\nclass MoveBlock extends _Block__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\r\n\r\n    isMoving;\r\n    targetX;\r\n    targetY;\r\n    steps;\r\n    moveSpeed;\r\n    isFalling;\r\n    direction;\r\n    onLadder;\r\n\r\n\r\n    constructor(x, y, width, height, color) {\r\n        super(x, y, width, height, color);\r\n        this.isMoving = false;\r\n        this.targetX = x * _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE;\r\n        this.targetY = y * _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE;\r\n        this.steps = 0;\r\n        this.moveSpeed = 1;\r\n        this.isFalling = false;\r\n        this.direction = 0;\r\n        this.onLadder = false;\r\n    }\r\n\r\n    collision(x, y, objs) {\r\n        for (const obj of objs) {\r\n            if (this.id === obj.id) {\r\n                continue\r\n            }\r\n            if (x < obj.targetX + obj.width &&\r\n                this.width + x > obj.targetX &&\r\n                y < obj.targetY + obj.height &&\r\n                this.height + y > obj.targetY) {\r\n                return true\r\n            }\r\n        }\r\n        return false\r\n    }\r\n\r\n    move() {\r\n        this.isMoving = true\r\n        const dx = this.x - this.targetX;\r\n        const dy = this.y - this.targetY;\r\n\r\n\r\n        if (dy === 0 && dx === 0) {\r\n            this.isMoving = false\r\n            if (this.isFalling) {\r\n               _constants__WEBPACK_IMPORTED_MODULE_0__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_0__.SOUND.FALL).playSound()\r\n            }\r\n            this.isFalling = false\r\n            return\r\n        }\r\n        this.steps += 1\r\n        const dirX = dx < 1 ? this.moveSpeed : -this.moveSpeed\r\n        const dirY = dy < 1 ? this.moveSpeed : -this.moveSpeed\r\n\r\n        this.x += dirX\r\n        this.y += dirY\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack://space-cat/./src/entities/MoveBlock.js?\n}");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_GameEngine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/GameEngine */ \"./src/core/GameEngine.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n\r\n\r\n\r\n\r\nwindow.addEventListener('DOMContentLoaded', () => {\r\n    console.log('DOM loaded');\r\n\r\n    const canvasElement = document.getElementById('stateCanvas');\r\n    if (!canvasElement) {\r\n        console.error('Canvas element not found!');\r\n        return;\r\n    }\r\n\r\n    if ((0,_constants__WEBPACK_IMPORTED_MODULE_1__.initCanvas)(canvasElement)) {\r\n        window.addEventListener('load', _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\r\n        window.addEventListener('resize', _constants__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\r\n        setTimeout(() => {\r\n            new _core_GameEngine__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\r\n        }, 500)\r\n    }\r\n\r\n});\r\n\r\n\n\n//# sourceURL=webpack://space-cat/./src/index.js?\n}");

/***/ }),

/***/ "./src/objects/Barrel.js":
/*!*******************************!*\
  !*** ./src/objects/Barrel.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Barrel; }\n/* harmony export */ });\n/* harmony import */ var _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/MoveBlock */ \"./src/entities/MoveBlock.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\r\n\r\n\r\nclass Barrel extends _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    imgStand;\r\n    imgMove;\r\n    zIndex;\r\n    tick;\r\n\r\n    constructor(x, y, width, height, color) {\r\n        super(x, y, width, height, color);\r\n        this.zIndex = 2\r\n        this.imgStand = new Image()\r\n        this.imgMove = new Image()\r\n        this.imgStand.src = 'resource/obj/barrel.png'\r\n        this.imgMove.src = 'resource/obj/barrel_move.png'\r\n        this.tick = 0\r\n        setInterval(() => {\r\n            this.tick++\r\n            if (this.tick >= 4) {\r\n                this.tick = 0\r\n            }\r\n        }, 120)\r\n    }\r\n\r\n    checkState() {\r\n        if (this.direction !== 0 && !this.isMoving && !this.collision(this.x + this.direction, this.y, [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.walls, ..._constants__WEBPACK_IMPORTED_MODULE_1__.state.boxes])) {\r\n            this.targetX = this.x + this.direction\r\n        } else if (!this.isMoving && this.direction !== 0) {\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.FALL).playSound()\r\n            this.targetX = this.x\r\n            this.direction = 0\r\n        }\r\n    }\r\n\r\n    draw() {\r\n        if (!this.isMoving) {\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(this.imgStand, this.x, this.y, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE + 35, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE + 35)\r\n        } else {\r\n            let frame = this.tick % 10;\r\n            let xf = frame * 100;\r\n            const srcWidth = 100;\r\n            const srcHeight = 100;\r\n            //  масштаб по меньшей стороне\r\n            const scale = Math.min(_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE / srcWidth, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE / srcHeight);\r\n            const scaledWidth = srcWidth * scale;\r\n            const scaledHeight = srcHeight * scale;\r\n\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(\r\n                this.imgMove,        // изображение спрайт-листа\r\n                Math.floor(xf), 0, Math.floor(srcWidth), Math.floor(srcHeight),  // исходные координаты (x,y,w,h)\r\n                Math.floor(this.x), Math.floor(this.y),\r\n                Math.floor(scaledWidth + 35), Math.floor(scaledHeight + 35),  // конечные координаты (x,y,w,h)\r\n            );\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://space-cat/./src/objects/Barrel.js?\n}");

/***/ }),

/***/ "./src/objects/Box.js":
/*!****************************!*\
  !*** ./src/objects/Box.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Box; }\n/* harmony export */ });\n/* harmony import */ var _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/MoveBlock */ \"./src/entities/MoveBlock.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\r\n\r\n\r\n\r\nclass Box extends _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    imgStand;\r\n    zIndex;\r\n\r\n    constructor(x, y, width, height, color) {\r\n        super(x, y, width, height, color);\r\n        this.zIndex = 2\r\n        this.imgStand = new Image()\r\n        this.imgStand.src = 'resource/obj/box.png'\r\n    }\r\n\r\n    draw() {\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(this.imgStand, this.x, this.y, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE + 20, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE + 20)\r\n    }\r\n\r\n    checkState() {\r\n    }\r\n}\n\n//# sourceURL=webpack://space-cat/./src/objects/Box.js?\n}");

/***/ }),

/***/ "./src/objects/Button.js":
/*!*******************************!*\
  !*** ./src/objects/Button.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Button; }\n/* harmony export */ });\n/* harmony import */ var _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/MoveBlock */ \"./src/entities/MoveBlock.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\r\n\r\n\r\nclass Button extends _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    imgStand;\r\n    imgPush;\r\n    active;\r\n    wasActive;\r\n    type;\r\n    zIndex;\r\n\r\n    constructor(x, y, width, height, color, type) {\r\n        super(x, y, width, height, color);\r\n        this.zIndex = 10\r\n        this.type = type\r\n        this.active = false\r\n        this.wasActive = false\r\n        this.imgStand = new Image()\r\n        this.imgPush = new Image()\r\n        this.imgStand.src = `resource/obj/gate/btn_${this.type}.png`\r\n        this.imgPush.src = `resource/obj/gate/btn_${this.type}_push.png`\r\n    }\r\n\r\n    checkState() {\r\n        if (this.active) {\r\n            if (!this.wasActive) {\r\n               _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.BTN).playSound()\r\n                this.wasActive = true\r\n            }\r\n        } else {\r\n            if (this.wasActive) {\r\n               _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.BTN).playSound()\r\n                this.wasActive = false\r\n            }\r\n        }\r\n    }\r\n\r\n    draw() {\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(this.active ? this.imgPush : this.imgStand, this.x, this.y + 25, this.width, this.height)\r\n    }\r\n}\n\n//# sourceURL=webpack://space-cat/./src/objects/Button.js?\n}");

/***/ }),

/***/ "./src/objects/Gate.js":
/*!*****************************!*\
  !*** ./src/objects/Gate.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Gate; }\n/* harmony export */ });\n/* harmony import */ var _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/MoveBlock */ \"./src/entities/MoveBlock.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\r\n\r\n\r\nclass Gate extends _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    imgClose;\r\n    imgOpen;\r\n    open;\r\n    wasOpen;\r\n    buttons;\r\n    zIndex;\r\n    type;\r\n\r\n    constructor(x, y, width, height, color, type) {\r\n        super(x, y, width, height, color);\r\n        this.zIndex = 10\r\n        this.type = type\r\n        this.buttons = _constants__WEBPACK_IMPORTED_MODULE_1__.state.buttons.filter(btn => btn.type === type)\r\n        this.open = this.buttons.some(btn => btn.active)\r\n        this.wasOpen = this.buttons.some(btn => btn.active)\r\n        this.imgClose = new Image()\r\n        this.imgOpen = new Image()\r\n        this.imgClose.src = `resource/obj/gate/gate_${this.type}.png`\r\n        this.imgOpen.src = `resource/obj/gate/gate_open.png`\r\n    }\r\n\r\n    checkState() {\r\n        this.open = this.buttons.some(btn => btn.active) || this.collision(this.x, this.y, [..._constants__WEBPACK_IMPORTED_MODULE_1__.state.boxes, _constants__WEBPACK_IMPORTED_MODULE_1__.state.player])\r\n        if (this.open) {\r\n            if (!this.wasOpen) {\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.OPEN).playSound()\r\n                this.wasOpen = true\r\n            }\r\n        } else {\r\n            if (this.wasOpen) {\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.CLOSE).playSound()\r\n                this.wasOpen = false\r\n            }\r\n        }\r\n    }\r\n\r\n    draw() {\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(this.open ? this.imgOpen : this.imgClose, this.x, this.y + 10, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE + 20, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE + 20)\r\n    }\r\n}\n\n//# sourceURL=webpack://space-cat/./src/objects/Gate.js?\n}");

/***/ }),

/***/ "./src/objects/Gold.js":
/*!*****************************!*\
  !*** ./src/objects/Gold.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Gold; }\n/* harmony export */ });\n/* harmony import */ var _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/MoveBlock */ \"./src/entities/MoveBlock.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\r\n\r\n\r\nclass Gold extends _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    imgStand;\r\n    imgStandSrc;\r\n    zIndex;\r\n    tick;\r\n\r\n    constructor(x, y, color, imgStandSrc) {\r\n        super(x, y, 1, 1, color);\r\n        this.zIndex = 1\r\n        this.imgStand = new Image()\r\n        this.imgStandSrc = imgStandSrc\r\n        this.imgStand.src = imgStandSrc\r\n        this.tick = 0\r\n        setInterval(() => {\r\n            this.tick++\r\n            if (this.tick >= 4) {\r\n                this.tick = 0\r\n            }\r\n        }, 120)\r\n    }\r\n\r\n    draw() {\r\n        let frame = this.tick % 10;\r\n        let xf = frame * 100;\r\n        const srcWidth = 100;\r\n        const srcHeight = 100;\r\n        //  масштаб по меньшей стороне\r\n        const size = _constants__WEBPACK_IMPORTED_MODULE_1__.GAME_OBJ.GOLD === this.imgStandSrc ? _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE : _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE * 0.8\r\n        const scale = Math.min(size / srcWidth, size / srcHeight);\r\n        const scaledWidth = srcWidth * scale;\r\n        const scaledHeight = srcHeight * scale;\r\n\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(\r\n            this.imgStand,        // изображение спрайт-листа\r\n            Math.floor(xf), 0, Math.floor(srcWidth), Math.floor(srcHeight),  // исходные координаты (x,y,w,h)\r\n            Math.floor(this.x), Math.floor(this.y),\r\n            Math.floor(scaledWidth), Math.floor(scaledHeight),  // конечные координаты (x,y,w,h)\r\n        );\r\n    }\r\n}\n\n//# sourceURL=webpack://space-cat/./src/objects/Gold.js?\n}");

/***/ }),

/***/ "./src/objects/Ground.js":
/*!*******************************!*\
  !*** ./src/objects/Ground.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Ground; }\n/* harmony export */ });\n/* harmony import */ var _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/MoveBlock */ \"./src/entities/MoveBlock.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\r\n\r\n\r\nclass Ground extends _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    imgStand;\r\n    zIndex;\r\n\r\n    constructor(x, y, width, height, color) {\r\n        super(x, y, width, height, color);\r\n        this.zIndex = 1\r\n        this.imgStand = new Image()\r\n        this.imgStand.src = `resource/obj/ground/${width}.png`\r\n    }\r\n\r\n    draw() {\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(this.imgStand, this.x, this.y, this.width + 20, this.height + 20)\r\n    }\r\n}\n\n//# sourceURL=webpack://space-cat/./src/objects/Ground.js?\n}");

/***/ }),

/***/ "./src/objects/Item.js":
/*!*****************************!*\
  !*** ./src/objects/Item.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Item; }\n/* harmony export */ });\n/* harmony import */ var _Gold__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gold */ \"./src/objects/Gold.js\");\n\r\n\r\nclass Item extends _Gold__WEBPACK_IMPORTED_MODULE_0__[\"default\"]{\r\n    constructor(x, y, color, imgStandSrc) {\r\n        super(x, y, color, imgStandSrc);\r\n    }\r\n}\n\n//# sourceURL=webpack://space-cat/./src/objects/Item.js?\n}");

/***/ }),

/***/ "./src/objects/Ladder.js":
/*!*******************************!*\
  !*** ./src/objects/Ladder.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Ladder; }\n/* harmony export */ });\n/* harmony import */ var _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/MoveBlock */ \"./src/entities/MoveBlock.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\r\n\r\n\r\nclass Ladder extends _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    imgStand;\r\n    zIndex;\r\n\r\n    constructor(x, y, width, height, color) {\r\n        super(x, y, width, height, color);\r\n        this.zIndex = 1\r\n        this.imgStand = new Image()\r\n        this.imgStand.src = `resource/obj/ladder/${height}.png`\r\n    }\r\n\r\n    draw() {\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(this.imgStand, this.x, this.y + 5, this.width, this.height)\r\n    }\r\n}\n\n//# sourceURL=webpack://space-cat/./src/objects/Ladder.js?\n}");

/***/ }),

/***/ "./src/objects/Player.js":
/*!*******************************!*\
  !*** ./src/objects/Player.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Player; }\n/* harmony export */ });\n/* harmony import */ var _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/MoveBlock */ \"./src/entities/MoveBlock.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\r\n\r\n\r\n\r\nclass Player extends _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    imgLeft;\r\n    imgRight;\r\n    imgRightPush;\r\n    imgLeftPush;\r\n    imgLeftGun;\r\n    imgRightGun;\r\n    imgStand;\r\n    imgFalling;\r\n    imgLadder;\r\n    isPush;\r\n    isGun;\r\n    tick;\r\n    zIndex;\r\n\r\n    constructor(x, y, width, height, color) {\r\n        super(x, y, width, height, color);\r\n        this.zIndex = 10\r\n        this.isPush = false\r\n        this.isGun = false\r\n        this.imgLeft = new Image()\r\n        this.imgRight = new Image()\r\n        this.imgRightPush = new Image()\r\n        this.imgLeftPush = new Image()\r\n        this.imgLeftGun = new Image()\r\n        this.imgRightGun = new Image()\r\n        this.imgStand = new Image()\r\n        this.imgFalling = new Image()\r\n        this.imgLadder = new Image()\r\n        this.imgLeft.src = 'resource/player/10-cat-left.png'\r\n        this.imgRight.src = 'resource/player/10-cat-right.png'\r\n        this.imgRightPush.src = 'resource/player/cat-right-push.png'\r\n        this.imgLeftPush.src = 'resource/player/cat-left-push.png'\r\n        this.imgLeftGun.src = 'resource/player/cat-left-gun.png'\r\n        this.imgRightGun.src = 'resource/player/cat-right-gun.png'\r\n        this.imgStand.src = 'resource/player/cat-stand.png'\r\n        this.imgFalling.src = 'resource/player/cat-fail.png'\r\n        this.imgLadder.src = 'resource/player/cat-ladder.png'\r\n        this.tick = 0\r\n        setInterval(() => {\r\n            this.tick++\r\n            if (this.tick >= 10) {\r\n                this.tick = 0\r\n            }\r\n        }, 60)\r\n    }\r\n\r\n    draw() {\r\n        const srcWidth = 85;\r\n        const srcHeight = 110;\r\n\r\n        //  масштаб по меньшей стороне\r\n        const scale = Math.min(_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE / srcWidth, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE / srcHeight);\r\n        const scaledWidth = 40 + srcWidth * scale;\r\n        const scaledHeight = 40 + srcHeight * scale;\r\n\r\n        // центрирование\r\n        const offsetX = (_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE - scaledWidth) / 3;\r\n        const offsetY = (_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE - scaledHeight) / 2;\r\n\r\n        let frame = this.tick % 10;\r\n        let xf = frame * 83;\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.state.keys = !this.isMoving && _constants__WEBPACK_IMPORTED_MODULE_1__.state.eventKey === 'stop' ? 'stop' : _constants__WEBPACK_IMPORTED_MODULE_1__.state.keys\r\n        const left = _constants__WEBPACK_IMPORTED_MODULE_1__.state.keys === 'ArrowLeft'\r\n        const right = _constants__WEBPACK_IMPORTED_MODULE_1__.state.keys === 'ArrowRight'\r\n        const up = _constants__WEBPACK_IMPORTED_MODULE_1__.state.keys === 'ArrowUp'\r\n        const down = _constants__WEBPACK_IMPORTED_MODULE_1__.state.keys === 'ArrowDown'\r\n        // определение направления движения\r\n        if (Math.abs(_constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x - _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetX) > 20) {\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.direction = _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x - _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetX > 0 ? 'ArrowLeft' : 'ArrowRight';\r\n        }\r\n        if (this.isGun) {\r\n            this.tick = 0\r\n            this.isMoving = false\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(\r\n                this.direction === 'ArrowLeft' ? this.imgLeftGun : this.imgRightGun,        // изображение спрайт-листа\r\n                Math.floor(xf), 0, Math.floor(srcWidth), Math.floor(srcHeight),  // исходные координаты (x,y,w,h)\r\n                Math.floor(this.x + offsetX), Math.floor(this.y + offsetY),\r\n                Math.floor(scaledWidth), Math.floor(scaledHeight),  // конечные координаты (x,y,w,h)\r\n            );\r\n        } else if (!this.isMoving && !left && !right && !up && !down) {\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.STEP).pauseSound()\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(this.imgStand, this.x + offsetX, this.y + offsetY, scaledWidth + 5, scaledHeight + 5)\r\n        } else {\r\n            let imgLeft\r\n            let imgRight\r\n            if (this.isFalling) {\r\n                _constants__WEBPACK_IMPORTED_MODULE_1__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_1__.SOUND.STEP).pauseSound()\r\n                imgLeft = imgRight = this.imgFalling\r\n            } else if (this.onLadder && !left && !right) {\r\n                imgLeft = imgRight = this.imgLadder\r\n            } else {\r\n                imgLeft = this.isPush ? this.imgLeftPush : this.imgLeft\r\n                imgRight = this.isPush ? this.imgRightPush : this.imgRight\r\n            }\r\n            _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(\r\n                left || _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.x - _constants__WEBPACK_IMPORTED_MODULE_1__.state.player.targetX > 0 ? imgLeft : imgRight,        // изображение спрайт-листа\r\n                Math.floor(xf), 0, Math.floor(srcWidth), Math.floor(srcHeight),  // исходные координаты (x,y,w,h)\r\n                Math.floor(this.x + offsetX), Math.floor(this.y + offsetY),\r\n                Math.floor(scaledWidth), Math.floor(scaledHeight),  // конечные координаты (x,y,w,h)\r\n            );\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://space-cat/./src/objects/Player.js?\n}");

/***/ }),

/***/ "./src/objects/Portal.js":
/*!*******************************!*\
  !*** ./src/objects/Portal.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Portal; }\n/* harmony export */ });\n/* harmony import */ var _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/MoveBlock */ \"./src/entities/MoveBlock.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\r\n\r\n\r\nclass Portal extends _entities_MoveBlock__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n    imgMove;\r\n    type;\r\n    isLock;\r\n    zIndex;\r\n    tick;\r\n\r\n    constructor(x, y, width, height, color, type) {\r\n        super(x, y, width, height, color);\r\n        this.imgMove = new Image()\r\n        // TODO нарисовать порталы\r\n        this.imgMove.src = `resource/obj/portal/blue.png`;\r\n        this.type = type\r\n        this.zIndex = -99;\r\n        this.isLock = false;\r\n        this.tick = 0;\r\n        setInterval(() => {\r\n            this.tick++\r\n            if (this.tick >= 4) {\r\n                this.tick = 0\r\n            }\r\n        }, 120)\r\n    }\r\n\r\n\r\n    draw() {\r\n        let frame = this.tick % 10;\r\n        let xf = frame * 100;\r\n        const srcWidth = 100;\r\n        const srcHeight = 100;\r\n        //  масштаб по меньшей стороне\r\n        const scale = Math.min(_constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE / srcWidth, _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE / srcHeight);\r\n        const scaledWidth = srcWidth * scale;\r\n        const scaledHeight = srcHeight * scale;\r\n\r\n        _constants__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(\r\n            this.imgMove,        // изображение спрайт-листа\r\n            Math.floor(xf), 0, Math.floor(srcWidth - _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE / 2), Math.floor(srcHeight),  // исходные координаты (x,y,w,h)\r\n            Math.floor(this.x - _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE / 1.2), Math.floor(this.y - _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE / 1.5),\r\n            Math.floor(scaledWidth + _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE), Math.floor(scaledHeight + _constants__WEBPACK_IMPORTED_MODULE_1__.GRID_SIZE),  // конечные координаты (x,y,w,h)\r\n        );\r\n    }\r\n\r\n    getAnotherPortal() {\r\n        return _constants__WEBPACK_IMPORTED_MODULE_1__.state.portals.filter(p => p.type === this.type && p.id !== this.id).pop();\r\n    }\r\n}\n\n//# sourceURL=webpack://space-cat/./src/objects/Portal.js?\n}");

/***/ }),

/***/ "./src/ui/Inventory.js":
/*!*****************************!*\
  !*** ./src/ui/Inventory.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Inventory; }\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n/* harmony import */ var _objects_Ladder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../objects/Ladder */ \"./src/objects/Ladder.js\");\n/* harmony import */ var _objects_Barrel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../objects/Barrel */ \"./src/objects/Barrel.js\");\n/* harmony import */ var _objects_Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../objects/Box */ \"./src/objects/Box.js\");\n/* harmony import */ var _effects_Gun__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../effects/Gun */ \"./src/effects/Gun.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass Inventory{\r\n    bucket;\r\n    mediatorBucket;\r\n    imgBox;\r\n    imgBarrel;\r\n    imgLadder;\r\n    imgGun;\r\n    timeDisable;\r\n\r\n    constructor(boxCount, barrelCount, ladderCount, gunCount) {\r\n        this.timeDisable = 0\r\n        this.imgBox = new Image();\r\n        this.imgBarrel = new Image();\r\n        this.imgLadder = new Image();\r\n        this.imgGun = new Image();\r\n        this.imgBox.src = 'resource/obj/box.png'\r\n        this.imgBarrel.src = 'resource/obj/barrel.png'\r\n        this.imgLadder.src = `resource/obj/ladder/1.png`\r\n        this.imgGun.src = 'resource/obj/gun.png'\r\n        this.bucket = new Map()\r\n        this.bucket.set(_constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.BOX, boxCount)\r\n        this.bucket.set(_constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.BARREL, barrelCount)\r\n        this.bucket.set(_constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.LADDER, ladderCount)\r\n        this.bucket.set(_constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.GUN, gunCount)\r\n        this.mediatorBucket = new Map();\r\n        this.mediatorBucket.set('1', _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.BOX)\r\n        this.mediatorBucket.set('2', _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.BARREL)\r\n        this.mediatorBucket.set('3', _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.LADDER)\r\n        this.mediatorBucket.set('4', _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.GUN)\r\n    }\r\n\r\n\r\n// Получение объектов из инвентаря\r\n    handleCreate(key) {\r\n        if (!_constants__WEBPACK_IMPORTED_MODULE_0__.state.player.isMoving && this.timeDisable === 0 && (key === '1' || key === '2' || key === '3' || key === '4')) {\r\n            _constants__WEBPACK_IMPORTED_MODULE_0__.state.player.isMoving = false\r\n            this.timeDisable = 1000\r\n            const obj = this.mediatorBucket.get(key)\r\n            let count = this.bucket.get(obj)\r\n            if (this.bucket.get(obj) !== 0) {\r\n                if (obj === _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.BOX) {\r\n                    _constants__WEBPACK_IMPORTED_MODULE_0__.state.boxes.push(new _objects_Box__WEBPACK_IMPORTED_MODULE_3__[\"default\"](_constants__WEBPACK_IMPORTED_MODULE_0__.state.player.x / _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.state.player.y / _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE, 1, 1, 'rgba(183,113,28,1)'))\r\n                    _constants__WEBPACK_IMPORTED_MODULE_0__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_0__.SOUND.NEW_OBJ).playSound();\r\n                } else if (obj === _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.BARREL) {\r\n                    _constants__WEBPACK_IMPORTED_MODULE_0__.state.boxes.push(new _objects_Barrel__WEBPACK_IMPORTED_MODULE_2__[\"default\"](_constants__WEBPACK_IMPORTED_MODULE_0__.state.player.x / _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.state.player.y / _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE, 1, 1, 'rgba(183,113,28,1)'))\r\n                    _constants__WEBPACK_IMPORTED_MODULE_0__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_0__.SOUND.NEW_OBJ).playSound();\r\n                } else if (obj === _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.LADDER) {\r\n                    _constants__WEBPACK_IMPORTED_MODULE_0__.state.ladders.push(new _objects_Ladder__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_constants__WEBPACK_IMPORTED_MODULE_0__.state.player.x / _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.state.player.y / _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE, 1, 1, 'rgba(183,113,28,1)'))\r\n                    _constants__WEBPACK_IMPORTED_MODULE_0__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_0__.SOUND.NEW_OBJ).playSound();\r\n                } else if (obj === _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.GUN) {\r\n                    _constants__WEBPACK_IMPORTED_MODULE_0__.state.guns.push(new _effects_Gun__WEBPACK_IMPORTED_MODULE_4__[\"default\"](_constants__WEBPACK_IMPORTED_MODULE_0__.state.player.x / _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE, _constants__WEBPACK_IMPORTED_MODULE_0__.state.player.y / _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE, 1, 1, 'rgb(72,183,28)'))\r\n                    _constants__WEBPACK_IMPORTED_MODULE_0__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_0__.SOUND.SHOT).playSound();\r\n                }\r\n                this.bucket.set(obj, --count)\r\n            }\r\n            setTimeout(() => {\r\n                this.timeDisable = 0\r\n                _constants__WEBPACK_IMPORTED_MODULE_0__.state.player.isMoving = true;\r\n            }, this.timeDisable)\r\n        }\r\n    }\r\n    // Добавление объектов в инвентарь\r\n    addObject(obj) {\r\n        let count = this.bucket.get(obj)\r\n        this.bucket.set(obj, ++count)\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.state.audio.get(_constants__WEBPACK_IMPORTED_MODULE_0__.SOUND.NEW_OBJ).playSound();\r\n    }\r\n\r\n    draw() {\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = '#2f3136';\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.fillRect(_constants__WEBPACK_IMPORTED_MODULE_0__.baseWidth - (_constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 4) - 20, 0, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 5, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 1.5);\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = '#fff';\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.font = '20px \"Comic Sans MS\", cursive, sans-serif';\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText(`Кл '4`, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 19, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 0.3);\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText(`${this.bucket.get(_constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.GUN)}`, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 19 + 14, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 1.4);\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.drawImage(this.imgGun, _constants__WEBPACK_IMPORTED_MODULE_0__.baseWidth - _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE, 30, 40, 40)\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText(`Кл '3'`, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 18, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 0.3);\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText(`${this.bucket.get(_constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.LADDER)}`, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 18 + 14, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 1.4);\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.drawImage(this.imgLadder, _constants__WEBPACK_IMPORTED_MODULE_0__.baseWidth - _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 2, 30, 40, 40)\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText(`Кл '2'`, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 17, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 0.3);\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText(`${this.bucket.get(_constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.BARREL)}`, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 17 + 14, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 1.4);\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.drawImage(this.imgBarrel, _constants__WEBPACK_IMPORTED_MODULE_0__.baseWidth - _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 3, 30, 40, 40)\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText(`Кл '1'`, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 16, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 0.3);\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText(`${this.bucket.get(_constants__WEBPACK_IMPORTED_MODULE_0__.GAME_OBJ.BOX)}`, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 16 + 14, _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 1.4);\r\n        _constants__WEBPACK_IMPORTED_MODULE_0__.ctx.drawImage(this.imgBox, _constants__WEBPACK_IMPORTED_MODULE_0__.baseWidth - _constants__WEBPACK_IMPORTED_MODULE_0__.GRID_SIZE * 4, 30, 40, 40)\r\n    }\r\n}\n\n//# sourceURL=webpack://space-cat/./src/ui/Inventory.js?\n}");

/***/ }),

/***/ "./node_modules/html-entities/dist/esm/index.js":
/*!******************************************************!*\
  !*** ./node_modules/html-entities/dist/esm/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   decode: function() { return /* binding */ decode; },\n/* harmony export */   decodeEntity: function() { return /* binding */ decodeEntity; },\n/* harmony export */   encode: function() { return /* binding */ encode; }\n/* harmony export */ });\n/* harmony import */ var _named_references_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./named-references.js */ \"./node_modules/html-entities/dist/esm/named-references.js\");\n/* harmony import */ var _numeric_unicode_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./numeric-unicode-map.js */ \"./node_modules/html-entities/dist/esm/numeric-unicode-map.js\");\n/* harmony import */ var _surrogate_pairs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./surrogate-pairs.js */ \"./node_modules/html-entities/dist/esm/surrogate-pairs.js\");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\n\n\nvar allNamedReferences = __assign(__assign({}, _named_references_js__WEBPACK_IMPORTED_MODULE_0__.namedReferences), { all: _named_references_js__WEBPACK_IMPORTED_MODULE_0__.namedReferences.html5 });\nvar encodeRegExps = {\n    specialChars: /[<>'\"&]/g,\n    nonAscii: /[<>'\"&\\u0080-\\uD7FF\\uE000-\\uFFFF\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]?/g,\n    nonAsciiPrintable: /[<>'\"&\\x01-\\x08\\x11-\\x15\\x17-\\x1F\\x7f-\\uD7FF\\uE000-\\uFFFF\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]?/g,\n    nonAsciiPrintableOnly: /[\\x01-\\x08\\x11-\\x15\\x17-\\x1F\\x7f-\\uD7FF\\uE000-\\uFFFF\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]?/g,\n    extensive: /[\\x01-\\x0c\\x0e-\\x1f\\x21-\\x2c\\x2e-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\x7d\\x7f-\\uD7FF\\uE000-\\uFFFF\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]?/g\n};\nvar defaultEncodeOptions = {\n    mode: 'specialChars',\n    level: 'all',\n    numeric: 'decimal'\n};\n/** Encodes all the necessary (specified by `level`) characters in the text */\nfunction encode(text, _a) {\n    var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;\n    if (!text) {\n        return '';\n    }\n    var encodeRegExp = encodeRegExps[mode];\n    var references = allNamedReferences[level].characters;\n    var isHex = numeric === 'hexadecimal';\n    return String.prototype.replace.call(text, encodeRegExp, function (input) {\n        var result = references[input];\n        if (!result) {\n            var code = input.length > 1 ? (0,_surrogate_pairs_js__WEBPACK_IMPORTED_MODULE_2__.getCodePoint)(input, 0) : input.charCodeAt(0);\n            result = (isHex ? '&#x' + code.toString(16) : '&#' + code) + ';';\n        }\n        return result;\n    });\n}\nvar defaultDecodeOptions = {\n    scope: 'body',\n    level: 'all'\n};\nvar strict = /&(?:#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);/g;\nvar attribute = /&(?:#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;\nvar baseDecodeRegExps = {\n    xml: {\n        strict: strict,\n        attribute: attribute,\n        body: _named_references_js__WEBPACK_IMPORTED_MODULE_0__.bodyRegExps.xml\n    },\n    html4: {\n        strict: strict,\n        attribute: attribute,\n        body: _named_references_js__WEBPACK_IMPORTED_MODULE_0__.bodyRegExps.html4\n    },\n    html5: {\n        strict: strict,\n        attribute: attribute,\n        body: _named_references_js__WEBPACK_IMPORTED_MODULE_0__.bodyRegExps.html5\n    }\n};\nvar decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });\nvar fromCharCode = String.fromCharCode;\nvar outOfBoundsChar = fromCharCode(65533);\nvar defaultDecodeEntityOptions = {\n    level: 'all'\n};\nfunction getDecodedEntity(entity, references, isAttribute, isStrict) {\n    var decodeResult = entity;\n    var decodeEntityLastChar = entity[entity.length - 1];\n    if (isAttribute && decodeEntityLastChar === '=') {\n        decodeResult = entity;\n    }\n    else if (isStrict && decodeEntityLastChar !== ';') {\n        decodeResult = entity;\n    }\n    else {\n        var decodeResultByReference = references[entity];\n        if (decodeResultByReference) {\n            decodeResult = decodeResultByReference;\n        }\n        else if (entity[0] === '&' && entity[1] === '#') {\n            var decodeSecondChar = entity[2];\n            var decodeCode = decodeSecondChar == 'x' || decodeSecondChar == 'X'\n                ? parseInt(entity.substr(3), 16)\n                : parseInt(entity.substr(2));\n            decodeResult =\n                decodeCode >= 0x10ffff\n                    ? outOfBoundsChar\n                    : decodeCode > 65535\n                        ? (0,_surrogate_pairs_js__WEBPACK_IMPORTED_MODULE_2__.fromCodePoint)(decodeCode)\n                        : fromCharCode(_numeric_unicode_map_js__WEBPACK_IMPORTED_MODULE_1__.numericUnicodeMap[decodeCode] || decodeCode);\n        }\n    }\n    return decodeResult;\n}\n/** Decodes a single entity */\nfunction decodeEntity(entity, _a) {\n    var _b = _a === void 0 ? defaultDecodeEntityOptions : _a, _c = _b.level, level = _c === void 0 ? 'all' : _c;\n    if (!entity) {\n        return '';\n    }\n    return getDecodedEntity(entity, allNamedReferences[level].entities, false, false);\n}\n/** Decodes all entities in the text */\nfunction decode(text, _a) {\n    var _b = _a === void 0 ? defaultDecodeOptions : _a, _c = _b.level, level = _c === void 0 ? 'all' : _c, _d = _b.scope, scope = _d === void 0 ? level === 'xml' ? 'strict' : 'body' : _d;\n    if (!text) {\n        return '';\n    }\n    var decodeRegExp = decodeRegExps[level][scope];\n    var references = allNamedReferences[level].entities;\n    var isAttribute = scope === 'attribute';\n    var isStrict = scope === 'strict';\n    return text.replace(decodeRegExp, function (entity) { return getDecodedEntity(entity, references, isAttribute, isStrict); });\n}\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://space-cat/./node_modules/html-entities/dist/esm/index.js?\n}");

/***/ }),

/***/ "./node_modules/html-entities/dist/esm/named-references.js":
/*!*****************************************************************!*\
  !*** ./node_modules/html-entities/dist/esm/named-references.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   bodyRegExps: function() { return /* binding */ bodyRegExps; },\n/* harmony export */   namedReferences: function() { return /* binding */ namedReferences; }\n/* harmony export */ });\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n// This file is autogenerated by tools/process-named-references.ts\nvar pairDivider = \"~\";\nvar blockDivider = \"~~\";\nfunction generateNamedReferences(input, prev) {\n    var entities = {};\n    var characters = {};\n    var blocks = input.split(blockDivider);\n    var isOptionalBlock = false;\n    for (var i = 0; blocks.length > i; i++) {\n        var entries = blocks[i].split(pairDivider);\n        for (var j = 0; j < entries.length; j += 2) {\n            var entity = entries[j];\n            var character = entries[j + 1];\n            var fullEntity = '&' + entity + ';';\n            entities[fullEntity] = character;\n            if (isOptionalBlock) {\n                entities['&' + entity] = character;\n            }\n            characters[character] = fullEntity;\n        }\n        isOptionalBlock = true;\n    }\n    return prev ?\n        { entities: __assign(__assign({}, entities), prev.entities), characters: __assign(__assign({}, characters), prev.characters) } :\n        { entities: entities, characters: characters };\n}\nvar bodyRegExps = {\n    xml: /&(?:#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);?/g,\n    html4: /&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);?/g,\n    html5: /&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\\d+|#[xX][\\da-fA-F]+|[0-9a-zA-Z]+);?/g\n};\nvar namedReferences = {};\nnamedReferences['xml'] = generateNamedReferences(\"lt~<~gt~>~quot~\\\"~apos~'~amp~&\");\nnamedReferences['html4'] = generateNamedReferences(\"apos~'~OElig~Œ~oelig~œ~Scaron~Š~scaron~š~Yuml~Ÿ~circ~ˆ~tilde~˜~ensp~ ~emsp~ ~thinsp~ ~zwnj~‌~zwj~‍~lrm~‎~rlm~‏~ndash~–~mdash~—~lsquo~‘~rsquo~’~sbquo~‚~ldquo~“~rdquo~”~bdquo~„~dagger~†~Dagger~‡~permil~‰~lsaquo~‹~rsaquo~›~euro~€~fnof~ƒ~Alpha~Α~Beta~Β~Gamma~Γ~Delta~Δ~Epsilon~Ε~Zeta~Ζ~Eta~Η~Theta~Θ~Iota~Ι~Kappa~Κ~Lambda~Λ~Mu~Μ~Nu~Ν~Xi~Ξ~Omicron~Ο~Pi~Π~Rho~Ρ~Sigma~Σ~Tau~Τ~Upsilon~Υ~Phi~Φ~Chi~Χ~Psi~Ψ~Omega~Ω~alpha~α~beta~β~gamma~γ~delta~δ~epsilon~ε~zeta~ζ~eta~η~theta~θ~iota~ι~kappa~κ~lambda~λ~mu~μ~nu~ν~xi~ξ~omicron~ο~pi~π~rho~ρ~sigmaf~ς~sigma~σ~tau~τ~upsilon~υ~phi~φ~chi~χ~psi~ψ~omega~ω~thetasym~ϑ~upsih~ϒ~piv~ϖ~bull~•~hellip~…~prime~′~Prime~″~oline~‾~frasl~⁄~weierp~℘~image~ℑ~real~ℜ~trade~™~alefsym~ℵ~larr~←~uarr~↑~rarr~→~darr~↓~harr~↔~crarr~↵~lArr~⇐~uArr~⇑~rArr~⇒~dArr~⇓~hArr~⇔~forall~∀~part~∂~exist~∃~empty~∅~nabla~∇~isin~∈~notin~∉~ni~∋~prod~∏~sum~∑~minus~−~lowast~∗~radic~√~prop~∝~infin~∞~ang~∠~and~∧~or~∨~cap~∩~cup~∪~int~∫~there4~∴~sim~∼~cong~≅~asymp~≈~ne~≠~equiv~≡~le~≤~ge~≥~sub~⊂~sup~⊃~nsub~⊄~sube~⊆~supe~⊇~oplus~⊕~otimes~⊗~perp~⊥~sdot~⋅~lceil~⌈~rceil~⌉~lfloor~⌊~rfloor~⌋~lang~〈~rang~〉~loz~◊~spades~♠~clubs~♣~hearts~♥~diams~♦~~nbsp~ ~iexcl~¡~cent~¢~pound~£~curren~¤~yen~¥~brvbar~¦~sect~§~uml~¨~copy~©~ordf~ª~laquo~«~not~¬~shy~­~reg~®~macr~¯~deg~°~plusmn~±~sup2~²~sup3~³~acute~´~micro~µ~para~¶~middot~·~cedil~¸~sup1~¹~ordm~º~raquo~»~frac14~¼~frac12~½~frac34~¾~iquest~¿~Agrave~À~Aacute~Á~Acirc~Â~Atilde~Ã~Auml~Ä~Aring~Å~AElig~Æ~Ccedil~Ç~Egrave~È~Eacute~É~Ecirc~Ê~Euml~Ë~Igrave~Ì~Iacute~Í~Icirc~Î~Iuml~Ï~ETH~Ð~Ntilde~Ñ~Ograve~Ò~Oacute~Ó~Ocirc~Ô~Otilde~Õ~Ouml~Ö~times~×~Oslash~Ø~Ugrave~Ù~Uacute~Ú~Ucirc~Û~Uuml~Ü~Yacute~Ý~THORN~Þ~szlig~ß~agrave~à~aacute~á~acirc~â~atilde~ã~auml~ä~aring~å~aelig~æ~ccedil~ç~egrave~è~eacute~é~ecirc~ê~euml~ë~igrave~ì~iacute~í~icirc~î~iuml~ï~eth~ð~ntilde~ñ~ograve~ò~oacute~ó~ocirc~ô~otilde~õ~ouml~ö~divide~÷~oslash~ø~ugrave~ù~uacute~ú~ucirc~û~uuml~ü~yacute~ý~thorn~þ~yuml~ÿ~quot~\\\"~amp~&~lt~<~gt~>\");\nnamedReferences['html5'] = generateNamedReferences(\"Abreve~Ă~Acy~А~Afr~𝔄~Amacr~Ā~And~⩓~Aogon~Ą~Aopf~𝔸~ApplyFunction~⁡~Ascr~𝒜~Assign~≔~Backslash~∖~Barv~⫧~Barwed~⌆~Bcy~Б~Because~∵~Bernoullis~ℬ~Bfr~𝔅~Bopf~𝔹~Breve~˘~Bscr~ℬ~Bumpeq~≎~CHcy~Ч~Cacute~Ć~Cap~⋒~CapitalDifferentialD~ⅅ~Cayleys~ℭ~Ccaron~Č~Ccirc~Ĉ~Cconint~∰~Cdot~Ċ~Cedilla~¸~CenterDot~·~Cfr~ℭ~CircleDot~⊙~CircleMinus~⊖~CirclePlus~⊕~CircleTimes~⊗~ClockwiseContourIntegral~∲~CloseCurlyDoubleQuote~”~CloseCurlyQuote~’~Colon~∷~Colone~⩴~Congruent~≡~Conint~∯~ContourIntegral~∮~Copf~ℂ~Coproduct~∐~CounterClockwiseContourIntegral~∳~Cross~⨯~Cscr~𝒞~Cup~⋓~CupCap~≍~DD~ⅅ~DDotrahd~⤑~DJcy~Ђ~DScy~Ѕ~DZcy~Џ~Darr~↡~Dashv~⫤~Dcaron~Ď~Dcy~Д~Del~∇~Dfr~𝔇~DiacriticalAcute~´~DiacriticalDot~˙~DiacriticalDoubleAcute~˝~DiacriticalGrave~`~DiacriticalTilde~˜~Diamond~⋄~DifferentialD~ⅆ~Dopf~𝔻~Dot~¨~DotDot~⃜~DotEqual~≐~DoubleContourIntegral~∯~DoubleDot~¨~DoubleDownArrow~⇓~DoubleLeftArrow~⇐~DoubleLeftRightArrow~⇔~DoubleLeftTee~⫤~DoubleLongLeftArrow~⟸~DoubleLongLeftRightArrow~⟺~DoubleLongRightArrow~⟹~DoubleRightArrow~⇒~DoubleRightTee~⊨~DoubleUpArrow~⇑~DoubleUpDownArrow~⇕~DoubleVerticalBar~∥~DownArrow~↓~DownArrowBar~⤓~DownArrowUpArrow~⇵~DownBreve~̑~DownLeftRightVector~⥐~DownLeftTeeVector~⥞~DownLeftVector~↽~DownLeftVectorBar~⥖~DownRightTeeVector~⥟~DownRightVector~⇁~DownRightVectorBar~⥗~DownTee~⊤~DownTeeArrow~↧~Downarrow~⇓~Dscr~𝒟~Dstrok~Đ~ENG~Ŋ~Ecaron~Ě~Ecy~Э~Edot~Ė~Efr~𝔈~Element~∈~Emacr~Ē~EmptySmallSquare~◻~EmptyVerySmallSquare~▫~Eogon~Ę~Eopf~𝔼~Equal~⩵~EqualTilde~≂~Equilibrium~⇌~Escr~ℰ~Esim~⩳~Exists~∃~ExponentialE~ⅇ~Fcy~Ф~Ffr~𝔉~FilledSmallSquare~◼~FilledVerySmallSquare~▪~Fopf~𝔽~ForAll~∀~Fouriertrf~ℱ~Fscr~ℱ~GJcy~Ѓ~Gammad~Ϝ~Gbreve~Ğ~Gcedil~Ģ~Gcirc~Ĝ~Gcy~Г~Gdot~Ġ~Gfr~𝔊~Gg~⋙~Gopf~𝔾~GreaterEqual~≥~GreaterEqualLess~⋛~GreaterFullEqual~≧~GreaterGreater~⪢~GreaterLess~≷~GreaterSlantEqual~⩾~GreaterTilde~≳~Gscr~𝒢~Gt~≫~HARDcy~Ъ~Hacek~ˇ~Hat~^~Hcirc~Ĥ~Hfr~ℌ~HilbertSpace~ℋ~Hopf~ℍ~HorizontalLine~─~Hscr~ℋ~Hstrok~Ħ~HumpDownHump~≎~HumpEqual~≏~IEcy~Е~IJlig~Ĳ~IOcy~Ё~Icy~И~Idot~İ~Ifr~ℑ~Im~ℑ~Imacr~Ī~ImaginaryI~ⅈ~Implies~⇒~Int~∬~Integral~∫~Intersection~⋂~InvisibleComma~⁣~InvisibleTimes~⁢~Iogon~Į~Iopf~𝕀~Iscr~ℐ~Itilde~Ĩ~Iukcy~І~Jcirc~Ĵ~Jcy~Й~Jfr~𝔍~Jopf~𝕁~Jscr~𝒥~Jsercy~Ј~Jukcy~Є~KHcy~Х~KJcy~Ќ~Kcedil~Ķ~Kcy~К~Kfr~𝔎~Kopf~𝕂~Kscr~𝒦~LJcy~Љ~Lacute~Ĺ~Lang~⟪~Laplacetrf~ℒ~Larr~↞~Lcaron~Ľ~Lcedil~Ļ~Lcy~Л~LeftAngleBracket~⟨~LeftArrow~←~LeftArrowBar~⇤~LeftArrowRightArrow~⇆~LeftCeiling~⌈~LeftDoubleBracket~⟦~LeftDownTeeVector~⥡~LeftDownVector~⇃~LeftDownVectorBar~⥙~LeftFloor~⌊~LeftRightArrow~↔~LeftRightVector~⥎~LeftTee~⊣~LeftTeeArrow~↤~LeftTeeVector~⥚~LeftTriangle~⊲~LeftTriangleBar~⧏~LeftTriangleEqual~⊴~LeftUpDownVector~⥑~LeftUpTeeVector~⥠~LeftUpVector~↿~LeftUpVectorBar~⥘~LeftVector~↼~LeftVectorBar~⥒~Leftarrow~⇐~Leftrightarrow~⇔~LessEqualGreater~⋚~LessFullEqual~≦~LessGreater~≶~LessLess~⪡~LessSlantEqual~⩽~LessTilde~≲~Lfr~𝔏~Ll~⋘~Lleftarrow~⇚~Lmidot~Ŀ~LongLeftArrow~⟵~LongLeftRightArrow~⟷~LongRightArrow~⟶~Longleftarrow~⟸~Longleftrightarrow~⟺~Longrightarrow~⟹~Lopf~𝕃~LowerLeftArrow~↙~LowerRightArrow~↘~Lscr~ℒ~Lsh~↰~Lstrok~Ł~Lt~≪~Map~⤅~Mcy~М~MediumSpace~ ~Mellintrf~ℳ~Mfr~𝔐~MinusPlus~∓~Mopf~𝕄~Mscr~ℳ~NJcy~Њ~Nacute~Ń~Ncaron~Ň~Ncedil~Ņ~Ncy~Н~NegativeMediumSpace~​~NegativeThickSpace~​~NegativeThinSpace~​~NegativeVeryThinSpace~​~NestedGreaterGreater~≫~NestedLessLess~≪~NewLine~\\n~Nfr~𝔑~NoBreak~⁠~NonBreakingSpace~ ~Nopf~ℕ~Not~⫬~NotCongruent~≢~NotCupCap~≭~NotDoubleVerticalBar~∦~NotElement~∉~NotEqual~≠~NotEqualTilde~≂̸~NotExists~∄~NotGreater~≯~NotGreaterEqual~≱~NotGreaterFullEqual~≧̸~NotGreaterGreater~≫̸~NotGreaterLess~≹~NotGreaterSlantEqual~⩾̸~NotGreaterTilde~≵~NotHumpDownHump~≎̸~NotHumpEqual~≏̸~NotLeftTriangle~⋪~NotLeftTriangleBar~⧏̸~NotLeftTriangleEqual~⋬~NotLess~≮~NotLessEqual~≰~NotLessGreater~≸~NotLessLess~≪̸~NotLessSlantEqual~⩽̸~NotLessTilde~≴~NotNestedGreaterGreater~⪢̸~NotNestedLessLess~⪡̸~NotPrecedes~⊀~NotPrecedesEqual~⪯̸~NotPrecedesSlantEqual~⋠~NotReverseElement~∌~NotRightTriangle~⋫~NotRightTriangleBar~⧐̸~NotRightTriangleEqual~⋭~NotSquareSubset~⊏̸~NotSquareSubsetEqual~⋢~NotSquareSuperset~⊐̸~NotSquareSupersetEqual~⋣~NotSubset~⊂⃒~NotSubsetEqual~⊈~NotSucceeds~⊁~NotSucceedsEqual~⪰̸~NotSucceedsSlantEqual~⋡~NotSucceedsTilde~≿̸~NotSuperset~⊃⃒~NotSupersetEqual~⊉~NotTilde~≁~NotTildeEqual~≄~NotTildeFullEqual~≇~NotTildeTilde~≉~NotVerticalBar~∤~Nscr~𝒩~Ocy~О~Odblac~Ő~Ofr~𝔒~Omacr~Ō~Oopf~𝕆~OpenCurlyDoubleQuote~“~OpenCurlyQuote~‘~Or~⩔~Oscr~𝒪~Otimes~⨷~OverBar~‾~OverBrace~⏞~OverBracket~⎴~OverParenthesis~⏜~PartialD~∂~Pcy~П~Pfr~𝔓~PlusMinus~±~Poincareplane~ℌ~Popf~ℙ~Pr~⪻~Precedes~≺~PrecedesEqual~⪯~PrecedesSlantEqual~≼~PrecedesTilde~≾~Product~∏~Proportion~∷~Proportional~∝~Pscr~𝒫~Qfr~𝔔~Qopf~ℚ~Qscr~𝒬~RBarr~⤐~Racute~Ŕ~Rang~⟫~Rarr~↠~Rarrtl~⤖~Rcaron~Ř~Rcedil~Ŗ~Rcy~Р~Re~ℜ~ReverseElement~∋~ReverseEquilibrium~⇋~ReverseUpEquilibrium~⥯~Rfr~ℜ~RightAngleBracket~⟩~RightArrow~→~RightArrowBar~⇥~RightArrowLeftArrow~⇄~RightCeiling~⌉~RightDoubleBracket~⟧~RightDownTeeVector~⥝~RightDownVector~⇂~RightDownVectorBar~⥕~RightFloor~⌋~RightTee~⊢~RightTeeArrow~↦~RightTeeVector~⥛~RightTriangle~⊳~RightTriangleBar~⧐~RightTriangleEqual~⊵~RightUpDownVector~⥏~RightUpTeeVector~⥜~RightUpVector~↾~RightUpVectorBar~⥔~RightVector~⇀~RightVectorBar~⥓~Rightarrow~⇒~Ropf~ℝ~RoundImplies~⥰~Rrightarrow~⇛~Rscr~ℛ~Rsh~↱~RuleDelayed~⧴~SHCHcy~Щ~SHcy~Ш~SOFTcy~Ь~Sacute~Ś~Sc~⪼~Scedil~Ş~Scirc~Ŝ~Scy~С~Sfr~𝔖~ShortDownArrow~↓~ShortLeftArrow~←~ShortRightArrow~→~ShortUpArrow~↑~SmallCircle~∘~Sopf~𝕊~Sqrt~√~Square~□~SquareIntersection~⊓~SquareSubset~⊏~SquareSubsetEqual~⊑~SquareSuperset~⊐~SquareSupersetEqual~⊒~SquareUnion~⊔~Sscr~𝒮~Star~⋆~Sub~⋐~Subset~⋐~SubsetEqual~⊆~Succeeds~≻~SucceedsEqual~⪰~SucceedsSlantEqual~≽~SucceedsTilde~≿~SuchThat~∋~Sum~∑~Sup~⋑~Superset~⊃~SupersetEqual~⊇~Supset~⋑~TRADE~™~TSHcy~Ћ~TScy~Ц~Tab~\\t~Tcaron~Ť~Tcedil~Ţ~Tcy~Т~Tfr~𝔗~Therefore~∴~ThickSpace~  ~ThinSpace~ ~Tilde~∼~TildeEqual~≃~TildeFullEqual~≅~TildeTilde~≈~Topf~𝕋~TripleDot~⃛~Tscr~𝒯~Tstrok~Ŧ~Uarr~↟~Uarrocir~⥉~Ubrcy~Ў~Ubreve~Ŭ~Ucy~У~Udblac~Ű~Ufr~𝔘~Umacr~Ū~UnderBar~_~UnderBrace~⏟~UnderBracket~⎵~UnderParenthesis~⏝~Union~⋃~UnionPlus~⊎~Uogon~Ų~Uopf~𝕌~UpArrow~↑~UpArrowBar~⤒~UpArrowDownArrow~⇅~UpDownArrow~↕~UpEquilibrium~⥮~UpTee~⊥~UpTeeArrow~↥~Uparrow~⇑~Updownarrow~⇕~UpperLeftArrow~↖~UpperRightArrow~↗~Upsi~ϒ~Uring~Ů~Uscr~𝒰~Utilde~Ũ~VDash~⊫~Vbar~⫫~Vcy~В~Vdash~⊩~Vdashl~⫦~Vee~⋁~Verbar~‖~Vert~‖~VerticalBar~∣~VerticalLine~|~VerticalSeparator~❘~VerticalTilde~≀~VeryThinSpace~ ~Vfr~𝔙~Vopf~𝕍~Vscr~𝒱~Vvdash~⊪~Wcirc~Ŵ~Wedge~⋀~Wfr~𝔚~Wopf~𝕎~Wscr~𝒲~Xfr~𝔛~Xopf~𝕏~Xscr~𝒳~YAcy~Я~YIcy~Ї~YUcy~Ю~Ycirc~Ŷ~Ycy~Ы~Yfr~𝔜~Yopf~𝕐~Yscr~𝒴~ZHcy~Ж~Zacute~Ź~Zcaron~Ž~Zcy~З~Zdot~Ż~ZeroWidthSpace~​~Zfr~ℨ~Zopf~ℤ~Zscr~𝒵~abreve~ă~ac~∾~acE~∾̳~acd~∿~acy~а~af~⁡~afr~𝔞~aleph~ℵ~amacr~ā~amalg~⨿~andand~⩕~andd~⩜~andslope~⩘~andv~⩚~ange~⦤~angle~∠~angmsd~∡~angmsdaa~⦨~angmsdab~⦩~angmsdac~⦪~angmsdad~⦫~angmsdae~⦬~angmsdaf~⦭~angmsdag~⦮~angmsdah~⦯~angrt~∟~angrtvb~⊾~angrtvbd~⦝~angsph~∢~angst~Å~angzarr~⍼~aogon~ą~aopf~𝕒~ap~≈~apE~⩰~apacir~⩯~ape~≊~apid~≋~approx~≈~approxeq~≊~ascr~𝒶~ast~*~asympeq~≍~awconint~∳~awint~⨑~bNot~⫭~backcong~≌~backepsilon~϶~backprime~‵~backsim~∽~backsimeq~⋍~barvee~⊽~barwed~⌅~barwedge~⌅~bbrk~⎵~bbrktbrk~⎶~bcong~≌~bcy~б~becaus~∵~because~∵~bemptyv~⦰~bepsi~϶~bernou~ℬ~beth~ℶ~between~≬~bfr~𝔟~bigcap~⋂~bigcirc~◯~bigcup~⋃~bigodot~⨀~bigoplus~⨁~bigotimes~⨂~bigsqcup~⨆~bigstar~★~bigtriangledown~▽~bigtriangleup~△~biguplus~⨄~bigvee~⋁~bigwedge~⋀~bkarow~⤍~blacklozenge~⧫~blacksquare~▪~blacktriangle~▴~blacktriangledown~▾~blacktriangleleft~◂~blacktriangleright~▸~blank~␣~blk12~▒~blk14~░~blk34~▓~block~█~bne~=⃥~bnequiv~≡⃥~bnot~⌐~bopf~𝕓~bot~⊥~bottom~⊥~bowtie~⋈~boxDL~╗~boxDR~╔~boxDl~╖~boxDr~╓~boxH~═~boxHD~╦~boxHU~╩~boxHd~╤~boxHu~╧~boxUL~╝~boxUR~╚~boxUl~╜~boxUr~╙~boxV~║~boxVH~╬~boxVL~╣~boxVR~╠~boxVh~╫~boxVl~╢~boxVr~╟~boxbox~⧉~boxdL~╕~boxdR~╒~boxdl~┐~boxdr~┌~boxh~─~boxhD~╥~boxhU~╨~boxhd~┬~boxhu~┴~boxminus~⊟~boxplus~⊞~boxtimes~⊠~boxuL~╛~boxuR~╘~boxul~┘~boxur~└~boxv~│~boxvH~╪~boxvL~╡~boxvR~╞~boxvh~┼~boxvl~┤~boxvr~├~bprime~‵~breve~˘~bscr~𝒷~bsemi~⁏~bsim~∽~bsime~⋍~bsol~\\\\~bsolb~⧅~bsolhsub~⟈~bullet~•~bump~≎~bumpE~⪮~bumpe~≏~bumpeq~≏~cacute~ć~capand~⩄~capbrcup~⩉~capcap~⩋~capcup~⩇~capdot~⩀~caps~∩︀~caret~⁁~caron~ˇ~ccaps~⩍~ccaron~č~ccirc~ĉ~ccups~⩌~ccupssm~⩐~cdot~ċ~cemptyv~⦲~centerdot~·~cfr~𝔠~chcy~ч~check~✓~checkmark~✓~cir~○~cirE~⧃~circeq~≗~circlearrowleft~↺~circlearrowright~↻~circledR~®~circledS~Ⓢ~circledast~⊛~circledcirc~⊚~circleddash~⊝~cire~≗~cirfnint~⨐~cirmid~⫯~cirscir~⧂~clubsuit~♣~colon~:~colone~≔~coloneq~≔~comma~,~commat~@~comp~∁~compfn~∘~complement~∁~complexes~ℂ~congdot~⩭~conint~∮~copf~𝕔~coprod~∐~copysr~℗~cross~✗~cscr~𝒸~csub~⫏~csube~⫑~csup~⫐~csupe~⫒~ctdot~⋯~cudarrl~⤸~cudarrr~⤵~cuepr~⋞~cuesc~⋟~cularr~↶~cularrp~⤽~cupbrcap~⩈~cupcap~⩆~cupcup~⩊~cupdot~⊍~cupor~⩅~cups~∪︀~curarr~↷~curarrm~⤼~curlyeqprec~⋞~curlyeqsucc~⋟~curlyvee~⋎~curlywedge~⋏~curvearrowleft~↶~curvearrowright~↷~cuvee~⋎~cuwed~⋏~cwconint~∲~cwint~∱~cylcty~⌭~dHar~⥥~daleth~ℸ~dash~‐~dashv~⊣~dbkarow~⤏~dblac~˝~dcaron~ď~dcy~д~dd~ⅆ~ddagger~‡~ddarr~⇊~ddotseq~⩷~demptyv~⦱~dfisht~⥿~dfr~𝔡~dharl~⇃~dharr~⇂~diam~⋄~diamond~⋄~diamondsuit~♦~die~¨~digamma~ϝ~disin~⋲~div~÷~divideontimes~⋇~divonx~⋇~djcy~ђ~dlcorn~⌞~dlcrop~⌍~dollar~$~dopf~𝕕~dot~˙~doteq~≐~doteqdot~≑~dotminus~∸~dotplus~∔~dotsquare~⊡~doublebarwedge~⌆~downarrow~↓~downdownarrows~⇊~downharpoonleft~⇃~downharpoonright~⇂~drbkarow~⤐~drcorn~⌟~drcrop~⌌~dscr~𝒹~dscy~ѕ~dsol~⧶~dstrok~đ~dtdot~⋱~dtri~▿~dtrif~▾~duarr~⇵~duhar~⥯~dwangle~⦦~dzcy~џ~dzigrarr~⟿~eDDot~⩷~eDot~≑~easter~⩮~ecaron~ě~ecir~≖~ecolon~≕~ecy~э~edot~ė~ee~ⅇ~efDot~≒~efr~𝔢~eg~⪚~egs~⪖~egsdot~⪘~el~⪙~elinters~⏧~ell~ℓ~els~⪕~elsdot~⪗~emacr~ē~emptyset~∅~emptyv~∅~emsp13~ ~emsp14~ ~eng~ŋ~eogon~ę~eopf~𝕖~epar~⋕~eparsl~⧣~eplus~⩱~epsi~ε~epsiv~ϵ~eqcirc~≖~eqcolon~≕~eqsim~≂~eqslantgtr~⪖~eqslantless~⪕~equals~=~equest~≟~equivDD~⩸~eqvparsl~⧥~erDot~≓~erarr~⥱~escr~ℯ~esdot~≐~esim~≂~excl~!~expectation~ℰ~exponentiale~ⅇ~fallingdotseq~≒~fcy~ф~female~♀~ffilig~ﬃ~fflig~ﬀ~ffllig~ﬄ~ffr~𝔣~filig~ﬁ~fjlig~fj~flat~♭~fllig~ﬂ~fltns~▱~fopf~𝕗~fork~⋔~forkv~⫙~fpartint~⨍~frac13~⅓~frac15~⅕~frac16~⅙~frac18~⅛~frac23~⅔~frac25~⅖~frac35~⅗~frac38~⅜~frac45~⅘~frac56~⅚~frac58~⅝~frac78~⅞~frown~⌢~fscr~𝒻~gE~≧~gEl~⪌~gacute~ǵ~gammad~ϝ~gap~⪆~gbreve~ğ~gcirc~ĝ~gcy~г~gdot~ġ~gel~⋛~geq~≥~geqq~≧~geqslant~⩾~ges~⩾~gescc~⪩~gesdot~⪀~gesdoto~⪂~gesdotol~⪄~gesl~⋛︀~gesles~⪔~gfr~𝔤~gg~≫~ggg~⋙~gimel~ℷ~gjcy~ѓ~gl~≷~glE~⪒~gla~⪥~glj~⪤~gnE~≩~gnap~⪊~gnapprox~⪊~gne~⪈~gneq~⪈~gneqq~≩~gnsim~⋧~gopf~𝕘~grave~`~gscr~ℊ~gsim~≳~gsime~⪎~gsiml~⪐~gtcc~⪧~gtcir~⩺~gtdot~⋗~gtlPar~⦕~gtquest~⩼~gtrapprox~⪆~gtrarr~⥸~gtrdot~⋗~gtreqless~⋛~gtreqqless~⪌~gtrless~≷~gtrsim~≳~gvertneqq~≩︀~gvnE~≩︀~hairsp~ ~half~½~hamilt~ℋ~hardcy~ъ~harrcir~⥈~harrw~↭~hbar~ℏ~hcirc~ĥ~heartsuit~♥~hercon~⊹~hfr~𝔥~hksearow~⤥~hkswarow~⤦~hoarr~⇿~homtht~∻~hookleftarrow~↩~hookrightarrow~↪~hopf~𝕙~horbar~―~hscr~𝒽~hslash~ℏ~hstrok~ħ~hybull~⁃~hyphen~‐~ic~⁣~icy~и~iecy~е~iff~⇔~ifr~𝔦~ii~ⅈ~iiiint~⨌~iiint~∭~iinfin~⧜~iiota~℩~ijlig~ĳ~imacr~ī~imagline~ℐ~imagpart~ℑ~imath~ı~imof~⊷~imped~Ƶ~in~∈~incare~℅~infintie~⧝~inodot~ı~intcal~⊺~integers~ℤ~intercal~⊺~intlarhk~⨗~intprod~⨼~iocy~ё~iogon~į~iopf~𝕚~iprod~⨼~iscr~𝒾~isinE~⋹~isindot~⋵~isins~⋴~isinsv~⋳~isinv~∈~it~⁢~itilde~ĩ~iukcy~і~jcirc~ĵ~jcy~й~jfr~𝔧~jmath~ȷ~jopf~𝕛~jscr~𝒿~jsercy~ј~jukcy~є~kappav~ϰ~kcedil~ķ~kcy~к~kfr~𝔨~kgreen~ĸ~khcy~х~kjcy~ќ~kopf~𝕜~kscr~𝓀~lAarr~⇚~lAtail~⤛~lBarr~⤎~lE~≦~lEg~⪋~lHar~⥢~lacute~ĺ~laemptyv~⦴~lagran~ℒ~langd~⦑~langle~⟨~lap~⪅~larrb~⇤~larrbfs~⤟~larrfs~⤝~larrhk~↩~larrlp~↫~larrpl~⤹~larrsim~⥳~larrtl~↢~lat~⪫~latail~⤙~late~⪭~lates~⪭︀~lbarr~⤌~lbbrk~❲~lbrace~{~lbrack~[~lbrke~⦋~lbrksld~⦏~lbrkslu~⦍~lcaron~ľ~lcedil~ļ~lcub~{~lcy~л~ldca~⤶~ldquor~„~ldrdhar~⥧~ldrushar~⥋~ldsh~↲~leftarrow~←~leftarrowtail~↢~leftharpoondown~↽~leftharpoonup~↼~leftleftarrows~⇇~leftrightarrow~↔~leftrightarrows~⇆~leftrightharpoons~⇋~leftrightsquigarrow~↭~leftthreetimes~⋋~leg~⋚~leq~≤~leqq~≦~leqslant~⩽~les~⩽~lescc~⪨~lesdot~⩿~lesdoto~⪁~lesdotor~⪃~lesg~⋚︀~lesges~⪓~lessapprox~⪅~lessdot~⋖~lesseqgtr~⋚~lesseqqgtr~⪋~lessgtr~≶~lesssim~≲~lfisht~⥼~lfr~𝔩~lg~≶~lgE~⪑~lhard~↽~lharu~↼~lharul~⥪~lhblk~▄~ljcy~љ~ll~≪~llarr~⇇~llcorner~⌞~llhard~⥫~lltri~◺~lmidot~ŀ~lmoust~⎰~lmoustache~⎰~lnE~≨~lnap~⪉~lnapprox~⪉~lne~⪇~lneq~⪇~lneqq~≨~lnsim~⋦~loang~⟬~loarr~⇽~lobrk~⟦~longleftarrow~⟵~longleftrightarrow~⟷~longmapsto~⟼~longrightarrow~⟶~looparrowleft~↫~looparrowright~↬~lopar~⦅~lopf~𝕝~loplus~⨭~lotimes~⨴~lowbar~_~lozenge~◊~lozf~⧫~lpar~(~lparlt~⦓~lrarr~⇆~lrcorner~⌟~lrhar~⇋~lrhard~⥭~lrtri~⊿~lscr~𝓁~lsh~↰~lsim~≲~lsime~⪍~lsimg~⪏~lsqb~[~lsquor~‚~lstrok~ł~ltcc~⪦~ltcir~⩹~ltdot~⋖~lthree~⋋~ltimes~⋉~ltlarr~⥶~ltquest~⩻~ltrPar~⦖~ltri~◃~ltrie~⊴~ltrif~◂~lurdshar~⥊~luruhar~⥦~lvertneqq~≨︀~lvnE~≨︀~mDDot~∺~male~♂~malt~✠~maltese~✠~map~↦~mapsto~↦~mapstodown~↧~mapstoleft~↤~mapstoup~↥~marker~▮~mcomma~⨩~mcy~м~measuredangle~∡~mfr~𝔪~mho~℧~mid~∣~midast~*~midcir~⫰~minusb~⊟~minusd~∸~minusdu~⨪~mlcp~⫛~mldr~…~mnplus~∓~models~⊧~mopf~𝕞~mp~∓~mscr~𝓂~mstpos~∾~multimap~⊸~mumap~⊸~nGg~⋙̸~nGt~≫⃒~nGtv~≫̸~nLeftarrow~⇍~nLeftrightarrow~⇎~nLl~⋘̸~nLt~≪⃒~nLtv~≪̸~nRightarrow~⇏~nVDash~⊯~nVdash~⊮~nacute~ń~nang~∠⃒~nap~≉~napE~⩰̸~napid~≋̸~napos~ŉ~napprox~≉~natur~♮~natural~♮~naturals~ℕ~nbump~≎̸~nbumpe~≏̸~ncap~⩃~ncaron~ň~ncedil~ņ~ncong~≇~ncongdot~⩭̸~ncup~⩂~ncy~н~neArr~⇗~nearhk~⤤~nearr~↗~nearrow~↗~nedot~≐̸~nequiv~≢~nesear~⤨~nesim~≂̸~nexist~∄~nexists~∄~nfr~𝔫~ngE~≧̸~nge~≱~ngeq~≱~ngeqq~≧̸~ngeqslant~⩾̸~nges~⩾̸~ngsim~≵~ngt~≯~ngtr~≯~nhArr~⇎~nharr~↮~nhpar~⫲~nis~⋼~nisd~⋺~niv~∋~njcy~њ~nlArr~⇍~nlE~≦̸~nlarr~↚~nldr~‥~nle~≰~nleftarrow~↚~nleftrightarrow~↮~nleq~≰~nleqq~≦̸~nleqslant~⩽̸~nles~⩽̸~nless~≮~nlsim~≴~nlt~≮~nltri~⋪~nltrie~⋬~nmid~∤~nopf~𝕟~notinE~⋹̸~notindot~⋵̸~notinva~∉~notinvb~⋷~notinvc~⋶~notni~∌~notniva~∌~notnivb~⋾~notnivc~⋽~npar~∦~nparallel~∦~nparsl~⫽⃥~npart~∂̸~npolint~⨔~npr~⊀~nprcue~⋠~npre~⪯̸~nprec~⊀~npreceq~⪯̸~nrArr~⇏~nrarr~↛~nrarrc~⤳̸~nrarrw~↝̸~nrightarrow~↛~nrtri~⋫~nrtrie~⋭~nsc~⊁~nsccue~⋡~nsce~⪰̸~nscr~𝓃~nshortmid~∤~nshortparallel~∦~nsim~≁~nsime~≄~nsimeq~≄~nsmid~∤~nspar~∦~nsqsube~⋢~nsqsupe~⋣~nsubE~⫅̸~nsube~⊈~nsubset~⊂⃒~nsubseteq~⊈~nsubseteqq~⫅̸~nsucc~⊁~nsucceq~⪰̸~nsup~⊅~nsupE~⫆̸~nsupe~⊉~nsupset~⊃⃒~nsupseteq~⊉~nsupseteqq~⫆̸~ntgl~≹~ntlg~≸~ntriangleleft~⋪~ntrianglelefteq~⋬~ntriangleright~⋫~ntrianglerighteq~⋭~num~#~numero~№~numsp~ ~nvDash~⊭~nvHarr~⤄~nvap~≍⃒~nvdash~⊬~nvge~≥⃒~nvgt~>⃒~nvinfin~⧞~nvlArr~⤂~nvle~≤⃒~nvlt~<⃒~nvltrie~⊴⃒~nvrArr~⤃~nvrtrie~⊵⃒~nvsim~∼⃒~nwArr~⇖~nwarhk~⤣~nwarr~↖~nwarrow~↖~nwnear~⤧~oS~Ⓢ~oast~⊛~ocir~⊚~ocy~о~odash~⊝~odblac~ő~odiv~⨸~odot~⊙~odsold~⦼~ofcir~⦿~ofr~𝔬~ogon~˛~ogt~⧁~ohbar~⦵~ohm~Ω~oint~∮~olarr~↺~olcir~⦾~olcross~⦻~olt~⧀~omacr~ō~omid~⦶~ominus~⊖~oopf~𝕠~opar~⦷~operp~⦹~orarr~↻~ord~⩝~order~ℴ~orderof~ℴ~origof~⊶~oror~⩖~orslope~⩗~orv~⩛~oscr~ℴ~osol~⊘~otimesas~⨶~ovbar~⌽~par~∥~parallel~∥~parsim~⫳~parsl~⫽~pcy~п~percnt~%~period~.~pertenk~‱~pfr~𝔭~phiv~ϕ~phmmat~ℳ~phone~☎~pitchfork~⋔~planck~ℏ~planckh~ℎ~plankv~ℏ~plus~+~plusacir~⨣~plusb~⊞~pluscir~⨢~plusdo~∔~plusdu~⨥~pluse~⩲~plussim~⨦~plustwo~⨧~pm~±~pointint~⨕~popf~𝕡~pr~≺~prE~⪳~prap~⪷~prcue~≼~pre~⪯~prec~≺~precapprox~⪷~preccurlyeq~≼~preceq~⪯~precnapprox~⪹~precneqq~⪵~precnsim~⋨~precsim~≾~primes~ℙ~prnE~⪵~prnap~⪹~prnsim~⋨~profalar~⌮~profline~⌒~profsurf~⌓~propto~∝~prsim~≾~prurel~⊰~pscr~𝓅~puncsp~ ~qfr~𝔮~qint~⨌~qopf~𝕢~qprime~⁗~qscr~𝓆~quaternions~ℍ~quatint~⨖~quest~?~questeq~≟~rAarr~⇛~rAtail~⤜~rBarr~⤏~rHar~⥤~race~∽̱~racute~ŕ~raemptyv~⦳~rangd~⦒~range~⦥~rangle~⟩~rarrap~⥵~rarrb~⇥~rarrbfs~⤠~rarrc~⤳~rarrfs~⤞~rarrhk~↪~rarrlp~↬~rarrpl~⥅~rarrsim~⥴~rarrtl~↣~rarrw~↝~ratail~⤚~ratio~∶~rationals~ℚ~rbarr~⤍~rbbrk~❳~rbrace~}~rbrack~]~rbrke~⦌~rbrksld~⦎~rbrkslu~⦐~rcaron~ř~rcedil~ŗ~rcub~}~rcy~р~rdca~⤷~rdldhar~⥩~rdquor~”~rdsh~↳~realine~ℛ~realpart~ℜ~reals~ℝ~rect~▭~rfisht~⥽~rfr~𝔯~rhard~⇁~rharu~⇀~rharul~⥬~rhov~ϱ~rightarrow~→~rightarrowtail~↣~rightharpoondown~⇁~rightharpoonup~⇀~rightleftarrows~⇄~rightleftharpoons~⇌~rightrightarrows~⇉~rightsquigarrow~↝~rightthreetimes~⋌~ring~˚~risingdotseq~≓~rlarr~⇄~rlhar~⇌~rmoust~⎱~rmoustache~⎱~rnmid~⫮~roang~⟭~roarr~⇾~robrk~⟧~ropar~⦆~ropf~𝕣~roplus~⨮~rotimes~⨵~rpar~)~rpargt~⦔~rppolint~⨒~rrarr~⇉~rscr~𝓇~rsh~↱~rsqb~]~rsquor~’~rthree~⋌~rtimes~⋊~rtri~▹~rtrie~⊵~rtrif~▸~rtriltri~⧎~ruluhar~⥨~rx~℞~sacute~ś~sc~≻~scE~⪴~scap~⪸~sccue~≽~sce~⪰~scedil~ş~scirc~ŝ~scnE~⪶~scnap~⪺~scnsim~⋩~scpolint~⨓~scsim~≿~scy~с~sdotb~⊡~sdote~⩦~seArr~⇘~searhk~⤥~searr~↘~searrow~↘~semi~;~seswar~⤩~setminus~∖~setmn~∖~sext~✶~sfr~𝔰~sfrown~⌢~sharp~♯~shchcy~щ~shcy~ш~shortmid~∣~shortparallel~∥~sigmav~ς~simdot~⩪~sime~≃~simeq~≃~simg~⪞~simgE~⪠~siml~⪝~simlE~⪟~simne~≆~simplus~⨤~simrarr~⥲~slarr~←~smallsetminus~∖~smashp~⨳~smeparsl~⧤~smid~∣~smile~⌣~smt~⪪~smte~⪬~smtes~⪬︀~softcy~ь~sol~/~solb~⧄~solbar~⌿~sopf~𝕤~spadesuit~♠~spar~∥~sqcap~⊓~sqcaps~⊓︀~sqcup~⊔~sqcups~⊔︀~sqsub~⊏~sqsube~⊑~sqsubset~⊏~sqsubseteq~⊑~sqsup~⊐~sqsupe~⊒~sqsupset~⊐~sqsupseteq~⊒~squ~□~square~□~squarf~▪~squf~▪~srarr~→~sscr~𝓈~ssetmn~∖~ssmile~⌣~sstarf~⋆~star~☆~starf~★~straightepsilon~ϵ~straightphi~ϕ~strns~¯~subE~⫅~subdot~⪽~subedot~⫃~submult~⫁~subnE~⫋~subne~⊊~subplus~⪿~subrarr~⥹~subset~⊂~subseteq~⊆~subseteqq~⫅~subsetneq~⊊~subsetneqq~⫋~subsim~⫇~subsub~⫕~subsup~⫓~succ~≻~succapprox~⪸~succcurlyeq~≽~succeq~⪰~succnapprox~⪺~succneqq~⪶~succnsim~⋩~succsim~≿~sung~♪~supE~⫆~supdot~⪾~supdsub~⫘~supedot~⫄~suphsol~⟉~suphsub~⫗~suplarr~⥻~supmult~⫂~supnE~⫌~supne~⊋~supplus~⫀~supset~⊃~supseteq~⊇~supseteqq~⫆~supsetneq~⊋~supsetneqq~⫌~supsim~⫈~supsub~⫔~supsup~⫖~swArr~⇙~swarhk~⤦~swarr~↙~swarrow~↙~swnwar~⤪~target~⌖~tbrk~⎴~tcaron~ť~tcedil~ţ~tcy~т~tdot~⃛~telrec~⌕~tfr~𝔱~therefore~∴~thetav~ϑ~thickapprox~≈~thicksim~∼~thkap~≈~thksim~∼~timesb~⊠~timesbar~⨱~timesd~⨰~tint~∭~toea~⤨~top~⊤~topbot~⌶~topcir~⫱~topf~𝕥~topfork~⫚~tosa~⤩~tprime~‴~triangle~▵~triangledown~▿~triangleleft~◃~trianglelefteq~⊴~triangleq~≜~triangleright~▹~trianglerighteq~⊵~tridot~◬~trie~≜~triminus~⨺~triplus~⨹~trisb~⧍~tritime~⨻~trpezium~⏢~tscr~𝓉~tscy~ц~tshcy~ћ~tstrok~ŧ~twixt~≬~twoheadleftarrow~↞~twoheadrightarrow~↠~uHar~⥣~ubrcy~ў~ubreve~ŭ~ucy~у~udarr~⇅~udblac~ű~udhar~⥮~ufisht~⥾~ufr~𝔲~uharl~↿~uharr~↾~uhblk~▀~ulcorn~⌜~ulcorner~⌜~ulcrop~⌏~ultri~◸~umacr~ū~uogon~ų~uopf~𝕦~uparrow~↑~updownarrow~↕~upharpoonleft~↿~upharpoonright~↾~uplus~⊎~upsi~υ~upuparrows~⇈~urcorn~⌝~urcorner~⌝~urcrop~⌎~uring~ů~urtri~◹~uscr~𝓊~utdot~⋰~utilde~ũ~utri~▵~utrif~▴~uuarr~⇈~uwangle~⦧~vArr~⇕~vBar~⫨~vBarv~⫩~vDash~⊨~vangrt~⦜~varepsilon~ϵ~varkappa~ϰ~varnothing~∅~varphi~ϕ~varpi~ϖ~varpropto~∝~varr~↕~varrho~ϱ~varsigma~ς~varsubsetneq~⊊︀~varsubsetneqq~⫋︀~varsupsetneq~⊋︀~varsupsetneqq~⫌︀~vartheta~ϑ~vartriangleleft~⊲~vartriangleright~⊳~vcy~в~vdash~⊢~vee~∨~veebar~⊻~veeeq~≚~vellip~⋮~verbar~|~vert~|~vfr~𝔳~vltri~⊲~vnsub~⊂⃒~vnsup~⊃⃒~vopf~𝕧~vprop~∝~vrtri~⊳~vscr~𝓋~vsubnE~⫋︀~vsubne~⊊︀~vsupnE~⫌︀~vsupne~⊋︀~vzigzag~⦚~wcirc~ŵ~wedbar~⩟~wedge~∧~wedgeq~≙~wfr~𝔴~wopf~𝕨~wp~℘~wr~≀~wreath~≀~wscr~𝓌~xcap~⋂~xcirc~◯~xcup~⋃~xdtri~▽~xfr~𝔵~xhArr~⟺~xharr~⟷~xlArr~⟸~xlarr~⟵~xmap~⟼~xnis~⋻~xodot~⨀~xopf~𝕩~xoplus~⨁~xotime~⨂~xrArr~⟹~xrarr~⟶~xscr~𝓍~xsqcup~⨆~xuplus~⨄~xutri~△~xvee~⋁~xwedge~⋀~yacy~я~ycirc~ŷ~ycy~ы~yfr~𝔶~yicy~ї~yopf~𝕪~yscr~𝓎~yucy~ю~zacute~ź~zcaron~ž~zcy~з~zdot~ż~zeetrf~ℨ~zfr~𝔷~zhcy~ж~zigrarr~⇝~zopf~𝕫~zscr~𝓏~~AMP~&~COPY~©~GT~>~LT~<~QUOT~\\\"~REG~®\", namedReferences['html4']);\n//# sourceMappingURL=named-references.js.map\n\n//# sourceURL=webpack://space-cat/./node_modules/html-entities/dist/esm/named-references.js?\n}");

/***/ }),

/***/ "./node_modules/html-entities/dist/esm/numeric-unicode-map.js":
/*!********************************************************************!*\
  !*** ./node_modules/html-entities/dist/esm/numeric-unicode-map.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   numericUnicodeMap: function() { return /* binding */ numericUnicodeMap; }\n/* harmony export */ });\nvar numericUnicodeMap = {\n    0: 65533,\n    128: 8364,\n    130: 8218,\n    131: 402,\n    132: 8222,\n    133: 8230,\n    134: 8224,\n    135: 8225,\n    136: 710,\n    137: 8240,\n    138: 352,\n    139: 8249,\n    140: 338,\n    142: 381,\n    145: 8216,\n    146: 8217,\n    147: 8220,\n    148: 8221,\n    149: 8226,\n    150: 8211,\n    151: 8212,\n    152: 732,\n    153: 8482,\n    154: 353,\n    155: 8250,\n    156: 339,\n    158: 382,\n    159: 376\n};\n//# sourceMappingURL=numeric-unicode-map.js.map\n\n//# sourceURL=webpack://space-cat/./node_modules/html-entities/dist/esm/numeric-unicode-map.js?\n}");

/***/ }),

/***/ "./node_modules/html-entities/dist/esm/surrogate-pairs.js":
/*!****************************************************************!*\
  !*** ./node_modules/html-entities/dist/esm/surrogate-pairs.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fromCodePoint: function() { return /* binding */ fromCodePoint; },\n/* harmony export */   getCodePoint: function() { return /* binding */ getCodePoint; },\n/* harmony export */   highSurrogateFrom: function() { return /* binding */ highSurrogateFrom; },\n/* harmony export */   highSurrogateTo: function() { return /* binding */ highSurrogateTo; }\n/* harmony export */ });\nvar fromCodePoint = String.fromCodePoint ||\n    function (astralCodePoint) {\n        return String.fromCharCode(Math.floor((astralCodePoint - 0x10000) / 0x400) + 0xd800, ((astralCodePoint - 0x10000) % 0x400) + 0xdc00);\n    };\n// @ts-expect-error - String.prototype.codePointAt might not exist in older node versions\nvar getCodePoint = String.prototype.codePointAt\n    ? function (input, position) {\n        return input.codePointAt(position);\n    }\n    : function (input, position) {\n        return (input.charCodeAt(position) - 0xd800) * 0x400 + input.charCodeAt(position + 1) - 0xdc00 + 0x10000;\n    };\nvar highSurrogateFrom = 0xd800;\nvar highSurrogateTo = 0xdbff;\n//# sourceMappingURL=surrogate-pairs.js.map\n\n//# sourceURL=webpack://space-cat/./node_modules/html-entities/dist/esm/surrogate-pairs.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		if (!execOptions.factory) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	!function() {
/******/ 		__webpack_require__.hmrF = function() { return "main." + __webpack_require__.h() + ".hot-update.json"; };
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	!function() {
/******/ 		__webpack_require__.h = function() { return "6a8b1dc74e91af100573"; }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "space-cat:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	!function() {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				// inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules,
/******/ 									update.css
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								}
/******/ 								return setStatus("ready").then(function () {
/******/ 									return updatedModules;
/******/ 								});
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 		
/******/ 			var onAccepted = function () {
/******/ 				return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 					// handle errors in accept handlers and self accepted module load
/******/ 					if (error) {
/******/ 						return setStatus("fail").then(function () {
/******/ 							throw error;
/******/ 						});
/******/ 					}
/******/ 		
/******/ 					if (queuedInvalidatedModules) {
/******/ 						return internalApply(options).then(function (list) {
/******/ 							outdatedModules.forEach(function (moduleId) {
/******/ 								if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 							});
/******/ 							return list;
/******/ 						});
/******/ 					}
/******/ 		
/******/ 					return setStatus("idle").then(function () {
/******/ 						return outdatedModules;
/******/ 					});
/******/ 				});
/******/ 			};
/******/ 		
/******/ 			return Promise.all(
/******/ 				results
/******/ 					.filter(function (result) {
/******/ 						return result.apply;
/******/ 					})
/******/ 					.map(function (result) {
/******/ 						return result.apply(reportError);
/******/ 					})
/******/ 			)
/******/ 				.then(function (applyResults) {
/******/ 					applyResults.forEach(function (modules) {
/******/ 						if (modules) {
/******/ 							for (var i = 0; i < modules.length; i++) {
/******/ 								outdatedModules.push(modules[i]);
/******/ 							}
/******/ 						}
/******/ 					});
/******/ 				})
/******/ 				.then(onAccepted);
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise(function(resolve, reject) {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = function(event) {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatespace_cat"] = function(chunkId, moreModules, runtime) {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					var result = newModuleFactory
/******/ 						? getAffectedModuleEffects(moduleId)
/******/ 						: {
/******/ 								type: "disposed",
/******/ 								moduleId: moduleId
/******/ 							};
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					var acceptPromises = [];
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									var result;
/******/ 									try {
/******/ 										result = callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 									if (result && typeof result.then === "function") {
/******/ 										acceptPromises.push(result);
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					var onAccepted = function () {
/******/ 						// Load self accepted modules
/******/ 						for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 							var item = outdatedSelfAcceptedModules[o];
/******/ 							var moduleId = item.module;
/******/ 							try {
/******/ 								item.require(moduleId);
/******/ 							} catch (err) {
/******/ 								if (typeof item.errorHandler === "function") {
/******/ 									try {
/******/ 										item.errorHandler(err, {
/******/ 											moduleId: moduleId,
/******/ 											module: __webpack_require__.c[moduleId]
/******/ 										});
/******/ 									} catch (err1) {
/******/ 										if (options.onErrored) {
/******/ 											options.onErrored({
/******/ 												type: "self-accept-error-handler-errored",
/******/ 												moduleId: moduleId,
/******/ 												error: err1,
/******/ 												originalError: err
/******/ 											});
/******/ 										}
/******/ 										if (!options.ignoreErrored) {
/******/ 											reportError(err1);
/******/ 											reportError(err);
/******/ 										}
/******/ 									}
/******/ 								} else {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					};
/******/ 		
/******/ 					return Promise.all(acceptPromises)
/******/ 						.then(onAccepted)
/******/ 						.then(function () {
/******/ 							return outdatedModules;
/******/ 						});
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then(function(response) {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;