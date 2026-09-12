"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cvishh%5COneDrive%5CDocuments%5Cswapskills%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvishh%5COneDrive%5CDocuments%5Cswapskills%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cvishh%5COneDrive%5CDocuments%5Cswapskills%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvishh%5COneDrive%5CDocuments%5Cswapskills%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_vishh_OneDrive_Documents_swapskills_frontend_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\vishh\\\\OneDrive\\\\Documents\\\\swapskills\\\\frontend\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_vishh_OneDrive_Documents_swapskills_frontend_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN2aXNoaCU1Q09uZURyaXZlJTVDRG9jdW1lbnRzJTVDc3dhcHNraWxscyU1Q2Zyb250ZW5kJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUN2aXNoaCU1Q09uZURyaXZlJTVDRG9jdW1lbnRzJTVDc3dhcHNraWxscyU1Q2Zyb250ZW5kJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNvRDtBQUNqSTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL3NraWxsc3dhcC1mcm9udGVuZC8/MDcxMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFx2aXNoaFxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcc3dhcHNraWxsc1xcXFxmcm9udGVuZFxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFx2aXNoaFxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcc3dhcHNraWxsc1xcXFxmcm9udGVuZFxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cvishh%5COneDrive%5CDocuments%5Cswapskills%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvishh%5COneDrive%5CDocuments%5Cswapskills%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFnQztBQUNRO0FBRXhDLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyxrREFBV0E7QUFFTSIsInNvdXJjZXMiOlsid2VicGFjazovL3NraWxsc3dhcC1mcm9udGVuZC8uL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzP2M4YTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gJ25leHQtYXV0aCdcclxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tICdAL2xpYi9hdXRoJ1xyXG5cclxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKVxyXG5cclxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9XHJcbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var _localUsers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./localUsers */ \"(rsc)/./lib/localUsers.ts\");\n\n\n\n\n\n\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__.PrismaAdapter)(_prisma__WEBPACK_IMPORTED_MODULE_4__.prisma),\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Email and password\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials.password) return null;\n                let user;\n                try {\n                    user = await _prisma__WEBPACK_IMPORTED_MODULE_4__.prisma.user.findUnique({\n                        where: {\n                            email: credentials.email.toLowerCase().trim()\n                        }\n                    });\n                } catch (error) {\n                    const localUser = (0,_localUsers__WEBPACK_IMPORTED_MODULE_5__.readLocalUsers)().find((candidate)=>candidate.email.toLowerCase() === credentials.email.toLowerCase().trim());\n                    const valid = localUser && (localUser.password === credentials.password || localUser.passwordHash && await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, localUser.passwordHash));\n                    if (!valid || !localUser) return null;\n                    return {\n                        id: localUser.id,\n                        name: localUser.name,\n                        email: localUser.email\n                    };\n                }\n                if (!user?.passwordHash || !await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, user.passwordHash)) return null;\n                return {\n                    id: user.id,\n                    name: user.name,\n                    email: user.email,\n                    image: user.avatarUrl\n                };\n            }\n        }),\n        ...process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [\n            (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n                clientId: process.env.GOOGLE_CLIENT_ID,\n                clientSecret: process.env.GOOGLE_CLIENT_SECRET\n            })\n        ] : []\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) token.id = user.id;\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) session.user.id = String(token.id || token.sub);\n            return session;\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUF5RDtBQUVRO0FBQ1Y7QUFDMUI7QUFDSTtBQUNZO0FBRXRDLE1BQU1NLGNBQStCO0lBQ3hDQyxTQUFTUCx3RUFBYUEsQ0FBQ0ksMkNBQU1BO0lBQzdCSSxTQUFTO1FBQUVDLFVBQVU7SUFBTTtJQUMzQkMsT0FBTztRQUFFQyxRQUFRO0lBQVM7SUFDMUJDLFdBQVc7UUFDUFgsMkVBQW1CQSxDQUFDO1lBQ2hCWSxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1RDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ3BEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDdkIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELFlBQVlJLFFBQVEsRUFBRSxPQUFPO2dCQUN6RCxJQUFJRTtnQkFDSixJQUFJO29CQUNBQSxPQUFPLE1BQU1oQiwyQ0FBTUEsQ0FBQ2dCLElBQUksQ0FBQ0MsVUFBVSxDQUFDO3dCQUFFQyxPQUFPOzRCQUFFUCxPQUFPRCxZQUFZQyxLQUFLLENBQUNRLFdBQVcsR0FBR0MsSUFBSTt3QkFBRztvQkFBRTtnQkFDbkcsRUFBRSxPQUFPQyxPQUFPO29CQUNaLE1BQU1DLFlBQVlyQiwyREFBY0EsR0FBR3NCLElBQUksQ0FBQyxDQUFDQyxZQUFjQSxVQUFVYixLQUFLLENBQUNRLFdBQVcsT0FBT1QsWUFBWUMsS0FBSyxDQUFFUSxXQUFXLEdBQUdDLElBQUk7b0JBQzlILE1BQU1LLFFBQVFILGFBQWNBLENBQUFBLFVBQVVSLFFBQVEsS0FBS0osWUFBWUksUUFBUSxJQUFLUSxVQUFVSSxZQUFZLElBQUksTUFBTTNCLHVEQUFjLENBQUNXLFlBQVlJLFFBQVEsRUFBRVEsVUFBVUksWUFBWSxDQUFDO29CQUN4SyxJQUFJLENBQUNELFNBQVMsQ0FBQ0gsV0FBVyxPQUFPO29CQUNqQyxPQUFPO3dCQUFFTSxJQUFJTixVQUFVTSxFQUFFO3dCQUFFbkIsTUFBTWEsVUFBVWIsSUFBSTt3QkFBRUUsT0FBT1csVUFBVVgsS0FBSztvQkFBQztnQkFDNUU7Z0JBQ0EsSUFBSSxDQUFDSyxNQUFNVSxnQkFBZ0IsQ0FBRSxNQUFNM0IsdURBQWMsQ0FBQ1csWUFBWUksUUFBUSxFQUFFRSxLQUFLVSxZQUFZLEdBQUksT0FBTztnQkFDcEcsT0FBTztvQkFBRUUsSUFBSVosS0FBS1ksRUFBRTtvQkFBRW5CLE1BQU1PLEtBQUtQLElBQUk7b0JBQUVFLE9BQU9LLEtBQUtMLEtBQUs7b0JBQUVrQixPQUFPYixLQUFLYyxTQUFTO2dCQUFDO1lBQ3BGO1FBQ0o7V0FDSUMsUUFBUUMsR0FBRyxDQUFDQyxnQkFBZ0IsSUFBSUYsUUFBUUMsR0FBRyxDQUFDRSxvQkFBb0IsR0FDOUQ7WUFBQ3BDLHNFQUFjQSxDQUFDO2dCQUFFcUMsVUFBVUosUUFBUUMsR0FBRyxDQUFDQyxnQkFBZ0I7Z0JBQUVHLGNBQWNMLFFBQVFDLEdBQUcsQ0FBQ0Usb0JBQW9CO1lBQUM7U0FBRyxHQUM1RyxFQUFFO0tBQ1g7SUFDREcsV0FBVztRQUNQLE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFdkIsSUFBSSxFQUFFO1lBQ3JCLElBQUlBLE1BQU11QixNQUFNWCxFQUFFLEdBQUdaLEtBQUtZLEVBQUU7WUFDNUIsT0FBT1c7UUFDWDtRQUNBLE1BQU1uQyxTQUFRLEVBQUVBLE9BQU8sRUFBRW1DLEtBQUssRUFBRTtZQUM1QixJQUFJbkMsUUFBUVksSUFBSSxFQUFFWixRQUFRWSxJQUFJLENBQUNZLEVBQUUsR0FBR1ksT0FBT0QsTUFBTVgsRUFBRSxJQUFJVyxNQUFNRSxHQUFHO1lBQ2hFLE9BQU9yQztRQUNYO0lBQ0o7QUFDSixFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2tpbGxzd2FwLWZyb250ZW5kLy4vbGliL2F1dGgudHM/YmY3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFBZGFwdGVyIH0gZnJvbSAnQG5leHQtYXV0aC9wcmlzbWEtYWRhcHRlcidcclxuaW1wb3J0IHR5cGUgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnXHJcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHMnXHJcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZSdcclxuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcydcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnLi9wcmlzbWEnXHJcbmltcG9ydCB7IHJlYWRMb2NhbFVzZXJzIH0gZnJvbSAnLi9sb2NhbFVzZXJzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XHJcbiAgICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSksXHJcbiAgICBzZXNzaW9uOiB7IHN0cmF0ZWd5OiAnand0JyB9LFxyXG4gICAgcGFnZXM6IHsgc2lnbkluOiAnL2xvZ2luJyB9LFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XHJcbiAgICAgICAgICAgIG5hbWU6ICdFbWFpbCBhbmQgcGFzc3dvcmQnLFxyXG4gICAgICAgICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgICAgICAgICAgZW1haWw6IHsgbGFiZWw6ICdFbWFpbCcsIHR5cGU6ICdlbWFpbCcgfSxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiAnUGFzc3dvcmQnLCB0eXBlOiAncGFzc3dvcmQnIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzLnBhc3N3b3JkKSByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwudG9Mb3dlckNhc2UoKS50cmltKCkgfSB9KVxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NhbFVzZXIgPSByZWFkTG9jYWxVc2VycygpLmZpbmQoKGNhbmRpZGF0ZSkgPT4gY2FuZGlkYXRlLmVtYWlsLnRvTG93ZXJDYXNlKCkgPT09IGNyZWRlbnRpYWxzLmVtYWlsIS50b0xvd2VyQ2FzZSgpLnRyaW0oKSlcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWxpZCA9IGxvY2FsVXNlciAmJiAobG9jYWxVc2VyLnBhc3N3b3JkID09PSBjcmVkZW50aWFscy5wYXNzd29yZCB8fCAobG9jYWxVc2VyLnBhc3N3b3JkSGFzaCAmJiBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgbG9jYWxVc2VyLnBhc3N3b3JkSGFzaCkpKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdmFsaWQgfHwgIWxvY2FsVXNlcikgcmV0dXJuIG51bGxcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpZDogbG9jYWxVc2VyLmlkLCBuYW1lOiBsb2NhbFVzZXIubmFtZSwgZW1haWw6IGxvY2FsVXNlci5lbWFpbCB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXI/LnBhc3N3b3JkSGFzaCB8fCAhKGF3YWl0IGJjcnlwdC5jb21wYXJlKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkSGFzaCkpKSByZXR1cm4gbnVsbFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IHVzZXIuaWQsIG5hbWU6IHVzZXIubmFtZSwgZW1haWw6IHVzZXIuZW1haWwsIGltYWdlOiB1c2VyLmF2YXRhclVybCB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgLi4uKHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQgJiYgcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVRcclxuICAgICAgICAgICAgPyBbR29vZ2xlUHJvdmlkZXIoeyBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCwgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCB9KV1cclxuICAgICAgICAgICAgOiBbXSksXHJcbiAgICBdLFxyXG4gICAgY2FsbGJhY2tzOiB7XHJcbiAgICAgICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICAgICAgICBpZiAodXNlcikgdG9rZW4uaWQgPSB1c2VyLmlkXHJcbiAgICAgICAgICAgIHJldHVybiB0b2tlblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgICAgICAgaWYgKHNlc3Npb24udXNlcikgc2Vzc2lvbi51c2VyLmlkID0gU3RyaW5nKHRva2VuLmlkIHx8IHRva2VuLnN1YilcclxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb25cclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufVxyXG4iXSwibmFtZXMiOlsiUHJpc21hQWRhcHRlciIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJHb29nbGVQcm92aWRlciIsImJjcnlwdCIsInByaXNtYSIsInJlYWRMb2NhbFVzZXJzIiwiYXV0aE9wdGlvbnMiLCJhZGFwdGVyIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwicGFnZXMiLCJzaWduSW4iLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsInRvTG93ZXJDYXNlIiwidHJpbSIsImVycm9yIiwibG9jYWxVc2VyIiwiZmluZCIsImNhbmRpZGF0ZSIsInZhbGlkIiwicGFzc3dvcmRIYXNoIiwiY29tcGFyZSIsImlkIiwiaW1hZ2UiLCJhdmF0YXJVcmwiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0NMSUVOVF9JRCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwiY2xpZW50SWQiLCJjbGllbnRTZWNyZXQiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsIlN0cmluZyIsInN1YiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/localUsers.ts":
/*!***************************!*\
  !*** ./lib/localUsers.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   publicLocalUser: () => (/* binding */ publicLocalUser),\n/* harmony export */   readLocalUsers: () => (/* binding */ readLocalUsers),\n/* harmony export */   writeLocalUsers: () => (/* binding */ writeLocalUsers)\n/* harmony export */ });\n/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node:fs */ \"node:fs\");\n/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:path */ \"node:path\");\n/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst usersFile = node_path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), \"..\", \"backend\", \"data\", \"users.json\");\nfunction readLocalUsers() {\n    if (!node_fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(usersFile)) return [];\n    try {\n        return JSON.parse(node_fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(usersFile, \"utf8\"));\n    } catch  {\n        return [];\n    }\n}\nfunction writeLocalUsers(users) {\n    node_fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(node_path__WEBPACK_IMPORTED_MODULE_1___default().dirname(usersFile), {\n        recursive: true\n    });\n    node_fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(usersFile, JSON.stringify(users, null, 2));\n}\nfunction publicLocalUser(user) {\n    const { password, passwordHash, ...safeUser } = user;\n    return safeUser;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbG9jYWxVc2Vycy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXdCO0FBQ0k7QUFjNUIsTUFBTUUsWUFBWUQscURBQVMsQ0FBQ0csUUFBUUMsR0FBRyxJQUFJLE1BQU0sV0FBVyxRQUFRO0FBRTdELFNBQVNDO0lBQ1osSUFBSSxDQUFDTix5REFBYSxDQUFDRSxZQUFZLE9BQU8sRUFBRTtJQUN4QyxJQUFJO1FBQUUsT0FBT00sS0FBS0MsS0FBSyxDQUFDVCwyREFBZSxDQUFDRSxXQUFXO0lBQXdCLEVBQUUsT0FBTTtRQUFFLE9BQU8sRUFBRTtJQUFDO0FBQ25HO0FBRU8sU0FBU1MsZ0JBQWdCQyxLQUFrQjtJQUM5Q1osd0RBQVksQ0FBQ0Msd0RBQVksQ0FBQ0MsWUFBWTtRQUFFYSxXQUFXO0lBQUs7SUFDeERmLDREQUFnQixDQUFDRSxXQUFXTSxLQUFLUyxTQUFTLENBQUNMLE9BQU8sTUFBTTtBQUM1RDtBQUVPLFNBQVNNLGdCQUFnQkMsSUFBZTtJQUMzQyxNQUFNLEVBQUVDLFFBQVEsRUFBRUMsWUFBWSxFQUFFLEdBQUdDLFVBQVUsR0FBR0g7SUFDaEQsT0FBT0c7QUFDWCIsInNvdXJjZXMiOlsid2VicGFjazovL3NraWxsc3dhcC1mcm9udGVuZC8uL2xpYi9sb2NhbFVzZXJzLnRzPzgyMWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ25vZGU6ZnMnXHJcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcclxuXHJcbnR5cGUgTG9jYWxVc2VyID0ge1xyXG4gICAgaWQ6IHN0cmluZ1xyXG4gICAgbmFtZTogc3RyaW5nXHJcbiAgICBlbWFpbDogc3RyaW5nXHJcbiAgICBwYXNzd29yZD86IHN0cmluZ1xyXG4gICAgcGFzc3dvcmRIYXNoPzogc3RyaW5nXHJcbiAgICBza2lsbHM/OiBzdHJpbmdbXVxyXG4gICAgbG9va2luZ0Zvcj86IHN0cmluZ1tdXHJcbiAgICBiaW8/OiBzdHJpbmdcclxuICAgIFtrZXk6IHN0cmluZ106IHVua25vd25cclxufVxyXG5cclxuY29uc3QgdXNlcnNGaWxlID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICcuLicsICdiYWNrZW5kJywgJ2RhdGEnLCAndXNlcnMuanNvbicpXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVhZExvY2FsVXNlcnMoKTogTG9jYWxVc2VyW10ge1xyXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKHVzZXJzRmlsZSkpIHJldHVybiBbXVxyXG4gICAgdHJ5IHsgcmV0dXJuIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHVzZXJzRmlsZSwgJ3V0ZjgnKSkgYXMgTG9jYWxVc2VyW10gfSBjYXRjaCB7IHJldHVybiBbXSB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3cml0ZUxvY2FsVXNlcnModXNlcnM6IExvY2FsVXNlcltdKSB7XHJcbiAgICBmcy5ta2RpclN5bmMocGF0aC5kaXJuYW1lKHVzZXJzRmlsZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pXHJcbiAgICBmcy53cml0ZUZpbGVTeW5jKHVzZXJzRmlsZSwgSlNPTi5zdHJpbmdpZnkodXNlcnMsIG51bGwsIDIpKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHVibGljTG9jYWxVc2VyKHVzZXI6IExvY2FsVXNlcikge1xyXG4gICAgY29uc3QgeyBwYXNzd29yZCwgcGFzc3dvcmRIYXNoLCAuLi5zYWZlVXNlciB9ID0gdXNlclxyXG4gICAgcmV0dXJuIHNhZmVVc2VyXHJcbn1cclxuIl0sIm5hbWVzIjpbImZzIiwicGF0aCIsInVzZXJzRmlsZSIsImpvaW4iLCJwcm9jZXNzIiwiY3dkIiwicmVhZExvY2FsVXNlcnMiLCJleGlzdHNTeW5jIiwiSlNPTiIsInBhcnNlIiwicmVhZEZpbGVTeW5jIiwid3JpdGVMb2NhbFVzZXJzIiwidXNlcnMiLCJta2RpclN5bmMiLCJkaXJuYW1lIiwicmVjdXJzaXZlIiwid3JpdGVGaWxlU3luYyIsInN0cmluZ2lmeSIsInB1YmxpY0xvY2FsVXNlciIsInVzZXIiLCJwYXNzd29yZCIsInBhc3N3b3JkSGFzaCIsInNhZmVVc2VyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/localUsers.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxHQUFFO0FBRWxFLElBQUlJLElBQXlCLEVBQWNILGdCQUFnQkUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NraWxsc3dhcC1mcm9udGVuZC8uL2xpYi9wcmlzbWEudHM/OTgyMiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcclxuXHJcbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7IHByaXNtYT86IFByaXNtYUNsaWVudCB9XHJcblxyXG5leHBvcnQgY29uc3QgcHJpc21hID0gZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA/PyBuZXcgUHJpc21hQ2xpZW50KClcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hXHJcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cvishh%5COneDrive%5CDocuments%5Cswapskills%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cvishh%5COneDrive%5CDocuments%5Cswapskills%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();