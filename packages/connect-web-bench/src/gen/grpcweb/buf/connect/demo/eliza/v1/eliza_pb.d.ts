import * as jspb from 'google-protobuf'



export class SayRequest extends jspb.Message {
  getSentence(): string;
  setSentence(value: string): SayRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SayRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SayRequest): SayRequest.AsObject;
  static serializeBinaryToWriter(message: SayRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SayRequest;
  static deserializeBinaryFromReader(message: SayRequest, reader: jspb.BinaryReader): SayRequest;
}

export namespace SayRequest {
  export type AsObject = {
    sentence: string,
  }
}

export class SayResponse extends jspb.Message {
  getSentence(): string;
  setSentence(value: string): SayResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SayResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SayResponse): SayResponse.AsObject;
  static serializeBinaryToWriter(message: SayResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SayResponse;
  static deserializeBinaryFromReader(message: SayResponse, reader: jspb.BinaryReader): SayResponse;
}

export namespace SayResponse {
  export type AsObject = {
    sentence: string,
  }
}

export class ConverseRequest extends jspb.Message {
  getSentence(): string;
  setSentence(value: string): ConverseRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConverseRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConverseRequest): ConverseRequest.AsObject;
  static serializeBinaryToWriter(message: ConverseRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConverseRequest;
  static deserializeBinaryFromReader(message: ConverseRequest, reader: jspb.BinaryReader): ConverseRequest;
}

export namespace ConverseRequest {
  export type AsObject = {
    sentence: string,
  }
}

export class ConverseResponse extends jspb.Message {
  getSentence(): string;
  setSentence(value: string): ConverseResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConverseResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConverseResponse): ConverseResponse.AsObject;
  static serializeBinaryToWriter(message: ConverseResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConverseResponse;
  static deserializeBinaryFromReader(message: ConverseResponse, reader: jspb.BinaryReader): ConverseResponse;
}

export namespace ConverseResponse {
  export type AsObject = {
    sentence: string,
  }
}

export class IntroduceRequest extends jspb.Message {
  getName(): string;
  setName(value: string): IntroduceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IntroduceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: IntroduceRequest): IntroduceRequest.AsObject;
  static serializeBinaryToWriter(message: IntroduceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IntroduceRequest;
  static deserializeBinaryFromReader(message: IntroduceRequest, reader: jspb.BinaryReader): IntroduceRequest;
}

export namespace IntroduceRequest {
  export type AsObject = {
    name: string,
  }
}

export class IntroduceResponse extends jspb.Message {
  getSentence(): string;
  setSentence(value: string): IntroduceResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IntroduceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: IntroduceResponse): IntroduceResponse.AsObject;
  static serializeBinaryToWriter(message: IntroduceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IntroduceResponse;
  static deserializeBinaryFromReader(message: IntroduceResponse, reader: jspb.BinaryReader): IntroduceResponse;
}

export namespace IntroduceResponse {
  export type AsObject = {
    sentence: string,
  }
}

