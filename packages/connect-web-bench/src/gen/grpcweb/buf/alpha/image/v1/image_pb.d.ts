import * as jspb from 'google-protobuf'

import * as google_protobuf_descriptor_pb from 'google-protobuf/google/protobuf/descriptor_pb';


export class Image extends jspb.Message {
  getFileList(): Array<ImageFile>;
  setFileList(value: Array<ImageFile>): Image;
  clearFileList(): Image;
  addFile(value?: ImageFile, index?: number): ImageFile;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Image.AsObject;
  static toObject(includeInstance: boolean, msg: Image): Image.AsObject;
  static serializeBinaryToWriter(message: Image, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Image;
  static deserializeBinaryFromReader(message: Image, reader: jspb.BinaryReader): Image;
}

export namespace Image {
  export type AsObject = {
    fileList: Array<ImageFile.AsObject>,
  }
}

export class ImageFile extends jspb.Message {
  getName(): string;
  setName(value: string): ImageFile;
  hasName(): boolean;
  clearName(): ImageFile;

  getPackage(): string;
  setPackage(value: string): ImageFile;
  hasPackage(): boolean;
  clearPackage(): ImageFile;

  getDependencyList(): Array<string>;
  setDependencyList(value: Array<string>): ImageFile;
  clearDependencyList(): ImageFile;
  addDependency(value: string, index?: number): ImageFile;

  getPublicDependencyList(): Array<number>;
  setPublicDependencyList(value: Array<number>): ImageFile;
  clearPublicDependencyList(): ImageFile;
  addPublicDependency(value: number, index?: number): ImageFile;

  getWeakDependencyList(): Array<number>;
  setWeakDependencyList(value: Array<number>): ImageFile;
  clearWeakDependencyList(): ImageFile;
  addWeakDependency(value: number, index?: number): ImageFile;

  getMessageTypeList(): Array<google_protobuf_descriptor_pb.DescriptorProto>;
  setMessageTypeList(value: Array<google_protobuf_descriptor_pb.DescriptorProto>): ImageFile;
  clearMessageTypeList(): ImageFile;
  addMessageType(value?: google_protobuf_descriptor_pb.DescriptorProto, index?: number): google_protobuf_descriptor_pb.DescriptorProto;

  getEnumTypeList(): Array<google_protobuf_descriptor_pb.EnumDescriptorProto>;
  setEnumTypeList(value: Array<google_protobuf_descriptor_pb.EnumDescriptorProto>): ImageFile;
  clearEnumTypeList(): ImageFile;
  addEnumType(value?: google_protobuf_descriptor_pb.EnumDescriptorProto, index?: number): google_protobuf_descriptor_pb.EnumDescriptorProto;

  getServiceList(): Array<google_protobuf_descriptor_pb.ServiceDescriptorProto>;
  setServiceList(value: Array<google_protobuf_descriptor_pb.ServiceDescriptorProto>): ImageFile;
  clearServiceList(): ImageFile;
  addService(value?: google_protobuf_descriptor_pb.ServiceDescriptorProto, index?: number): google_protobuf_descriptor_pb.ServiceDescriptorProto;

  getExtensionList(): Array<google_protobuf_descriptor_pb.FieldDescriptorProto>;
  setExtensionList(value: Array<google_protobuf_descriptor_pb.FieldDescriptorProto>): ImageFile;
  clearExtensionList(): ImageFile;
  addExtension(value?: google_protobuf_descriptor_pb.FieldDescriptorProto, index?: number): google_protobuf_descriptor_pb.FieldDescriptorProto;

  getOptions(): google_protobuf_descriptor_pb.FileOptions | undefined;
  setOptions(value?: google_protobuf_descriptor_pb.FileOptions): ImageFile;
  hasOptions(): boolean;
  clearOptions(): ImageFile;

  getSourceCodeInfo(): google_protobuf_descriptor_pb.SourceCodeInfo | undefined;
  setSourceCodeInfo(value?: google_protobuf_descriptor_pb.SourceCodeInfo): ImageFile;
  hasSourceCodeInfo(): boolean;
  clearSourceCodeInfo(): ImageFile;

  getSyntax(): string;
  setSyntax(value: string): ImageFile;
  hasSyntax(): boolean;
  clearSyntax(): ImageFile;

  getBufExtension(): ImageFileExtension | undefined;
  setBufExtension(value?: ImageFileExtension): ImageFile;
  hasBufExtension(): boolean;
  clearBufExtension(): ImageFile;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ImageFile.AsObject;
  static toObject(includeInstance: boolean, msg: ImageFile): ImageFile.AsObject;
  static serializeBinaryToWriter(message: ImageFile, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ImageFile;
  static deserializeBinaryFromReader(message: ImageFile, reader: jspb.BinaryReader): ImageFile;
}

export namespace ImageFile {
  export type AsObject = {
    name?: string,
    pb_package?: string,
    dependencyList: Array<string>,
    publicDependencyList: Array<number>,
    weakDependencyList: Array<number>,
    messageTypeList: Array<google_protobuf_descriptor_pb.DescriptorProto.AsObject>,
    enumTypeList: Array<google_protobuf_descriptor_pb.EnumDescriptorProto.AsObject>,
    serviceList: Array<google_protobuf_descriptor_pb.ServiceDescriptorProto.AsObject>,
    extensionList: Array<google_protobuf_descriptor_pb.FieldDescriptorProto.AsObject>,
    options?: google_protobuf_descriptor_pb.FileOptions.AsObject,
    sourceCodeInfo?: google_protobuf_descriptor_pb.SourceCodeInfo.AsObject,
    syntax?: string,
    bufExtension?: ImageFileExtension.AsObject,
  }
}

export class ImageFileExtension extends jspb.Message {
  getIsImport(): boolean;
  setIsImport(value: boolean): ImageFileExtension;
  hasIsImport(): boolean;
  clearIsImport(): ImageFileExtension;

  getModuleInfo(): ModuleInfo | undefined;
  setModuleInfo(value?: ModuleInfo): ImageFileExtension;
  hasModuleInfo(): boolean;
  clearModuleInfo(): ImageFileExtension;

  getIsSyntaxUnspecified(): boolean;
  setIsSyntaxUnspecified(value: boolean): ImageFileExtension;
  hasIsSyntaxUnspecified(): boolean;
  clearIsSyntaxUnspecified(): ImageFileExtension;

  getUnusedDependencyList(): Array<number>;
  setUnusedDependencyList(value: Array<number>): ImageFileExtension;
  clearUnusedDependencyList(): ImageFileExtension;
  addUnusedDependency(value: number, index?: number): ImageFileExtension;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ImageFileExtension.AsObject;
  static toObject(includeInstance: boolean, msg: ImageFileExtension): ImageFileExtension.AsObject;
  static serializeBinaryToWriter(message: ImageFileExtension, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ImageFileExtension;
  static deserializeBinaryFromReader(message: ImageFileExtension, reader: jspb.BinaryReader): ImageFileExtension;
}

export namespace ImageFileExtension {
  export type AsObject = {
    isImport?: boolean,
    moduleInfo?: ModuleInfo.AsObject,
    isSyntaxUnspecified?: boolean,
    unusedDependencyList: Array<number>,
  }
}

export class ModuleInfo extends jspb.Message {
  getName(): ModuleName | undefined;
  setName(value?: ModuleName): ModuleInfo;
  hasName(): boolean;
  clearName(): ModuleInfo;

  getCommit(): string;
  setCommit(value: string): ModuleInfo;
  hasCommit(): boolean;
  clearCommit(): ModuleInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModuleInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ModuleInfo): ModuleInfo.AsObject;
  static serializeBinaryToWriter(message: ModuleInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModuleInfo;
  static deserializeBinaryFromReader(message: ModuleInfo, reader: jspb.BinaryReader): ModuleInfo;
}

export namespace ModuleInfo {
  export type AsObject = {
    name?: ModuleName.AsObject,
    commit?: string,
  }
}

export class ModuleName extends jspb.Message {
  getRemote(): string;
  setRemote(value: string): ModuleName;
  hasRemote(): boolean;
  clearRemote(): ModuleName;

  getOwner(): string;
  setOwner(value: string): ModuleName;
  hasOwner(): boolean;
  clearOwner(): ModuleName;

  getRepository(): string;
  setRepository(value: string): ModuleName;
  hasRepository(): boolean;
  clearRepository(): ModuleName;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModuleName.AsObject;
  static toObject(includeInstance: boolean, msg: ModuleName): ModuleName.AsObject;
  static serializeBinaryToWriter(message: ModuleName, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModuleName;
  static deserializeBinaryFromReader(message: ModuleName, reader: jspb.BinaryReader): ModuleName;
}

export namespace ModuleName {
  export type AsObject = {
    remote?: string,
    owner?: string,
    repository?: string,
  }
}

