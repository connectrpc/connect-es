// Copyright 2021-2025 The Connect Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import j from "jscodeshift";

const importPath = "@connectrpc/connect";
const fromFunction = "createPromiseClient";
const toFunction = "createClient";
const fromType = "PromiseClient";
const toType = "Client";

/**
 * This transform handles changing all usages of `createPromiseClient` to `createClient`.
 */
const transform: j.Transform = (file, { j }, options) => {
  const root = j(file.source);
  // import { createPromiseClient [as <local>]) } from "@connectrpc/connect";
  root
    .find(j.ImportDeclaration, {
      source: { value: importPath },
      specifiers: [
        {
          type: "ImportSpecifier",
        },
      ],
    })
    .forEach((path) => {
      path.value.specifiers?.forEach((s) => {
        s = s as j.ImportSpecifier;
        if (![fromFunction, fromType].includes(s.imported.name)) {
          return;
        }
        // import { createPromiseClient as <local> } from "@connectrpc/connect";
        //
        // We should just rename createPromiseClient here and user code will continue to use local.
        if (s.local?.loc !== s.imported.loc) {
          s.imported.name = s.imported.name === fromType ? toType : toFunction;
          return;
        }
        replace(
          root,
          s.imported.name,
          s.imported.name === fromType ? toType : toFunction,
        );
      });
    });
  // import * as connect from "@connectrpc/connect";
  // import connect from "@connectrpc/connect";
  root
    .find(j.ImportDeclaration, {
      source: { value: importPath },
      specifiers: (s) =>
        s?.some(
          (v) =>
            v.type === "ImportNamespaceSpecifier" ||
            v.type === "ImportDefaultSpecifier",
        ) ?? false,
    })
    .forEach((path) => {
      path.value.specifiers?.forEach((s) => {
        s = s as j.ImportNamespaceSpecifier | j.ImportDefaultSpecifier;
        const qualifier = s.local?.name;
        if (qualifier === undefined) {
          return;
        }
        replace(root, fromType, toType, qualifier);
        replace(root, fromFunction, toFunction, qualifier);
      });
    });
  // require("@connectrpc/connect")
  const requireCall = {
    callee: {
      type: "Identifier",
      name: "require",
    },
    arguments: [
      {
        type: "StringLiteral",
        value: importPath,
      },
    ],
  } as const;
  // const ... = require("@connectrpc/connect");
  root.find(j.VariableDeclarator, { init: requireCall }).forEach((path) => {
    // const connect = require("@connectrpc/connect");
    if (path.value.id.type === "Identifier") {
      replace(root, fromType, toType, path.value.id.name);
      replace(root, fromFunction, toFunction, path.value.id.name);
      return;
    }
    // const { createPromiseClient[:local] } = require("@connectrpc/connect");
    if (path.value.id.type === "ObjectPattern") {
      const property = path.value.id.properties.find(
        (p) =>
          p.type === "ObjectProperty" &&
          p.key.type === "Identifier" &&
          p.key.name === fromFunction,
      ) as (j.ObjectProperty & { key: j.Identifier }) | undefined;
      if (property !== undefined) {
        if (property.value.loc?.start === property.key.loc?.start) {
          // const { createPromiseClient } = require("@connectrpc/connect");
          replace(root, fromFunction, toFunction);
        } else {
          // const { createPromiseClient: local } = require("@connectrpc/connect");
          property.key.name = toFunction;
        }
      }
    }
  });
  // let connect;
  // connect = require("@connectrpc/connect");
  root.find(j.AssignmentExpression, { right: requireCall }).forEach((path) => {
    if (path.value.left.type === "Identifier") {
      replace(root, fromType, toType, path.value.left.name);
      replace(root, fromFunction, toFunction, path.value.left.name);
      return;
    }
  });
  return root.toSource(options);
};

function replace(
  root: j.Collection<unknown>,
  from: string,
  to: string,
  qualifier?: string,
) {
  if (qualifier === undefined) {
    root
      .find(j.Identifier, { name: from })
      .forEach((path) => (path.value.name = to));
    return;
  }
  // connect.createPromiseClient
  root
    .find(j.MemberExpression, {
      object: { type: "Identifier", name: qualifier },
      property: { type: "Identifier", name: from },
    })
    .forEach((path) => {
      (path.value.property as j.Identifier).name = to;
    });
  // typeof connect.createPromiseClient
  root
    .find(j.TSQualifiedName, {
      left: { type: "Identifier", name: qualifier },
      right: { type: "Identifier", name: from },
    })
    .forEach((path) => {
      (path.value.right as j.Identifier).name = to;
    });
}

export default transform;
