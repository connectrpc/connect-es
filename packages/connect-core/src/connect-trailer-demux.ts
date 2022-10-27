// Copyright 2021-2022 Buf Technologies, Inc.
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
 * In unary RPCs, Connect transports trailing metadata as response header
 * fields, prefixed with "trailer-".
 *
 * This function demuxes headers and trailers into two separate Headers
 * objects.
 */
export function connectTrailerDemux(
  header: Headers
): [header: Headers, trailer: Headers] {
  const h = new Headers(),
    t = new Headers();
  header.forEach((value, key) => {
    if (key.toLowerCase().startsWith("trailer-")) {
      t.set(key.substring(8), value);
    } else {
      h.set(key, value);
    }
  });
  return [h, t];
}
