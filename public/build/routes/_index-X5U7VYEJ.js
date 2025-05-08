import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  useFetcher,
  useLoaderData
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
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// empty-module:~/utils/supabase.server
var require_supabase = __commonJS({
  "empty-module:~/utils/supabase.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/_index.tsx
var import_react3 = __toESM(require_react(), 1);
var import_supabase = __toESM(require_supabase(), 1);

// app/components/Column.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\Column.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\Column.tsx"
  );
  import.meta.hot.lastModified = "1745792337341.867";
}
function Column({
  task,
  onClick
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { onClick: () => onClick(task), className: "cursor-pointer p-3 bg-gray-200 dark:bg-gray-700 rounded-lg shadow", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { className: "block text-gray-900 dark:text-white", children: task.title }, void 0, false, {
      fileName: "app/components/Column.tsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600 dark:text-gray-300 text-sm", children: task.description }, void 0, false, {
      fileName: "app/components/Column.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Column.tsx",
    lineNumber: 25,
    columnNumber: 10
  }, this);
}
_c = Column;
var _c;
$RefreshReg$(_c, "Column");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/TaskModal.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\components\\\\TaskModal.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\components\\TaskModal.tsx"
  );
  import.meta.hot.lastModified = "1745793360677.0984";
}
function TaskModal({
  task,
  columns,
  onClose
}) {
  _s();
  const [title, setTitle] = (0, import_react.useState)(task.title);
  const [description, setDescription] = (0, import_react.useState)(task.description);
  const [columnId, setColumnId] = (0, import_react.useState)(task.column_id);
  const [startDate, setStartDate] = (0, import_react.useState)(task.start_date);
  const [endDate, setEndDate] = (0, import_react.useState)(task.end_date);
  const fetcher = useFetcher();
  function handleSave() {
    const formData = new FormData();
    formData.append("id", task.id.toString());
    formData.append("title", title);
    formData.append("description", description);
    formData.append("column_id", columnId.toString());
    formData.append("start_date", startDate ?? "");
    formData.append("end_date", endDate ?? "");
    fetcher.submit(formData, {
      method: "POST",
      action: "/"
      // or action: ".", if you're already inside the _index route
    });
    console.log({
      id: task.id,
      title,
      description,
      column_id: columnId,
      start_date: startDate,
      end_date: endDate
    });
    onClose();
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4 shadow-xl", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white mb-4", children: "Edit Task" }, void 0, false, {
      fileName: "app/components/TaskModal.tsx",
      lineNumber: 84,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 dark:text-gray-300 text-sm font-medium", children: "Title" }, void 0, false, {
        fileName: "app/components/TaskModal.tsx",
        lineNumber: 87,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { className: "w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white", value: title, onChange: (e) => setTitle(e.target.value) }, void 0, false, {
        fileName: "app/components/TaskModal.tsx",
        lineNumber: 88,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 dark:text-gray-300 text-sm font-medium", children: "Description" }, void 0, false, {
        fileName: "app/components/TaskModal.tsx",
        lineNumber: 90,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("textarea", { className: "w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white", value: description, onChange: (e) => setDescription(e.target.value) }, void 0, false, {
        fileName: "app/components/TaskModal.tsx",
        lineNumber: 91,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 dark:text-gray-300 text-sm font-medium", children: "Column" }, void 0, false, {
        fileName: "app/components/TaskModal.tsx",
        lineNumber: 93,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("select", { className: "w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white", value: columnId, onChange: (e) => setColumnId(Number(e.target.value)), children: columns.map((col) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: col.id, children: col.title }, col.id, false, {
        fileName: "app/components/TaskModal.tsx",
        lineNumber: 95,
        columnNumber: 33
      }, this)) }, void 0, false, {
        fileName: "app/components/TaskModal.tsx",
        lineNumber: 94,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 dark:text-gray-300 text-sm font-medium", children: "Start Date" }, void 0, false, {
        fileName: "app/components/TaskModal.tsx",
        lineNumber: 100,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "date", className: "w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white", value: task.start_date ? task.start_date.split("T")[0] : "", onChange: (e) => setStartDate(e.target.value) }, void 0, false, {
        fileName: "app/components/TaskModal.tsx",
        lineNumber: 101,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { className: "block text-gray-700 dark:text-gray-300 text-sm font-medium", children: "End Date" }, void 0, false, {
        fileName: "app/components/TaskModal.tsx",
        lineNumber: 103,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { type: "date", className: "w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white", value: task.end_date ? task.end_date.split("T")[0] : "", onChange: (e) => setEndDate(e.target.value) }, void 0, false, {
        fileName: "app/components/TaskModal.tsx",
        lineNumber: 104,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/TaskModal.tsx",
      lineNumber: 86,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex justify-end space-x-2 mt-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { className: "px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded", onClick: onClose, children: "Cancel" }, void 0, false, {
        fileName: "app/components/TaskModal.tsx",
        lineNumber: 108,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", onClick: handleSave, children: "Save" }, void 0, false, {
        fileName: "app/components/TaskModal.tsx",
        lineNumber: 111,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/TaskModal.tsx",
      lineNumber: 107,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/TaskModal.tsx",
    lineNumber: 83,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/TaskModal.tsx",
    lineNumber: 82,
    columnNumber: 10
  }, this);
}
_s(TaskModal, "UlfwuIIVNnSOoQFbsp9eGqG1m+c=", false, function() {
  return [useFetcher];
});
_c2 = TaskModal;
var _c2;
$RefreshReg$(_c2, "TaskModal");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/_index.tsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_index.tsx"
  );
  import.meta.hot.lastModified = "1745792880725.2722";
}
function Index() {
  _s2();
  const {
    columns,
    tasks
  } = useLoaderData();
  const [selectedTask, setSelectedTask] = (0, import_react3.useState)(null);
  (0, import_react3.useEffect)(() => {
    console.log("Selected task is:", selectedTask);
  }, [selectedTask]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex justify-center gap-6 p-6", children: [
    columns.map((column) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "w-72 min-h-[300px] bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-lg", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h3", { className: "text-center font-semibold text-lg mb-4", children: column.title }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 102,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("ul", { className: "space-y-4", children: tasks.filter((task) => task.column_id === column.id).map((task) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Column, { task, onClick: setSelectedTask }, task.id, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 104,
        columnNumber: 75
      }, this)) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 103,
        columnNumber: 11
      }, this)
    ] }, column.id, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 101,
      columnNumber: 30
    }, this)),
    selectedTask && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
      TaskModal,
      {
        task: selectedTask,
        columns,
        onClose: () => setSelectedTask(null)
      },
      void 0,
      false,
      {
        fileName: "app/routes/_index.tsx",
        lineNumber: 108,
        columnNumber: 22
      },
      this
    )
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 100,
    columnNumber: 10
  }, this);
}
_s2(Index, "NmaEFh75TXzDW2y1Dg6SFyjvwio=", false, function() {
  return [useLoaderData];
});
_c3 = Index;
var _c3;
$RefreshReg$(_c3, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default
};
//# sourceMappingURL=/build/routes/_index-X5U7VYEJ.js.map
