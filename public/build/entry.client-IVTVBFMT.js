import {
  require_client
} from "/build/_shared/chunk-O4BRYNJ4.js";
import {
  RemixBrowser
} from "/build/_shared/chunk-NRLAK5V2.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  createHotContext
} from "/build/_shared/chunk-AVSXP26Q.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/entry.client.tsx
var import_react2 = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\entry.client.tsx"
  );
  import.meta.hot.lastModified = "1745788766067.2634";
}
var container = document.getElementById("root");
console.log("\u{1F525} entry.client.tsx is running");
if (container) {
  (0, import_react2.startTransition)(() => {
    (0, import_client.hydrateRoot)(
      container,
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react2.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RemixBrowser, {}, void 0, false, {
        fileName: "app/entry.client.tsx",
        lineNumber: 31,
        columnNumber: 9
      }, this) }, void 0, false, {
        fileName: "app/entry.client.tsx",
        lineNumber: 30,
        columnNumber: 7
      }, this)
    );
  });
}
//# sourceMappingURL=/build/entry.client-IVTVBFMT.js.map
