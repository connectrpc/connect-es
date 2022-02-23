import * as jspb from 'google-protobuf'



export class Config extends jspb.Message {
  getVersion(): string;
  setVersion(value: string): Config;

  getUseIdsList(): Array<string>;
  setUseIdsList(value: Array<string>): Config;
  clearUseIdsList(): Config;
  addUseIds(value: string, index?: number): Config;

  getExceptIdsList(): Array<string>;
  setExceptIdsList(value: Array<string>): Config;
  clearExceptIdsList(): Config;
  addExceptIds(value: string, index?: number): Config;

  getIgnorePathsList(): Array<string>;
  setIgnorePathsList(value: Array<string>): Config;
  clearIgnorePathsList(): Config;
  addIgnorePaths(value: string, index?: number): Config;

  getIgnoreIdPathsList(): Array<IDPaths>;
  setIgnoreIdPathsList(value: Array<IDPaths>): Config;
  clearIgnoreIdPathsList(): Config;
  addIgnoreIdPaths(value?: IDPaths, index?: number): IDPaths;

  getIgnoreUnstablePackages(): boolean;
  setIgnoreUnstablePackages(value: boolean): Config;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Config.AsObject;
  static toObject(includeInstance: boolean, msg: Config): Config.AsObject;
  static serializeBinaryToWriter(message: Config, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Config;
  static deserializeBinaryFromReader(message: Config, reader: jspb.BinaryReader): Config;
}

export namespace Config {
  export type AsObject = {
    version: string,
    useIdsList: Array<string>,
    exceptIdsList: Array<string>,
    ignorePathsList: Array<string>,
    ignoreIdPathsList: Array<IDPaths.AsObject>,
    ignoreUnstablePackages: boolean,
  }
}

export class IDPaths extends jspb.Message {
  getId(): string;
  setId(value: string): IDPaths;

  getPathsList(): Array<string>;
  setPathsList(value: Array<string>): IDPaths;
  clearPathsList(): IDPaths;
  addPaths(value: string, index?: number): IDPaths;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IDPaths.AsObject;
  static toObject(includeInstance: boolean, msg: IDPaths): IDPaths.AsObject;
  static serializeBinaryToWriter(message: IDPaths, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IDPaths;
  static deserializeBinaryFromReader(message: IDPaths, reader: jspb.BinaryReader): IDPaths;
}

export namespace IDPaths {
  export type AsObject = {
    id: string,
    pathsList: Array<string>,
  }
}

