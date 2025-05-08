import {
  __esm
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/@supabase/node-fetch/browser.js
var getGlobal, globalObject, fetch, browser_default, Headers, Request, Response;
var init_browser = __esm({
  "node_modules/@supabase/node-fetch/browser.js"() {
    getGlobal = function() {
      if (typeof self !== "undefined") {
        return self;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof globalThis !== "undefined") {
        return globalThis;
      }
      throw new Error("unable to locate global object");
    };
    globalObject = getGlobal();
    fetch = globalObject.fetch;
    browser_default = globalObject.fetch.bind(globalObject);
    Headers = globalObject.Headers;
    Request = globalObject.Request;
    Response = globalObject.Response;
  }
});
init_browser();
export {
  Headers,
  Request,
  Response,
  browser_default as default,
  fetch
};
//# sourceMappingURL=/build/_shared/browser-HYQ6SH4Q.js.map
