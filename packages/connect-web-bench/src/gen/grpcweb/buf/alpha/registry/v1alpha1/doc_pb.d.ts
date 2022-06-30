import * as jspb from 'google-protobuf'



export class GetSourceDirectoryInfoRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): GetSourceDirectoryInfoRequest;

  getRepository(): string;
  setRepository(value: string): GetSourceDirectoryInfoRequest;

  getReference(): string;
  setReference(value: string): GetSourceDirectoryInfoRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSourceDirectoryInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSourceDirectoryInfoRequest): GetSourceDirectoryInfoRequest.AsObject;
  static serializeBinaryToWriter(message: GetSourceDirectoryInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSourceDirectoryInfoRequest;
  static deserializeBinaryFromReader(message: GetSourceDirectoryInfoRequest, reader: jspb.BinaryReader): GetSourceDirectoryInfoRequest;
}

export namespace GetSourceDirectoryInfoRequest {
  export type AsObject = {
    owner: string,
    repository: string,
    reference: string,
  }
}

export class GetSourceDirectoryInfoResponse extends jspb.Message {
  getRoot(): FileInfo | undefined;
  setRoot(value?: FileInfo): GetSourceDirectoryInfoResponse;
  hasRoot(): boolean;
  clearRoot(): GetSourceDirectoryInfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSourceDirectoryInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSourceDirectoryInfoResponse): GetSourceDirectoryInfoResponse.AsObject;
  static serializeBinaryToWriter(message: GetSourceDirectoryInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSourceDirectoryInfoResponse;
  static deserializeBinaryFromReader(message: GetSourceDirectoryInfoResponse, reader: jspb.BinaryReader): GetSourceDirectoryInfoResponse;
}

export namespace GetSourceDirectoryInfoResponse {
  export type AsObject = {
    root?: FileInfo.AsObject,
  }
}

export class FileInfo extends jspb.Message {
  getPath(): string;
  setPath(value: string): FileInfo;

  getIsDir(): boolean;
  setIsDir(value: boolean): FileInfo;

  getChildrenList(): Array<FileInfo>;
  setChildrenList(value: Array<FileInfo>): FileInfo;
  clearChildrenList(): FileInfo;
  addChildren(value?: FileInfo, index?: number): FileInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileInfo.AsObject;
  static toObject(includeInstance: boolean, msg: FileInfo): FileInfo.AsObject;
  static serializeBinaryToWriter(message: FileInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileInfo;
  static deserializeBinaryFromReader(message: FileInfo, reader: jspb.BinaryReader): FileInfo;
}

export namespace FileInfo {
  export type AsObject = {
    path: string,
    isDir: boolean,
    childrenList: Array<FileInfo.AsObject>,
  }
}

export class GetSourceFileRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): GetSourceFileRequest;

  getRepository(): string;
  setRepository(value: string): GetSourceFileRequest;

  getReference(): string;
  setReference(value: string): GetSourceFileRequest;

  getPath(): string;
  setPath(value: string): GetSourceFileRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSourceFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSourceFileRequest): GetSourceFileRequest.AsObject;
  static serializeBinaryToWriter(message: GetSourceFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSourceFileRequest;
  static deserializeBinaryFromReader(message: GetSourceFileRequest, reader: jspb.BinaryReader): GetSourceFileRequest;
}

export namespace GetSourceFileRequest {
  export type AsObject = {
    owner: string,
    repository: string,
    reference: string,
    path: string,
  }
}

export class GetSourceFileResponse extends jspb.Message {
  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): GetSourceFileResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSourceFileResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSourceFileResponse): GetSourceFileResponse.AsObject;
  static serializeBinaryToWriter(message: GetSourceFileResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSourceFileResponse;
  static deserializeBinaryFromReader(message: GetSourceFileResponse, reader: jspb.BinaryReader): GetSourceFileResponse;
}

export namespace GetSourceFileResponse {
  export type AsObject = {
    content: Uint8Array | string,
  }
}

export class GetModulePackagesRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): GetModulePackagesRequest;

  getRepository(): string;
  setRepository(value: string): GetModulePackagesRequest;

  getReference(): string;
  setReference(value: string): GetModulePackagesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetModulePackagesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetModulePackagesRequest): GetModulePackagesRequest.AsObject;
  static serializeBinaryToWriter(message: GetModulePackagesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetModulePackagesRequest;
  static deserializeBinaryFromReader(message: GetModulePackagesRequest, reader: jspb.BinaryReader): GetModulePackagesRequest;
}

export namespace GetModulePackagesRequest {
  export type AsObject = {
    owner: string,
    repository: string,
    reference: string,
  }
}

export class GetModulePackagesResponse extends jspb.Message {
  getName(): string;
  setName(value: string): GetModulePackagesResponse;

  getModulePackagesList(): Array<ModulePackage>;
  setModulePackagesList(value: Array<ModulePackage>): GetModulePackagesResponse;
  clearModulePackagesList(): GetModulePackagesResponse;
  addModulePackages(value?: ModulePackage, index?: number): ModulePackage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetModulePackagesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetModulePackagesResponse): GetModulePackagesResponse.AsObject;
  static serializeBinaryToWriter(message: GetModulePackagesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetModulePackagesResponse;
  static deserializeBinaryFromReader(message: GetModulePackagesResponse, reader: jspb.BinaryReader): GetModulePackagesResponse;
}

export namespace GetModulePackagesResponse {
  export type AsObject = {
    name: string,
    modulePackagesList: Array<ModulePackage.AsObject>,
  }
}

export class ModulePackage extends jspb.Message {
  getName(): string;
  setName(value: string): ModulePackage;

  getDescription(): string;
  setDescription(value: string): ModulePackage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModulePackage.AsObject;
  static toObject(includeInstance: boolean, msg: ModulePackage): ModulePackage.AsObject;
  static serializeBinaryToWriter(message: ModulePackage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModulePackage;
  static deserializeBinaryFromReader(message: ModulePackage, reader: jspb.BinaryReader): ModulePackage;
}

export namespace ModulePackage {
  export type AsObject = {
    name: string,
    description: string,
  }
}

export class GetModuleDocumentationRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): GetModuleDocumentationRequest;

  getRepository(): string;
  setRepository(value: string): GetModuleDocumentationRequest;

  getReference(): string;
  setReference(value: string): GetModuleDocumentationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetModuleDocumentationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetModuleDocumentationRequest): GetModuleDocumentationRequest.AsObject;
  static serializeBinaryToWriter(message: GetModuleDocumentationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetModuleDocumentationRequest;
  static deserializeBinaryFromReader(message: GetModuleDocumentationRequest, reader: jspb.BinaryReader): GetModuleDocumentationRequest;
}

export namespace GetModuleDocumentationRequest {
  export type AsObject = {
    owner: string,
    repository: string,
    reference: string,
  }
}

export class GetModuleDocumentationResponse extends jspb.Message {
  getModuleDocumentation(): ModuleDocumentation | undefined;
  setModuleDocumentation(value?: ModuleDocumentation): GetModuleDocumentationResponse;
  hasModuleDocumentation(): boolean;
  clearModuleDocumentation(): GetModuleDocumentationResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetModuleDocumentationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetModuleDocumentationResponse): GetModuleDocumentationResponse.AsObject;
  static serializeBinaryToWriter(message: GetModuleDocumentationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetModuleDocumentationResponse;
  static deserializeBinaryFromReader(message: GetModuleDocumentationResponse, reader: jspb.BinaryReader): GetModuleDocumentationResponse;
}

export namespace GetModuleDocumentationResponse {
  export type AsObject = {
    moduleDocumentation?: ModuleDocumentation.AsObject,
  }
}

export class ModuleDocumentation extends jspb.Message {
  getName(): string;
  setName(value: string): ModuleDocumentation;

  getDocumentation(): string;
  setDocumentation(value: string): ModuleDocumentation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ModuleDocumentation.AsObject;
  static toObject(includeInstance: boolean, msg: ModuleDocumentation): ModuleDocumentation.AsObject;
  static serializeBinaryToWriter(message: ModuleDocumentation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ModuleDocumentation;
  static deserializeBinaryFromReader(message: ModuleDocumentation, reader: jspb.BinaryReader): ModuleDocumentation;
}

export namespace ModuleDocumentation {
  export type AsObject = {
    name: string,
    documentation: string,
  }
}

export class GetPackageDocumentationRequest extends jspb.Message {
  getOwner(): string;
  setOwner(value: string): GetPackageDocumentationRequest;

  getRepository(): string;
  setRepository(value: string): GetPackageDocumentationRequest;

  getReference(): string;
  setReference(value: string): GetPackageDocumentationRequest;

  getPackageName(): string;
  setPackageName(value: string): GetPackageDocumentationRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPackageDocumentationRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetPackageDocumentationRequest): GetPackageDocumentationRequest.AsObject;
  static serializeBinaryToWriter(message: GetPackageDocumentationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPackageDocumentationRequest;
  static deserializeBinaryFromReader(message: GetPackageDocumentationRequest, reader: jspb.BinaryReader): GetPackageDocumentationRequest;
}

export namespace GetPackageDocumentationRequest {
  export type AsObject = {
    owner: string,
    repository: string,
    reference: string,
    packageName: string,
  }
}

export class GetPackageDocumentationResponse extends jspb.Message {
  getPackageDocumentation(): PackageDocumentation | undefined;
  setPackageDocumentation(value?: PackageDocumentation): GetPackageDocumentationResponse;
  hasPackageDocumentation(): boolean;
  clearPackageDocumentation(): GetPackageDocumentationResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPackageDocumentationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetPackageDocumentationResponse): GetPackageDocumentationResponse.AsObject;
  static serializeBinaryToWriter(message: GetPackageDocumentationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPackageDocumentationResponse;
  static deserializeBinaryFromReader(message: GetPackageDocumentationResponse, reader: jspb.BinaryReader): GetPackageDocumentationResponse;
}

export namespace GetPackageDocumentationResponse {
  export type AsObject = {
    packageDocumentation?: PackageDocumentation.AsObject,
  }
}

export class PackageDocumentation extends jspb.Message {
  getName(): string;
  setName(value: string): PackageDocumentation;

  getDescription(): string;
  setDescription(value: string): PackageDocumentation;

  getServicesList(): Array<Service>;
  setServicesList(value: Array<Service>): PackageDocumentation;
  clearServicesList(): PackageDocumentation;
  addServices(value?: Service, index?: number): Service;

  getEnumsList(): Array<Enum>;
  setEnumsList(value: Array<Enum>): PackageDocumentation;
  clearEnumsList(): PackageDocumentation;
  addEnums(value?: Enum, index?: number): Enum;

  getMessagesList(): Array<Message>;
  setMessagesList(value: Array<Message>): PackageDocumentation;
  clearMessagesList(): PackageDocumentation;
  addMessages(value?: Message, index?: number): Message;

  getFileExtensionsList(): Array<FileExtension>;
  setFileExtensionsList(value: Array<FileExtension>): PackageDocumentation;
  clearFileExtensionsList(): PackageDocumentation;
  addFileExtensions(value?: FileExtension, index?: number): FileExtension;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PackageDocumentation.AsObject;
  static toObject(includeInstance: boolean, msg: PackageDocumentation): PackageDocumentation.AsObject;
  static serializeBinaryToWriter(message: PackageDocumentation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PackageDocumentation;
  static deserializeBinaryFromReader(message: PackageDocumentation, reader: jspb.BinaryReader): PackageDocumentation;
}

export namespace PackageDocumentation {
  export type AsObject = {
    name: string,
    description: string,
    servicesList: Array<Service.AsObject>,
    enumsList: Array<Enum.AsObject>,
    messagesList: Array<Message.AsObject>,
    fileExtensionsList: Array<FileExtension.AsObject>,
  }
}

export class Location extends jspb.Message {
  getStartLine(): number;
  setStartLine(value: number): Location;

  getStartColumn(): number;
  setStartColumn(value: number): Location;

  getEndLine(): number;
  setEndLine(value: number): Location;

  getEndColumn(): number;
  setEndColumn(value: number): Location;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Location.AsObject;
  static toObject(includeInstance: boolean, msg: Location): Location.AsObject;
  static serializeBinaryToWriter(message: Location, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Location;
  static deserializeBinaryFromReader(message: Location, reader: jspb.BinaryReader): Location;
}

export namespace Location {
  export type AsObject = {
    startLine: number,
    startColumn: number,
    endLine: number,
    endColumn: number,
  }
}

export class Service extends jspb.Message {
  getName(): string;
  setName(value: string): Service;

  getNestedName(): string;
  setNestedName(value: string): Service;

  getFullName(): string;
  setFullName(value: string): Service;

  getDescription(): string;
  setDescription(value: string): Service;

  getFilePath(): string;
  setFilePath(value: string): Service;

  getLocation(): Location | undefined;
  setLocation(value?: Location): Service;
  hasLocation(): boolean;
  clearLocation(): Service;

  getMethodsList(): Array<Method>;
  setMethodsList(value: Array<Method>): Service;
  clearMethodsList(): Service;
  addMethods(value?: Method, index?: number): Method;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Service.AsObject;
  static toObject(includeInstance: boolean, msg: Service): Service.AsObject;
  static serializeBinaryToWriter(message: Service, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Service;
  static deserializeBinaryFromReader(message: Service, reader: jspb.BinaryReader): Service;
}

export namespace Service {
  export type AsObject = {
    name: string,
    nestedName: string,
    fullName: string,
    description: string,
    filePath: string,
    location?: Location.AsObject,
    methodsList: Array<Method.AsObject>,
  }
}

export class Method extends jspb.Message {
  getName(): string;
  setName(value: string): Method;

  getDescription(): string;
  setDescription(value: string): Method;

  getRequest(): MethodRequestResponse | undefined;
  setRequest(value?: MethodRequestResponse): Method;
  hasRequest(): boolean;
  clearRequest(): Method;

  getResponse(): MethodRequestResponse | undefined;
  setResponse(value?: MethodRequestResponse): Method;
  hasResponse(): boolean;
  clearResponse(): Method;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Method.AsObject;
  static toObject(includeInstance: boolean, msg: Method): Method.AsObject;
  static serializeBinaryToWriter(message: Method, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Method;
  static deserializeBinaryFromReader(message: Method, reader: jspb.BinaryReader): Method;
}

export namespace Method {
  export type AsObject = {
    name: string,
    description: string,
    request?: MethodRequestResponse.AsObject,
    response?: MethodRequestResponse.AsObject,
  }
}

export class MethodRequestResponse extends jspb.Message {
  getNestedType(): string;
  setNestedType(value: string): MethodRequestResponse;

  getFullType(): string;
  setFullType(value: string): MethodRequestResponse;

  getStreaming(): boolean;
  setStreaming(value: boolean): MethodRequestResponse;

  getMessage(): Message | undefined;
  setMessage(value?: Message): MethodRequestResponse;
  hasMessage(): boolean;
  clearMessage(): MethodRequestResponse;

  getImportModuleRef(): ImportModuleRef | undefined;
  setImportModuleRef(value?: ImportModuleRef): MethodRequestResponse;
  hasImportModuleRef(): boolean;
  clearImportModuleRef(): MethodRequestResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MethodRequestResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MethodRequestResponse): MethodRequestResponse.AsObject;
  static serializeBinaryToWriter(message: MethodRequestResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MethodRequestResponse;
  static deserializeBinaryFromReader(message: MethodRequestResponse, reader: jspb.BinaryReader): MethodRequestResponse;
}

export namespace MethodRequestResponse {
  export type AsObject = {
    nestedType: string,
    fullType: string,
    streaming: boolean,
    message?: Message.AsObject,
    importModuleRef?: ImportModuleRef.AsObject,
  }
}

export class Enum extends jspb.Message {
  getName(): string;
  setName(value: string): Enum;

  getNestedName(): string;
  setNestedName(value: string): Enum;

  getFullName(): string;
  setFullName(value: string): Enum;

  getDescription(): string;
  setDescription(value: string): Enum;

  getFilePath(): string;
  setFilePath(value: string): Enum;

  getLocation(): Location | undefined;
  setLocation(value?: Location): Enum;
  hasLocation(): boolean;
  clearLocation(): Enum;

  getValuesList(): Array<EnumValue>;
  setValuesList(value: Array<EnumValue>): Enum;
  clearValuesList(): Enum;
  addValues(value?: EnumValue, index?: number): EnumValue;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Enum.AsObject;
  static toObject(includeInstance: boolean, msg: Enum): Enum.AsObject;
  static serializeBinaryToWriter(message: Enum, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Enum;
  static deserializeBinaryFromReader(message: Enum, reader: jspb.BinaryReader): Enum;
}

export namespace Enum {
  export type AsObject = {
    name: string,
    nestedName: string,
    fullName: string,
    description: string,
    filePath: string,
    location?: Location.AsObject,
    valuesList: Array<EnumValue.AsObject>,
  }
}

export class EnumValue extends jspb.Message {
  getName(): string;
  setName(value: string): EnumValue;

  getNumber(): number;
  setNumber(value: number): EnumValue;

  getDescription(): string;
  setDescription(value: string): EnumValue;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EnumValue.AsObject;
  static toObject(includeInstance: boolean, msg: EnumValue): EnumValue.AsObject;
  static serializeBinaryToWriter(message: EnumValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EnumValue;
  static deserializeBinaryFromReader(message: EnumValue, reader: jspb.BinaryReader): EnumValue;
}

export namespace EnumValue {
  export type AsObject = {
    name: string,
    number: number,
    description: string,
  }
}

export class ImportModuleRef extends jspb.Message {
  getRemote(): string;
  setRemote(value: string): ImportModuleRef;

  getOwner(): string;
  setOwner(value: string): ImportModuleRef;

  getRepository(): string;
  setRepository(value: string): ImportModuleRef;

  getCommit(): string;
  setCommit(value: string): ImportModuleRef;

  getPackageName(): string;
  setPackageName(value: string): ImportModuleRef;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ImportModuleRef.AsObject;
  static toObject(includeInstance: boolean, msg: ImportModuleRef): ImportModuleRef.AsObject;
  static serializeBinaryToWriter(message: ImportModuleRef, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ImportModuleRef;
  static deserializeBinaryFromReader(message: ImportModuleRef, reader: jspb.BinaryReader): ImportModuleRef;
}

export namespace ImportModuleRef {
  export type AsObject = {
    remote: string,
    owner: string,
    repository: string,
    commit: string,
    packageName: string,
  }
}

export class Message extends jspb.Message {
  getName(): string;
  setName(value: string): Message;

  getNestedName(): string;
  setNestedName(value: string): Message;

  getFullName(): string;
  setFullName(value: string): Message;

  getDescription(): string;
  setDescription(value: string): Message;

  getFilePath(): string;
  setFilePath(value: string): Message;

  getIsMapEntry(): boolean;
  setIsMapEntry(value: boolean): Message;

  getFieldsList(): Array<MessageField>;
  setFieldsList(value: Array<MessageField>): Message;
  clearFieldsList(): Message;
  addFields(value?: MessageField, index?: number): MessageField;

  getLocation(): Location | undefined;
  setLocation(value?: Location): Message;
  hasLocation(): boolean;
  clearLocation(): Message;

  getMessageExtensionsList(): Array<Field>;
  setMessageExtensionsList(value: Array<Field>): Message;
  clearMessageExtensionsList(): Message;
  addMessageExtensions(value?: Field, index?: number): Field;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    name: string,
    nestedName: string,
    fullName: string,
    description: string,
    filePath: string,
    isMapEntry: boolean,
    fieldsList: Array<MessageField.AsObject>,
    location?: Location.AsObject,
    messageExtensionsList: Array<Field.AsObject>,
  }
}

export class MessageField extends jspb.Message {
  getField(): Field | undefined;
  setField(value?: Field): MessageField;
  hasField(): boolean;
  clearField(): MessageField;

  getOneof(): Oneof | undefined;
  setOneof(value?: Oneof): MessageField;
  hasOneof(): boolean;
  clearOneof(): MessageField;

  getMessageFieldCase(): MessageField.MessageFieldCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageField.AsObject;
  static toObject(includeInstance: boolean, msg: MessageField): MessageField.AsObject;
  static serializeBinaryToWriter(message: MessageField, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageField;
  static deserializeBinaryFromReader(message: MessageField, reader: jspb.BinaryReader): MessageField;
}

export namespace MessageField {
  export type AsObject = {
    field?: Field.AsObject,
    oneof?: Oneof.AsObject,
  }

  export enum MessageFieldCase { 
    MESSAGE_FIELD_NOT_SET = 0,
    FIELD = 1,
    ONEOF = 2,
  }
}

export class Oneof extends jspb.Message {
  getName(): string;
  setName(value: string): Oneof;

  getFieldsList(): Array<Field>;
  setFieldsList(value: Array<Field>): Oneof;
  clearFieldsList(): Oneof;
  addFields(value?: Field, index?: number): Field;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Oneof.AsObject;
  static toObject(includeInstance: boolean, msg: Oneof): Oneof.AsObject;
  static serializeBinaryToWriter(message: Oneof, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Oneof;
  static deserializeBinaryFromReader(message: Oneof, reader: jspb.BinaryReader): Oneof;
}

export namespace Oneof {
  export type AsObject = {
    name: string,
    fieldsList: Array<Field.AsObject>,
  }
}

export class Field extends jspb.Message {
  getName(): string;
  setName(value: string): Field;

  getDescription(): string;
  setDescription(value: string): Field;

  getLabel(): string;
  setLabel(value: string): Field;

  getNestedType(): string;
  setNestedType(value: string): Field;

  getFullType(): string;
  setFullType(value: string): Field;

  getTag(): number;
  setTag(value: number): Field;

  getMapEntry(): MapEntry | undefined;
  setMapEntry(value?: MapEntry): Field;
  hasMapEntry(): boolean;
  clearMapEntry(): Field;

  getImportModuleRef(): ImportModuleRef | undefined;
  setImportModuleRef(value?: ImportModuleRef): Field;
  hasImportModuleRef(): boolean;
  clearImportModuleRef(): Field;

  getExtendee(): string;
  setExtendee(value: string): Field;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Field.AsObject;
  static toObject(includeInstance: boolean, msg: Field): Field.AsObject;
  static serializeBinaryToWriter(message: Field, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Field;
  static deserializeBinaryFromReader(message: Field, reader: jspb.BinaryReader): Field;
}

export namespace Field {
  export type AsObject = {
    name: string,
    description: string,
    label: string,
    nestedType: string,
    fullType: string,
    tag: number,
    mapEntry?: MapEntry.AsObject,
    importModuleRef?: ImportModuleRef.AsObject,
    extendee: string,
  }
}

export class MapEntry extends jspb.Message {
  getKeyFullType(): string;
  setKeyFullType(value: string): MapEntry;

  getValueNestedType(): string;
  setValueNestedType(value: string): MapEntry;

  getValueFullType(): string;
  setValueFullType(value: string): MapEntry;

  getValueImportModuleRef(): ImportModuleRef | undefined;
  setValueImportModuleRef(value?: ImportModuleRef): MapEntry;
  hasValueImportModuleRef(): boolean;
  clearValueImportModuleRef(): MapEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MapEntry.AsObject;
  static toObject(includeInstance: boolean, msg: MapEntry): MapEntry.AsObject;
  static serializeBinaryToWriter(message: MapEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MapEntry;
  static deserializeBinaryFromReader(message: MapEntry, reader: jspb.BinaryReader): MapEntry;
}

export namespace MapEntry {
  export type AsObject = {
    keyFullType: string,
    valueNestedType: string,
    valueFullType: string,
    valueImportModuleRef?: ImportModuleRef.AsObject,
  }
}

export class FileExtension extends jspb.Message {
  getExtensionType(): string;
  setExtensionType(value: string): FileExtension;

  getDescription(): string;
  setDescription(value: string): FileExtension;

  getFilePath(): string;
  setFilePath(value: string): FileExtension;

  getLocation(): Location | undefined;
  setLocation(value?: Location): FileExtension;
  hasLocation(): boolean;
  clearLocation(): FileExtension;

  getFieldsList(): Array<Field>;
  setFieldsList(value: Array<Field>): FileExtension;
  clearFieldsList(): FileExtension;
  addFields(value?: Field, index?: number): Field;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileExtension.AsObject;
  static toObject(includeInstance: boolean, msg: FileExtension): FileExtension.AsObject;
  static serializeBinaryToWriter(message: FileExtension, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileExtension;
  static deserializeBinaryFromReader(message: FileExtension, reader: jspb.BinaryReader): FileExtension;
}

export namespace FileExtension {
  export type AsObject = {
    extensionType: string,
    description: string,
    filePath: string,
    location?: Location.AsObject,
    fieldsList: Array<Field.AsObject>,
  }
}

