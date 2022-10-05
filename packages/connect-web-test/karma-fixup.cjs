const path = require("path");

// This is a plugin for the test runner karma that injects some polyfills.
// http://karma-runner.github.io/6.3/dev/plugins.html

function fixupFactory(files) {
  files.unshift({
    pattern: path.join(__dirname, "/karma-fixup-globalThis.js"),
    included: true, served: true, watched: false
  }, {
    pattern: path.join(__dirname, "/karma-fixup-AbortController.js"),
    included: true, served: true, watched: false
  }, {
    pattern: path.join(__dirname, "/karma-fixup-queueMicrotask.js"),
    included: true, served: true, watched: false
  });
}

fixupFactory.$inject = ["config.files"];

module.exports = {
  "framework:fixup": ["factory", fixupFactory]
};
