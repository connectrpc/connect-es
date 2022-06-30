import * as jspb from 'google-protobuf'

import * as buf_alpha_breaking_v1_config_pb from '../../../../buf/alpha/breaking/v1/config_pb';
import * as buf_alpha_lint_v1_config_pb from '../../../../buf/alpha/lint/v1/config_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class Module extends jspb.Message {
  getFilesList(): Array<ModuleFile>;
  setFilesList(value: Array<ModuleFile>): Module;
  clearFilesList(): Module;
  addFiles(value?: ModuleFile, index?: number): ModuleFile;

  getDependenciesList(): Array<ModulePin>;
  setDependenciesList(value: Array<ModulePin>): Module;
  clearDependenciesList(): Module;
  addDependencies(value?: ModulePin, index?: number): ModulePin;

  getDocumentation(): string;
  setDocumentation(value: string): Module;

  getBreakingConfig(): buf_alpha_breaking_v1_config_pb.Config | undefined;
  setBreakingConfig(value?: buf_alpha_breaking_v1_config_pb.Config): Module;
  hasBreakingConfig(): boolean;
  clearBreakingConfig(): Module;

  getLintConfig(): buf_alpha_lint_v1_config_pb.Config | undefined;
  setLintConfig(value?: buf_alpha_lint_v1_config_pb.Config): Module;
  hasLintConfig(): boolean;
  clearLintConfig(): Module;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Module.AsObject;
  static toObject(includeInstance: boolean, msg: Module): Module.AsObject;
  static serializeBinaryToWriter(message: Module, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Module;
  static deserializeBinaryFromReader(message: Module, reader: jspb.BinaryReader): Module;
}

export namespace Module {
  export type AsObject = {
    filesList: Array<ModuleFile.AsObject>,
    dependenciesList: Array<ModulePin.AsObject>,
    documentation: string,
    breakingConfig?: buf_alpha_breaking_v1_config_pb.Config.AsObject,
    lintConfig?: buf_alpha_lint_v1_config_pb.Config.AsObject,
  }
}

export class ModuleFile extends jspb.Message {
  getPath(): string;
  setPath(value: string): ModuleFile;

  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): ModuleFile;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModuleFile.AsObject;
  static toObject(includeInstance: boolean, msg: ModuleFile): ModuleFile.AsObject;
  static serializeBinaryToWriter(message: ModuleFile, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModuleFile;
  static deserializeBinaryFromReader(message: ModuleFile, reader: jspb.BinaryReader): ModuleFile;
}

export namespace ModuleFile {
  export type AsObject = {
    path: string,
    content: Uint8Array | string,
  }
}

export class ModuleReference extends jspb.Message {
  getRemote(): string;
  setRemote(value: string): ModuleReference;

  getOwner(): string;
  setOwner(value: string): ModuleReference;

  getRepository(): string;
  setRepository(value: string): ModuleReference;

  getReference(): string;
  setReference(value: string): ModuleReference;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModuleReference.AsObject;
  static toObject(includeInstance: boolean, msg: ModuleReference): ModuleReference.AsObject;
  static serializeBinaryToWriter(message: ModuleReference, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModuleReference;
  static deserializeBinaryFromReader(message: ModuleReference, reader: jspb.BinaryReader): ModuleReference;
}

export namespace ModuleReference {
  export type AsObject = {
    remote: string,
    owner: string,
    repository: string,
    reference: string,
  }
}

export class ModulePin extends jspb.Message {
  getRemote(): string;
  setRemote(value: string): ModulePin;

  getOwner(): string;
  setOwner(value: string): ModulePin;

  getRepository(): string;
  setRepository(value: string): ModulePin;

  getBranch(): string;
  setBranch(value: string): ModulePin;

  getCommit(): string;
  setCommit(value: string): ModulePin;

  getDigest(): string;
  setDigest(value: string): ModulePin;

  getCreateTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreateTime(value?: google_protobuf_timestamp_pb.Timestamp): ModulePin;
  hasCreateTime(): boolean;
  clearCreateTime(): ModulePin;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModulePin.AsObject;
  static toObject(includeInstance: boolean, msg: ModulePin): ModulePin.AsObject;
  static serializeBinaryToWriter(message: ModulePin, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModulePin;
  static deserializeBinaryFromReader(message: ModulePin, reader: jspb.BinaryReader): ModulePin;
}

export namespace ModulePin {
  export type AsObject = {
    remote: string,
    owner: string,
    repository: string,
    branch: string,
    commit: string,
    digest: string,
    createTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

