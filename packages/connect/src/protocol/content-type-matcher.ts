// Copyright 2021-2023 Buf Technologies, Inc.
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

/**
 * A function that returns true if a given mime type is supported.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export interface ContentTypeMatcher {
  (contentType: string | null): boolean;
  supported: RegExp[];
}

const contentTypeMatcherCacheSize = 1024;

/**
 * Create a function that returns true if the given mime type is supported.
 * A mime type is supported when one of the regular expressions match.
 *
 * @private Internal code, does not follow semantic versioning.
 */
export function contentTypeMatcher(
  ...supported: (RegExp | Pick<ContentTypeMatcher, "supported">)[]
): ContentTypeMatcher {
  const cache = new Map<string, boolean>();
  const source = supported.reduce(
    (previousValue: RegExp[], currentValue) =>
      previousValue.concat(
        "supported" in currentValue ? currentValue.supported : currentValue,
      ),
    [],
  );
  function match(contentType: string | null): boolean {
    if (contentType === null || contentType.length == 0) {
      return false;
    }
    const cached = cache.get(contentType);
    if (cached !== undefined) {
      return cached;
    }
    const ok = source.some((re) => re.test(contentType));
    if (cache.size < contentTypeMatcherCacheSize) {
      cache.set(contentType, ok);
    }
    return ok;
  }
  match.supported = source;
  return match;
}
