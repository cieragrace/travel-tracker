/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_img1_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _images_login_logo_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _images_img2_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _images_img3_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var _images_img4_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11);
/* harmony import */ var _images_img5_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(12);
/* harmony import */ var _images_img6_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(13);
/* harmony import */ var _images_img7_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(14);
/* harmony import */ var _images_traveler_page_back_jpg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(15);
// Imports












var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_img1_png__WEBPACK_IMPORTED_MODULE_3__.default);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_login_logo_png__WEBPACK_IMPORTED_MODULE_4__.default);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_img2_png__WEBPACK_IMPORTED_MODULE_5__.default);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_img3_png__WEBPACK_IMPORTED_MODULE_6__.default);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_img4_png__WEBPACK_IMPORTED_MODULE_7__.default);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_img5_png__WEBPACK_IMPORTED_MODULE_8__.default);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_img6_png__WEBPACK_IMPORTED_MODULE_9__.default);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_img7_png__WEBPACK_IMPORTED_MODULE_10__.default);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_traveler_page_back_jpg__WEBPACK_IMPORTED_MODULE_11__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: Verdana, Tahoma, sans-serif;\n  margin: 0px;\n}\n\nbody,\nhtml {\n  height: 100vh;\n}\n\n.login-page-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0px;\n  grid-template-rows: 1fr 1fr 1fr;\n  height: 100vh;\n  width: 100vw;\n}\n\n.grid-box {\n  border: 5px solid #3A7E85;\n  background-size:cover;\n  background-repeat: no-repeat;\n  height: 33vh;\n  width: 25vw;\n}\n\n.one {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  grid-column: 1;\n  grid-row: 1;\n}\n\n.two {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  grid-row: 1;\n  grid-column: 2 / 3;\n  width: 50vw;\n  height: 33vh;\n}\n\n.three {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  grid-column: 3;\n  grid-row: 1;\n}\n\n.four {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n    grid-column: 1;\n    grid-row: 2;\n  }\n\n  .five {\n    grid-row: 2;\n    grid-column: 2 / 3;\n    width: 50vw;\n    height: 33vh;\n  }\n\n  .formBox {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  h1 {\n    margin-top: 20px;\n    margin-bottom: 10px;\n    height: 20%;\n    font-size: 50px;\n  }\n\n  input {\n    margin: 0px;\n    height: 30px;\n    width: 50%;\n  }\n\n  button {\n    margin-top: 0px;\n  }\n\n  .six {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\n    grid-column: 3;\n    grid-row: 2;\n  }\n\n  .seven {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\n    grid-column: 1;\n    grid-row: 3;\n  }\n\n  .eight {\n      background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ");\n      grid-row: 3;\n      grid-column: 2 / 3;\n      width: 50vw;\n      height: 33vh;\n    }\n\n  .nine {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ");\n    grid-column: 3;\n    grid-row: 3;\n  }\n\n   .traveler-page-container {\n    display: flex;\n    flex-direction: column;\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ");\n    background-size:cover;\n    background-repeat: no-repeat;\n    opacity: 75%;\n    height: 100vh;\n    width: 100vw;\n   }\n\n   .header {\n    flex-direction: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    height: 20vh;\n    width: 100vw;\n   }\n\n   .travelers-page-logo {\n    max-height: 200px;\n    height: 150px;\n    width: 200px;\n    max-width: 220px;\n    font-size: 100px;\n    font-weight: lighter;\n    border: 10px solid antiquewhite;\n    color: antiquewhite;\n    border-radius: 50%;\n    margin-left: 20px;\n    margin-top: 20px;\n    text-align: center;\n    opacity: 85%;\n   }\n\n   nav {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    border-top: 15px solid whitesmoke;\n    border-bottom: 15px solid whitesmoke;\n    opacity: 85%;\n    position: fixed;\n    top: 0;\n    margin-left: 300px;\n    margin-top: 50px;\n    width: 85vw;\n    height: 100px;\n   }\n\n   .nav-title {\n    font-size: 35px;\n    -webkit-text-stroke: 2px black;\n\t  -webkit-text-fill-color: white;\n    margin-left: 40px;\n    font-weight: bold;\n   }\n\n\n   input {\n    margin: 20px;\n    width: 230px;\n    height: 50px;\n   }\n\n   .login-error-message {\n    margin: 0;\n    color: #3A7E85;\n  }\n\n  select {\n    margin: 30px;\n    width: 250px;\n    height: 50px;\n    text-align: center;\n  }\n\n   .leave-text {\n    margin-left: 20px;\n    font-size: medium;\n    color: black;\n   }\n\n   .middle-section {\n    display: flex;\n    flex-direction: row;\n\t  align-items: center;\n    height: 90vh;\n    width: 100vw;\n   }\n\n   .left-side {\n    display: flex;\n    flex-direction: column;\n    align-items: baseline;\n    width: 35vw;\n    border-radius: 10px;\n    height: 700px;\n   }\n\n   h1 {\n    font-size: 50px;\n    font-weight: bold;\n    height: 75px;\n    color: antiquewhite;\n    margin-top: 20px;\n    -webkit-text-stroke: 1px black;\n\t  -webkit-text-fill-color: white;\n    padding-left: 60px;\n   }\n\n   .list-trips {\n    width: 525px;\n    height: 600px;\n    margin-top: 25px;\n    margin-left: 80px;\n    border: 5px solid whitesmoke;\n    border-top: 50px solid whitesmoke;\n    padding-left: 20px;\n    overflow: auto;\n    text-align: center;\n   }\n\n   ul {\n    color: aliceblue;\n    font-size: larger;\n    list-style: none;\n    opacity: 100%;\n    text-align: center;\n   }\n\n   li {\n    list-style: none;\n    font-weight: bolder;\n    text-align: center;\n    margin: 10px 10px 10px 0;\n   }\n\n   .trips-divs-container {\n    background-color: black;\n    opacity: 75%;\n    border: 5px solid whitesmoke;\n    border-radius: 10px;\n    height: 200px;\n    width: 500px;\n    margin-top: 20px;\n    margin-right: 15px;\n    overflow: auto;\n   }\n\n   p {\n    font-size: xx-large;\n    color: aliceblue;\n   }\n\n   .cost-and-fee {\n    width: 60vw;\n    height: 100px;\n    font-size: 50px;\n    color: antiquewhite;\n    font-weight: bold;\n    margin-bottom: 30px;\n    text-align: center;\n    margin-right: 20px;\n   }\n\n   .right-side {\n    display: flex;\n    flex-direction: column;\n    align-items: baseline;\n    justify-content: center;\n    width: 65vw;\n    border: 5px whitesmoke solid;\n    border-radius: 10px;\n    padding-left: 50px;\n    height: 700px;\n    overflow: auto;\n   }\n\n   h2 {\n    color: black;\n    font-size: 40px;\n    margin-top: 10px;\n    -webkit-text-stroke: 2px black;\n\t  -webkit-text-fill-color: white;\n   }\n\n  .list-destinations {\n    width: 60vw;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: nowrap;\n   }\n\n   .destinations {\n    background-size: cover;\n    background-repeat: no-repeat;\n    text-align: center;\n    display: flex;\n    flex-direction: column;\n    align-content: center;\n    border: 5px solid whitesmoke;\n    border-radius: 10px;\n    min-height: 325px;\n    min-width: 365px;\n    margin-top: 20px;\n    margin-left: 15px;\n    margin-right: 15px;\n   }\n\n   .names-of-destinations {\n    text-align: center;\n    margin-top: 25px;\n    font-weight: bold;\n    -webkit-text-stroke: 2px black;\n\t  -webkit-text-fill-color: white;\n   }\n\n   .list-destination-costs {\n    width: 60vw;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: nowrap;\n   }\n\n   .destination-cost {\n    max-height: 250px;\n    min-width: 373.99px;\n    margin-top: 20px;\n    margin-left: 15px;\n    margin-right: 15px;\n    border: 5px solid whitesmoke;\n    background-color: black;\n    opacity: 75%;\n    border-radius: 10px;\n    color: aliceblue;\n    font-size: xx-large;\n    font-weight: bold;\n   }\n\n   footer {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n\t  align-items: center;\n    height: 10vh;\n   }\n\n   .annual-spent {\n    margin-right: 445px;\n    margin-bottom: 40px;\n    color: antiquewhite;\n   }\n\n   .show-name {\n    height: 100px;\n    width: 40vw;\n    color: whitesmoke;\n   }\n\n   .hidden {\n    display: none;\n  }\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,wCAAwC;EACxC,WAAW;AACb;;AAEA;;EAEE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,qCAAqC;EACrC,QAAQ;EACR,+BAA+B;EAC/B,aAAa;EACb,YAAY;AACd;;AAEA;EACE,yBAAyB;EACzB,qBAAqB;EACrB,4BAA4B;EAC5B,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,yDAA2C;EAC3C,cAAc;EACd,WAAW;AACb;;AAEA;EACE,yDAAiD;EACjD,WAAW;EACX,kBAAkB;EAClB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,yDAA2C;EAC3C,cAAc;EACd,WAAW;AACb;;AAEA;IACI,yDAA2C;IAC3C,cAAc;IACd,WAAW;EACb;;EAEA;IACE,WAAW;IACX,kBAAkB;IAClB,WAAW;IACX,YAAY;EACd;;EAEA;IACE,aAAa;IACb,sBAAsB;IACtB,mBAAmB;EACrB;;EAEA;IACE,gBAAgB;IAChB,mBAAmB;IACnB,WAAW;IACX,eAAe;EACjB;;EAEA;IACE,WAAW;IACX,YAAY;IACZ,UAAU;EACZ;;EAEA;IACE,eAAe;EACjB;;EAEA;IACE,yDAA2C;IAC3C,cAAc;IACd,WAAW;EACb;;EAEA;IACE,yDAA2C;IAC3C,cAAc;IACd,WAAW;EACb;;EAEA;MACI,yDAA2C;MAC3C,WAAW;MACX,kBAAkB;MAClB,WAAW;MACX,YAAY;IACd;;EAEF;IACE,yDAA2C;IAC3C,cAAc;IACd,WAAW;EACb;;GAEC;IACC,aAAa;IACb,sBAAsB;IACtB,yDAAyD;IACzD,qBAAqB;IACrB,4BAA4B;IAC5B,YAAY;IACZ,aAAa;IACb,YAAY;GACb;;GAEA;IACC,oBAAoB;IACpB,mBAAmB;IACnB,8BAA8B;IAC9B,YAAY;IACZ,YAAY;GACb;;GAEA;IACC,iBAAiB;IACjB,aAAa;IACb,YAAY;IACZ,gBAAgB;IAChB,gBAAgB;IAChB,oBAAoB;IACpB,+BAA+B;IAC/B,mBAAmB;IACnB,kBAAkB;IAClB,iBAAiB;IACjB,gBAAgB;IAChB,kBAAkB;IAClB,YAAY;GACb;;GAEA;IACC,aAAa;IACb,mBAAmB;IACnB,mBAAmB;IACnB,iCAAiC;IACjC,oCAAoC;IACpC,YAAY;IACZ,eAAe;IACf,MAAM;IACN,kBAAkB;IAClB,gBAAgB;IAChB,WAAW;IACX,aAAa;GACd;;GAEA;IACC,eAAe;IACf,8BAA8B;GAC/B,8BAA8B;IAC7B,iBAAiB;IACjB,iBAAiB;GAClB;;;GAGA;IACC,YAAY;IACZ,YAAY;IACZ,YAAY;GACb;;GAEA;IACC,SAAS;IACT,cAAc;EAChB;;EAEA;IACE,YAAY;IACZ,YAAY;IACZ,YAAY;IACZ,kBAAkB;EACpB;;GAEC;IACC,iBAAiB;IACjB,iBAAiB;IACjB,YAAY;GACb;;GAEA;IACC,aAAa;IACb,mBAAmB;GACpB,mBAAmB;IAClB,YAAY;IACZ,YAAY;GACb;;GAEA;IACC,aAAa;IACb,sBAAsB;IACtB,qBAAqB;IACrB,WAAW;IACX,mBAAmB;IACnB,aAAa;GACd;;GAEA;IACC,eAAe;IACf,iBAAiB;IACjB,YAAY;IACZ,mBAAmB;IACnB,gBAAgB;IAChB,8BAA8B;GAC/B,8BAA8B;IAC7B,kBAAkB;GACnB;;GAEA;IACC,YAAY;IACZ,aAAa;IACb,gBAAgB;IAChB,iBAAiB;IACjB,4BAA4B;IAC5B,iCAAiC;IACjC,kBAAkB;IAClB,cAAc;IACd,kBAAkB;GACnB;;GAEA;IACC,gBAAgB;IAChB,iBAAiB;IACjB,gBAAgB;IAChB,aAAa;IACb,kBAAkB;GACnB;;GAEA;IACC,gBAAgB;IAChB,mBAAmB;IACnB,kBAAkB;IAClB,wBAAwB;GACzB;;GAEA;IACC,uBAAuB;IACvB,YAAY;IACZ,4BAA4B;IAC5B,mBAAmB;IACnB,aAAa;IACb,YAAY;IACZ,gBAAgB;IAChB,kBAAkB;IAClB,cAAc;GACf;;GAEA;IACC,mBAAmB;IACnB,gBAAgB;GACjB;;GAEA;IACC,WAAW;IACX,aAAa;IACb,eAAe;IACf,mBAAmB;IACnB,iBAAiB;IACjB,mBAAmB;IACnB,kBAAkB;IAClB,kBAAkB;GACnB;;GAEA;IACC,aAAa;IACb,sBAAsB;IACtB,qBAAqB;IACrB,uBAAuB;IACvB,WAAW;IACX,4BAA4B;IAC5B,mBAAmB;IACnB,kBAAkB;IAClB,aAAa;IACb,cAAc;GACf;;GAEA;IACC,YAAY;IACZ,eAAe;IACf,gBAAgB;IAChB,8BAA8B;GAC/B,8BAA8B;GAC9B;;EAED;IACE,WAAW;IACX,aAAa;IACb,mBAAmB;IACnB,iBAAiB;GAClB;;GAEA;IACC,sBAAsB;IACtB,4BAA4B;IAC5B,kBAAkB;IAClB,aAAa;IACb,sBAAsB;IACtB,qBAAqB;IACrB,4BAA4B;IAC5B,mBAAmB;IACnB,iBAAiB;IACjB,gBAAgB;IAChB,gBAAgB;IAChB,iBAAiB;IACjB,kBAAkB;GACnB;;GAEA;IACC,kBAAkB;IAClB,gBAAgB;IAChB,iBAAiB;IACjB,8BAA8B;GAC/B,8BAA8B;GAC9B;;GAEA;IACC,WAAW;IACX,aAAa;IACb,mBAAmB;IACnB,iBAAiB;GAClB;;GAEA;IACC,iBAAiB;IACjB,mBAAmB;IACnB,gBAAgB;IAChB,iBAAiB;IACjB,kBAAkB;IAClB,4BAA4B;IAC5B,uBAAuB;IACvB,YAAY;IACZ,mBAAmB;IACnB,gBAAgB;IAChB,mBAAmB;IACnB,iBAAiB;GAClB;;GAEA;IACC,aAAa;IACb,mBAAmB;IACnB,8BAA8B;GAC/B,mBAAmB;IAClB,YAAY;GACb;;GAEA;IACC,mBAAmB;IACnB,mBAAmB;IACnB,mBAAmB;GACpB;;GAEA;IACC,aAAa;IACb,WAAW;IACX,iBAAiB;GAClB;;GAEA;IACC,aAAa;EACf","sourcesContent":["* {\n  font-family: Verdana, Tahoma, sans-serif;\n  margin: 0px;\n}\n\nbody,\nhtml {\n  height: 100vh;\n}\n\n.login-page-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 0px;\n  grid-template-rows: 1fr 1fr 1fr;\n  height: 100vh;\n  width: 100vw;\n}\n\n.grid-box {\n  border: 5px solid #3A7E85;\n  background-size:cover;\n  background-repeat: no-repeat;\n  height: 33vh;\n  width: 25vw;\n}\n\n.one {\n  background-image: url(/src/images/img1.png);\n  grid-column: 1;\n  grid-row: 1;\n}\n\n.two {\n  background-image: url(/src/images/login-logo.png);\n  grid-row: 1;\n  grid-column: 2 / 3;\n  width: 50vw;\n  height: 33vh;\n}\n\n.three {\n  background-image: url(/src/images/img2.png);\n  grid-column: 3;\n  grid-row: 1;\n}\n\n.four {\n    background-image: url(/src/images/img3.png);\n    grid-column: 1;\n    grid-row: 2;\n  }\n\n  .five {\n    grid-row: 2;\n    grid-column: 2 / 3;\n    width: 50vw;\n    height: 33vh;\n  }\n\n  .formBox {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  h1 {\n    margin-top: 20px;\n    margin-bottom: 10px;\n    height: 20%;\n    font-size: 50px;\n  }\n\n  input {\n    margin: 0px;\n    height: 30px;\n    width: 50%;\n  }\n\n  button {\n    margin-top: 0px;\n  }\n\n  .six {\n    background-image: url(/src/images/img4.png);\n    grid-column: 3;\n    grid-row: 2;\n  }\n\n  .seven {\n    background-image: url(/src/images/img5.png);\n    grid-column: 1;\n    grid-row: 3;\n  }\n\n  .eight {\n      background-image: url(/src/images/img6.png);\n      grid-row: 3;\n      grid-column: 2 / 3;\n      width: 50vw;\n      height: 33vh;\n    }\n\n  .nine {\n    background-image: url(/src/images/img7.png);\n    grid-column: 3;\n    grid-row: 3;\n  }\n\n   .traveler-page-container {\n    display: flex;\n    flex-direction: column;\n    background-image: url(/src/images/traveler-page-back.jpg);\n    background-size:cover;\n    background-repeat: no-repeat;\n    opacity: 75%;\n    height: 100vh;\n    width: 100vw;\n   }\n\n   .header {\n    flex-direction: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    height: 20vh;\n    width: 100vw;\n   }\n\n   .travelers-page-logo {\n    max-height: 200px;\n    height: 150px;\n    width: 200px;\n    max-width: 220px;\n    font-size: 100px;\n    font-weight: lighter;\n    border: 10px solid antiquewhite;\n    color: antiquewhite;\n    border-radius: 50%;\n    margin-left: 20px;\n    margin-top: 20px;\n    text-align: center;\n    opacity: 85%;\n   }\n\n   nav {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    border-top: 15px solid whitesmoke;\n    border-bottom: 15px solid whitesmoke;\n    opacity: 85%;\n    position: fixed;\n    top: 0;\n    margin-left: 300px;\n    margin-top: 50px;\n    width: 85vw;\n    height: 100px;\n   }\n\n   .nav-title {\n    font-size: 35px;\n    -webkit-text-stroke: 2px black;\n\t  -webkit-text-fill-color: white;\n    margin-left: 40px;\n    font-weight: bold;\n   }\n\n\n   input {\n    margin: 20px;\n    width: 230px;\n    height: 50px;\n   }\n\n   .login-error-message {\n    margin: 0;\n    color: #3A7E85;\n  }\n\n  select {\n    margin: 30px;\n    width: 250px;\n    height: 50px;\n    text-align: center;\n  }\n\n   .leave-text {\n    margin-left: 20px;\n    font-size: medium;\n    color: black;\n   }\n\n   .middle-section {\n    display: flex;\n    flex-direction: row;\n\t  align-items: center;\n    height: 90vh;\n    width: 100vw;\n   }\n\n   .left-side {\n    display: flex;\n    flex-direction: column;\n    align-items: baseline;\n    width: 35vw;\n    border-radius: 10px;\n    height: 700px;\n   }\n\n   h1 {\n    font-size: 50px;\n    font-weight: bold;\n    height: 75px;\n    color: antiquewhite;\n    margin-top: 20px;\n    -webkit-text-stroke: 1px black;\n\t  -webkit-text-fill-color: white;\n    padding-left: 60px;\n   }\n\n   .list-trips {\n    width: 525px;\n    height: 600px;\n    margin-top: 25px;\n    margin-left: 80px;\n    border: 5px solid whitesmoke;\n    border-top: 50px solid whitesmoke;\n    padding-left: 20px;\n    overflow: auto;\n    text-align: center;\n   }\n\n   ul {\n    color: aliceblue;\n    font-size: larger;\n    list-style: none;\n    opacity: 100%;\n    text-align: center;\n   }\n\n   li {\n    list-style: none;\n    font-weight: bolder;\n    text-align: center;\n    margin: 10px 10px 10px 0;\n   }\n\n   .trips-divs-container {\n    background-color: black;\n    opacity: 75%;\n    border: 5px solid whitesmoke;\n    border-radius: 10px;\n    height: 200px;\n    width: 500px;\n    margin-top: 20px;\n    margin-right: 15px;\n    overflow: auto;\n   }\n\n   p {\n    font-size: xx-large;\n    color: aliceblue;\n   }\n\n   .cost-and-fee {\n    width: 60vw;\n    height: 100px;\n    font-size: 50px;\n    color: antiquewhite;\n    font-weight: bold;\n    margin-bottom: 30px;\n    text-align: center;\n    margin-right: 20px;\n   }\n\n   .right-side {\n    display: flex;\n    flex-direction: column;\n    align-items: baseline;\n    justify-content: center;\n    width: 65vw;\n    border: 5px whitesmoke solid;\n    border-radius: 10px;\n    padding-left: 50px;\n    height: 700px;\n    overflow: auto;\n   }\n\n   h2 {\n    color: black;\n    font-size: 40px;\n    margin-top: 10px;\n    -webkit-text-stroke: 2px black;\n\t  -webkit-text-fill-color: white;\n   }\n\n  .list-destinations {\n    width: 60vw;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: nowrap;\n   }\n\n   .destinations {\n    background-size: cover;\n    background-repeat: no-repeat;\n    text-align: center;\n    display: flex;\n    flex-direction: column;\n    align-content: center;\n    border: 5px solid whitesmoke;\n    border-radius: 10px;\n    min-height: 325px;\n    min-width: 365px;\n    margin-top: 20px;\n    margin-left: 15px;\n    margin-right: 15px;\n   }\n\n   .names-of-destinations {\n    text-align: center;\n    margin-top: 25px;\n    font-weight: bold;\n    -webkit-text-stroke: 2px black;\n\t  -webkit-text-fill-color: white;\n   }\n\n   .list-destination-costs {\n    width: 60vw;\n    display: flex;\n    flex-direction: row;\n    flex-wrap: nowrap;\n   }\n\n   .destination-cost {\n    max-height: 250px;\n    min-width: 373.99px;\n    margin-top: 20px;\n    margin-left: 15px;\n    margin-right: 15px;\n    border: 5px solid whitesmoke;\n    background-color: black;\n    opacity: 75%;\n    border-radius: 10px;\n    color: aliceblue;\n    font-size: xx-large;\n    font-weight: bold;\n   }\n\n   footer {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n\t  align-items: center;\n    height: 10vh;\n   }\n\n   .annual-spent {\n    margin-right: 445px;\n    margin-bottom: 40px;\n    color: antiquewhite;\n   }\n\n   .show-name {\n    height: 100px;\n    width: 40vw;\n    color: whitesmoke;\n   }\n\n   .hidden {\n    display: none;\n  }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img1.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/login-logo.png");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img2.png");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img3.png");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img4.png");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img5.png");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img6.png");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/img7.png");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/traveler-page-back.jpg");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TravelerRepository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);


class Traveler {
  constructor(travelers, tripsData, destinationData) {
    this.travelers = travelers
    this.tripsData = tripsData
    this.destinationData = destinationData
  }

  findTravelersFlights() {
    return this.tripsData.trips.filter(trip => trip.userID === this.travelers.id)
  }

 getDestinationInfoPerID(property) {
    const travelersTrips = this.findTravelersFlights()
    return this.destinationData.destinations
      .filter(destination => {
        const destinationInfo = travelersTrips.find(trip => trip.destinationID === destination.id)
        if (destinationInfo) {
          return destination
        }
      })
      .map(destination => {
        return destination[property]
      })
    }

  getTripTotal() {
    const trips = this.findTravelersFlights()
    const cost = trips.reduce((acc, trip) => {
      const destinationInfo = this.destinationData.destinations.find(destination => trip.destinationID === destination.id)
      const flightCost = trip.travelers * destinationInfo.estimatedFlightCostPerPerson
      const lodgingCost = trip.duration * destinationInfo.estimatedLodgingCostPerDay
      return acc + (flightCost + lodgingCost) * 1.1
    }, 0)
    return Number(cost.toFixed(2))
  }


  getDestinationsInfo(property) {
    const destinationDisplayInfo = this.destinationData.destinations.map(destination => {
        return destination[property]
      })
      return destinationDisplayInfo
    }

    getTripsInfo(property) {
      const eachTripsInfo = this.tripsData.trips.map(trip => {
          return trip[property]
        })
        return eachTripsInfo
      }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Traveler);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TravelerRepository {
  constructor(data) {
    this.data = data
  }

  getData(travelerID) {
    return this.data.travelers.find(currentUser => currentUser.id === travelerID)
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TravelerRepository);

/***/ }),
/* 18 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=v;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),l=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(h){case c:return r?l(1,0):l(31,11);case f:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),l=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,l=this;r=Number(r);var $=O.p(h),y=function(t){var e=w(l);return O.w(e.date(e.date()+Math.round(t*r)),l)};if($===f)return this.set(f,this.$M+r);if($===c)return this.set(c,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},$={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||$[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,v=this-M,g=O.m(this,M);return g=($={},$[c]=g/12,$[f]=g,$[h]=g/3,$[o]=(v-m)/6048e5,$[a]=(v-m)/864e5,$[u]=v/n,$[s]=v/e,$[i]=v/t,$)[y]||v,l?g:O.a(g)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[g],w.Ls=D,w.p={},w}));

/***/ })
/******/ 	]);
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
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _traveler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _TravelerRepository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_3__);

// import { getAPIData, updateAPIData } from './apiCalls'




//---------Global Variables------------

let postTripButton
let travelers
let trips
let destinations
let currentTraveler
let allTravelers

//---------Query Selectors--------------
let loginPage = document.querySelector('#loginContainer')
let loginPageError = document.querySelector('#loginError')
let travelersPage = document.querySelector('#travelersPageContainer')
let loginButton = document.querySelector('#loginButton')
let trip1 = document.querySelector("#tripDivs1")
let trip2 = document.querySelector("#tripDivs2")
let trip3 = document.querySelector("#tripDivs3")
let trip1info = document.querySelector('#tripInfo1')
let trip2info = document.querySelector('#tripInfo2')
let trip3info = document.querySelector('#tripInfo3')
let yearlyCost = document.querySelector('#annualTripCost')
document.getElementById('datePicker').setAttribute('min', new Date().toISOString().split('T')[0])
let pickedDate = document.querySelector('#datePicker')
let planButton = document.querySelector('#planButton')
let destinationsDiv = document.querySelector('.list-destinations')
let destinationCosts = document.querySelector(".list-destination-costs")
let userNameInput = document.querySelector('#userName')
let passwordInput = document.querySelector('#password')
let travelerName = document.querySelector('#userName')
let tripsContainer = document.querySelector('.list-trips')

//---------Event Listeners--------------

window.addEventListener("load", getAllData)
planButton.addEventListener("click", displayFututeTripTotals)
loginButton.addEventListener("click", function (event) {
  event.preventDefault
  findUser()
})

//-----------Functions-------------------
function getAPIData(info) {
  const fetchedInfo = fetch(`http://localhost:3001/api/v1/${info}`)
    .then((res) => res.json())
  return fetchedInfo
}

function updateAPIData(newData, endpoint) {
  const results = fetch(`http://localhost:3001/api/v1/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": 'application/json'
    }
  })
  .then((res) => {
    if(!res.ok) {
      throw new Error(res.status)
    }
    return res.json()})
  .then(() => {
    getAPIData("trips")
      .then((data) => {
        console.log("Data:", data)
        currentTraveler.tripsData = data
        displayingTravelersFlights()})

  })
  .catch(error => console.log(error))
  return results
}

function getAllData() {
  Promise.all([getAPIData('travelers'), getAPIData('trips'), getAPIData('destinations')])
    .then((data) => {
      travelers = new _TravelerRepository__WEBPACK_IMPORTED_MODULE_2__.default(data[0])
      trips = data[1]
      destinations = data[2]
      addUsername()
      loadPage()
    })
    .catch(err => console.log("To err is human", err))
}

function addUsername() {
  const allTravelers = travelers.data.travelers.forEach(traveler => {
    traveler.userName = `traveler${traveler.id}`
  })
  return all
}

function findUser() {
  const validUser = travelers.data.travelers.find(traveler => {
    return traveler.userName === userNameInput.value
  })
  currentTraveler = new _traveler__WEBPACK_IMPORTED_MODULE_1__.default(validUser, trips, destinations)
  openTravelerPage()
  displayingTravelersFlights()
  displayPossibleDestinations()
}

function enableLoginButton() {
if (userNameInput.value &&
   passwordInput.value === "travel") {
    loginPageError.classList.add("hidden")
  loginButton.disabled = false
} else {

  loginButton.disabled = true
  }
}

function openTravelerPage() {
  loginPage.classList.add('hidden')
  travelersPage.classList.remove('hidden')
  }

function enablePlanButton() {
  if (pickedDate.value && numDays.value && numPeople.value) {
    planButton.disabled = false
  } else {
    planButton.disabled = true
    }
  }

 setInterval(enableLoginButton, 500)
 setInterval(enablePlanButton, 500);

function displayPossibleDestinations() {
  const travelersTrips = currentTraveler.tripsData.trips.filter(trip => trip.userID === currentTraveler.travelers.id)
  const possibleTrips = currentTraveler.destinationData.destinations
  const eachDest = possibleTrips.forEach(destination => {
  const destinationContainer = document.createElement("div")
  destinationContainer.classList.add("destinations")
  destinationContainer.style.backgroundImage = `url('${destination.image}')`
  const destinationName = document.createElement("p")
  destinationName.classList.add("names-of-destinations")
  destinationName.innerHTML += `${destination.destination}`
  destinationContainer.appendChild(destinationName)
  destinationsDiv.appendChild(destinationContainer)
    })
  }

function displayingTravelersFlights() {
  tripsContainer.innerHTML = ''
  yearlyCost.innerHTML = ''
  yearlyCost.innerHTML = `You've spent $${currentTraveler.getTripTotal()} seeing the world`
  const thisTraveler = currentTraveler.findTravelersFlights()
  const eachTrip = thisTraveler.forEach(trip => {
    const foundDestination = currentTraveler.destinationData.destinations.find(destination => {
      return destination.id === trip.destinationID
    }) 
    if (foundDestination) {
      const tripBox = document.createElement("div")
      tripBox.classList.add("trips-divs-container")
      tripsContainer.appendChild(tripBox)
      const tripBoxp = document.createElement("h2")
      tripBoxp.classList.add("trips-divs")
      tripBoxp.innerHTML += foundDestination.destination
      tripBox.appendChild(tripBoxp)
      const tripBoxUL = document.createElement("ul")
      tripBoxUL.classList.add("trips-info")
      tripBoxUL.innerHTML += `<li>on ${trip.date}</li>
      <li>with ${trip.travelers} people</li>
      <li>for ${trip.duration} days</li>
      <li> status: ${trip.status}`
      tripBox.appendChild(tripBoxUL)
    }
  })
}

function displayFututeTripTotals() {
  if (pickedDate.value && numDays.value && numPeople.value) {
  const possibleTrips = currentTraveler.destinationData.destinations
  const eachDestination = possibleTrips.forEach(destination => {
    const estFlightCost = destination.estimatedFlightCostPerPerson * numPeople.value
    const estLodgingCost = destination.estimatedLodgingCostPerDay * numDays.value * numPeople.value
    const totalCost = (estFlightCost + estLodgingCost) * 1.1
    const eachTripCost = document.createElement("button")
    eachTripCost.setAttribute("id", destination.id)
    eachTripCost.classList.add(`destination-cost${destination.id}`)
    eachTripCost.classList.add('destination-cost')
    eachTripCost.innerHTML += `Take a trip with ${numPeople.value} friends for ${numDays.value} days for only $${totalCost.toFixed(2)}`
    destinationCosts.appendChild(eachTripCost)
    postTripButton = document.querySelector(`.destination-cost${destination.id}`)
    postTripButton.addEventListener("click", postNewTrip)
    })
  } 
}

function postNewTrip(event) {
  console.log(event.target)
    event.preventDefault()
    const numTravelers = numPeople.value + 1
    const tripLength = numDays.value
    const date = pickedDate.value
    if(numTravelers && tripLength && date) {
      const newData = {
        id: trips.trips.length + 1,
        userID: currentTraveler.travelers.id,
        destinationID: Number(event.target.id),
        travelers: numTravelers,
        date: date.split("-").join("/"),
        duration: tripLength,
        status: "pending",
        suggestedActivities: []
      }
      // errorBox.classList.add("hidden")
      updateAPIData(newData, 'trips')
      // errorBox.classList.remove("hidden")
    }
  }

function loadPage() {
enableLoginButton()
enablePlanButton()
displayFututeTripTotals()
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map