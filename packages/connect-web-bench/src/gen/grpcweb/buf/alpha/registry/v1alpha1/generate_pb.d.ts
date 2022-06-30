import * as jspb from 'google-protobuf'

import * as google_protobuf_compiler_plugin_pb from 'google-protobuf/google/protobuf/compiler/plugin_pb';
import * as buf_alpha_image_v1_image_pb from '../../../../buf/alpha/image/v1/image_pb';


export class File extends jspb.Message {
  getPath(): string;
  setPath(value: string): File;

  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): File;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): File.AsObject;
  static toObject(includeInstance: boolean, msg: File): File.AsObject;
  static serializeBinaryToWriter(message: File, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): File;
  static deserializeBinaryFromReader(message: File, reader: jspb.BinaryReader): File;
}

export namespace File {
  export type AsObject = {
    path: string,
    content: Uint8Array | string,
  }
}

export class RuntimeLibrary extends jspb.Message {
  getName(): string;
  setName(value: string): RuntimeLibrary;

  getVersion(): string;
  setVersion(value: string): RuntimeLibrary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RuntimeLibrary.AsObject;
  static toObject(includeInstance: boolean, msg: RuntimeLibrary): RuntimeLibrary.AsObject;
  static serializeBinaryToWriter(message: RuntimeLibrary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RuntimeLibrary;
  static deserializeBinaryFromReader(message: RuntimeLibrary, reader: jspb.BinaryReader): RuntimeLibrary;
}

export namespace RuntimeLibrary {
  export type AsObject = {
    name: string,
    version: string,
  }
}

export class PluginReference extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): PluginReference;

  getName(): string;
  setName(value: string): PluginReference;

  getVersion(): string;
  setVersion(value: string): PluginReference;

  getParametersList(): Array<string>;
  setParametersList(value: Array<string>): PluginReference;
  clearParametersList(): PluginReference;
  addParameters(value: string, index?: number): PluginReference;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PluginReference.AsObject;
  static toObject(includeInstance: boolean, msg: PluginReference): PluginReference.AsObject;
  static serializeBinaryToWriter(message: PluginReference, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PluginReference;
  static deserializeBinaryFromReader(message: PluginReference, reader: jspb.BinaryReader): PluginReference;
}

export namespace PluginReference {
  export type AsObject = {
    owner: string,
    name: string,
    version: string,
    parametersList: Array<string>,
  }
}

export class GeneratePluginsRequest extends jspb.Message {
  getImage(): buf_alpha_image_v1_image_pb.Image | undefined;
  setImage(value?: buf_alpha_image_v1_image_pb.Image): GeneratePluginsRequest;
  hasImage(): boolean;
  clearImage(): GeneratePluginsRequest;

  getPluginsList(): Array<PluginReference>;
  setPluginsList(value: Array<PluginReference>): GeneratePluginsRequest;
  clearPluginsList(): GeneratePluginsRequest;
  addPlugins(value?: PluginReference, index?: number): PluginReference;

  getIncludeImports(): boolean;
  setIncludeImports(value: boolean): GeneratePluginsRequest;

  getIncludeWellKnownTypes(): boolean;
  setIncludeWellKnownTypes(value: boolean): GeneratePluginsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GeneratePluginsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GeneratePluginsRequest): GeneratePluginsRequest.AsObject;
  static serializeBinaryToWriter(message: GeneratePluginsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GeneratePluginsRequest;
  static deserializeBinaryFromReader(message: GeneratePluginsRequest, reader: jspb.BinaryReader): GeneratePluginsRequest;
}

export namespace GeneratePluginsRequest {
  export type AsObject = {
    image?: buf_alpha_image_v1_image_pb.Image.AsObject,
    pluginsList: Array<PluginReference.AsObject>,
    includeImports: boolean,
    includeWellKnownTypes: boolean,
  }
}

export class GeneratePluginsResponse extends jspb.Message {
  getResponsesList(): Array<google_protobuf_compiler_plugin_pb.CodeGeneratorResponse>;
  setResponsesList(value: Array<google_protobuf_compiler_plugin_pb.CodeGeneratorResponse>): GeneratePluginsResponse;
  clearResponsesList(): GeneratePluginsResponse;
  addResponses(value?: google_protobuf_compiler_plugin_pb.CodeGeneratorResponse, index?: number): google_protobuf_compiler_plugin_pb.CodeGeneratorResponse;

  getRuntimeLibrariesList(): Array<RuntimeLibrary>;
  setRuntimeLibrariesList(value: Array<RuntimeLibrary>): GeneratePluginsResponse;
  clearRuntimeLibrariesList(): GeneratePluginsResponse;
  addRuntimeLibraries(value?: RuntimeLibrary, index?: number): RuntimeLibrary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GeneratePluginsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GeneratePluginsResponse): GeneratePluginsResponse.AsObject;
  static serializeBinaryToWriter(message: GeneratePluginsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GeneratePluginsResponse;
  static deserializeBinaryFromReader(message: GeneratePluginsResponse, reader: jspb.BinaryReader): GeneratePluginsResponse;
}

export namespace GeneratePluginsResponse {
  export type AsObject = {
    responsesList: Array<google_protobuf_compiler_plugin_pb.CodeGeneratorResponse.AsObject>,
    runtimeLibrariesList: Array<RuntimeLibrary.AsObject>,
  }
}

export class GenerateTemplateRequest extends jspb.Message {
  getImage(): buf_alpha_image_v1_image_pb.Image | undefined;
  setImage(value?: buf_alpha_image_v1_image_pb.Image): GenerateTemplateRequest;
  hasImage(): boolean;
  clearImage(): GenerateTemplateRequest;

  getTemplateOwner(): string;
  setTemplateOwner(value: string): GenerateTemplateRequest;

  getTemplateName(): string;
  setTemplateName(value: string): GenerateTemplateRequest;

  getTemplateVersion(): string;
  setTemplateVersion(value: string): GenerateTemplateRequest;

  getIncludeImports(): boolean;
  setIncludeImports(value: boolean): GenerateTemplateRequest;

  getIncludeWellKnownTypes(): boolean;
  setIncludeWellKnownTypes(value: boolean): GenerateTemplateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenerateTemplateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GenerateTemplateRequest): GenerateTemplateRequest.AsObject;
  static serializeBinaryToWriter(message: GenerateTemplateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenerateTemplateRequest;
  static deserializeBinaryFromReader(message: GenerateTemplateRequest, reader: jspb.BinaryReader): GenerateTemplateRequest;
}

export namespace GenerateTemplateRequest {
  export type AsObject = {
    image?: buf_alpha_image_v1_image_pb.Image.AsObject,
    templateOwner: string,
    templateName: string,
    templateVersion: string,
    includeImports: boolean,
    includeWellKnownTypes: boolean,
  }
}

export class GenerateTemplateResponse extends jspb.Message {
  getFilesList(): Array<File>;
  setFilesList(value: Array<File>): GenerateTemplateResponse;
  clearFilesList(): GenerateTemplateResponse;
  addFiles(value?: File, index?: number): File;

  getRuntimeLibrariesList(): Array<RuntimeLibrary>;
  setRuntimeLibrariesList(value: Array<RuntimeLibrary>): GenerateTemplateResponse;
  clearRuntimeLibrariesList(): GenerateTemplateResponse;
  addRuntimeLibraries(value?: RuntimeLibrary, index?: number): RuntimeLibrary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenerateTemplateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GenerateTemplateResponse): GenerateTemplateResponse.AsObject;
  static serializeBinaryToWriter(message: GenerateTemplateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenerateTemplateResponse;
  static deserializeBinaryFromReader(message: GenerateTemplateResponse, reader: jspb.BinaryReader): GenerateTemplateResponse;
}

export namespace GenerateTemplateResponse {
  export type AsObject = {
    filesList: Array<File.AsObject>,
    runtimeLibrariesList: Array<RuntimeLibrary.AsObject>,
  }
}

