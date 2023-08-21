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

import path from "node:path";
import { createWriteStream, existsSync, WriteStream } from "node:fs";

export class Logger {
  private logfileStream: WriteStream | undefined;
  private logfilePath: string | undefined;
  private buffer: string[] = [];

  error(message: string): void {
    const stream = this.getWriteStreamAndClearBuffer();
    stream.write(message);
    stream.write("\n");
  }

  log(message: string): void {
    if (this.logfileStream !== undefined) {
      this.logfileStream.write(message);
      this.logfileStream.write("\n");
    } else {
      this.buffer.push(message);
    }
  }

  close(): Promise<string> {
    const stream = this.getWriteStreamAndClearBuffer();
    return new Promise<string>((resolve) => {
      stream.close(() => {
        resolve(this.logfilePath ?? "");
      });
    });
  }

  private getWriteStreamAndClearBuffer() {
    if (this.logfileStream !== undefined) {
      return this.logfileStream;
    }
    const timestamp = new Date()
      .toISOString()
      .replace(/T/, "_")
      .replace(/:/g, "")
      .replace(/\..+/, "");
    let logfilePath: string;
    for (let i = 0; ; i++) {
      logfilePath = path.join(
        process.cwd(),
        i === 0
          ? `connect-migrate-${timestamp}.log`
          : `connect-migrate-${timestamp}-${i}.log`,
      );
      if (!existsSync(logfilePath)) {
        break;
      }
    }
    this.logfileStream = createWriteStream(logfilePath, {
      encoding: "utf-8",
    });
    this.logfilePath = logfilePath;
    for (const message of this.buffer) {
      this.logfileStream.write(message);
      this.logfileStream.write("\n");
    }
    this.buffer.splice(0);
    return this.logfileStream;
  }
}
