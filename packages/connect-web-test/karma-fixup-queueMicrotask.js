(function () {
  if (typeof window.queueMicrotask === "function") {
    return;
  }

  globalThis.queueMicrotask = (callback) =>
    typeof Promise === "function" && typeof Promise.resolve === "function"
      ? Promise.resolve().then(callback)
      : setTimeout(callback, 0);
})();
