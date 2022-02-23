import * as jspb from 'google-protobuf'



export class GetJSONSchemaRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): GetJSONSchemaRequest;

  getRepository(): string;
  setRepository(value: string): GetJSONSchemaRequest;

  getReference(): string;
  setReference(value: string): GetJSONSchemaRequest;

  getTypeName(): string;
  setTypeName(value: string): GetJSONSchemaRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetJSONSchemaRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetJSONSchemaRequest): GetJSONSchemaRequest.AsObject;
  static serializeBinaryToWriter(message: GetJSONSchemaRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetJSONSchemaRequest;
  static deserializeBinaryFromReader(message: GetJSONSchemaRequest, reader: jspb.BinaryReader): GetJSONSchemaRequest;
}

export namespace GetJSONSchemaRequest {
  export type AsObject = {
    owner: string,
    repository: string,
    reference: string,
    typeName: string,
  }
}

export class GetJSONSchemaResponse extends jspb.Message {
  getJsonSchema(): Uint8Array | string;
  getJsonSchema_asU8(): Uint8Array;
  getJsonSchema_asB64(): string;
  setJsonSchema(value: Uint8Array | string): GetJSONSchemaResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetJSONSchemaResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetJSONSchemaResponse): GetJSONSchemaResponse.AsObject;
  static serializeBinaryToWriter(message: GetJSONSchemaResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetJSONSchemaResponse;
  static deserializeBinaryFromReader(message: GetJSONSchemaResponse, reader: jspb.BinaryReader): GetJSONSchemaResponse;
}

export namespace GetJSONSchemaResponse {
  export type AsObject = {
    jsonSchema: Uint8Array | string,
  }
}

