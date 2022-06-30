import * as jspb from 'google-protobuf'



export class BufAlphaRegistryV1Alpha1PluginVersionMapping extends jspb.Message {
  getPluginOwner(): string;
  setPluginOwner(value: string): BufAlphaRegistryV1Alpha1PluginVersionMapping;

  getPluginName(): string;
  setPluginName(value: string): BufAlphaRegistryV1Alpha1PluginVersionMapping;

  getVersion(): string;
  setVersion(value: string): BufAlphaRegistryV1Alpha1PluginVersionMapping;

  getDeleted(): boolean;
  setDeleted(value: boolean): BufAlphaRegistryV1Alpha1PluginVersionMapping;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BufAlphaRegistryV1Alpha1PluginVersionMapping.AsObject;
  static toObject(includeInstance: boolean, msg: BufAlphaRegistryV1Alpha1PluginVersionMapping): BufAlphaRegistryV1Alpha1PluginVersionMapping.AsObject;
  static serializeBinaryToWriter(message: BufAlphaRegistryV1Alpha1PluginVersionMapping, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BufAlphaRegistryV1Alpha1PluginVersionMapping;
  static deserializeBinaryFromReader(message: BufAlphaRegistryV1Alpha1PluginVersionMapping, reader: jspb.BinaryReader): BufAlphaRegistryV1Alpha1PluginVersionMapping;
}

export namespace BufAlphaRegistryV1Alpha1PluginVersionMapping {
  export type AsObject = {
    pluginOwner: string,
    pluginName: string,
    version: string,
    deleted: boolean,
  }
}

export class BufAlphaRegistryV1Alpha1PluginConfig extends jspb.Message {
  getPluginOwner(): string;
  setPluginOwner(value: string): BufAlphaRegistryV1Alpha1PluginConfig;

  getPluginName(): string;
  setPluginName(value: string): BufAlphaRegistryV1Alpha1PluginConfig;

  getParametersList(): Array<string>;
  setParametersList(value: Array<string>): BufAlphaRegistryV1Alpha1PluginConfig;
  clearParametersList(): BufAlphaRegistryV1Alpha1PluginConfig;
  addParameters(value: string, index?: number): BufAlphaRegistryV1Alpha1PluginConfig;

  getDeleted(): boolean;
  setDeleted(value: boolean): BufAlphaRegistryV1Alpha1PluginConfig;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BufAlphaRegistryV1Alpha1PluginConfig.AsObject;
  static toObject(includeInstance: boolean, msg: BufAlphaRegistryV1Alpha1PluginConfig): BufAlphaRegistryV1Alpha1PluginConfig.AsObject;
  static serializeBinaryToWriter(message: BufAlphaRegistryV1Alpha1PluginConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BufAlphaRegistryV1Alpha1PluginConfig;
  static deserializeBinaryFromReader(message: BufAlphaRegistryV1Alpha1PluginConfig, reader: jspb.BinaryReader): BufAlphaRegistryV1Alpha1PluginConfig;
}

export namespace BufAlphaRegistryV1Alpha1PluginConfig {
  export type AsObject = {
    pluginOwner: string,
    pluginName: string,
    parametersList: Array<string>,
    deleted: boolean,
  }
}

export class BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary extends jspb.Message {
  getName(): string;
  setName(value: string): BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary;

  getVersion(): string;
  setVersion(value: string): BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.AsObject;
  static toObject(includeInstance: boolean, msg: BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary): BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary.AsObject;
  static serializeBinaryToWriter(message: BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary;
  static deserializeBinaryFromReader(message: BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary, reader: jspb.BinaryReader): BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary;
}

export namespace BufAlphaRegistryV1Alpha1PluginVersionRuntimeLibrary {
  export type AsObject = {
    name: string,
    version: string,
  }
}

export enum BufAlphaRegistryV1Alpha1PluginVisibility { 
  BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_VISIBILITY_UNSPECIFIED = 0,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_VISIBILITY_PUBLIC = 1,
  BUF_ALPHA_REGISTRY_V1_ALPHA1_PLUGIN_VISIBILITY_PRIVATE = 2,
}
