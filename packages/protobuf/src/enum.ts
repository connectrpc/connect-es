/**
 * Reflection information for a protobuf enum.
 */
export interface EnumType {
  /**
   * The fully qualified name of the enum.
   */
  readonly typeName: string;

  readonly values: readonly EnumValueInfo[];

  /**
   * Find an enum value by its (protobuf) name.
   */
  findName(name: string): EnumValueInfo | undefined;

  /**
   * Find an enum value by its number.
   */
  findNumber(no: number): EnumValueInfo | undefined;

  // We do not surface options at this time
  // readonly options: OptionsMap;
}

/**
 * Reflection information for a protobuf enum value.
 */
export interface EnumValueInfo {
  /**
   * The number of the value as specified in proto.
   */
  readonly no: number;

  /**
   * The name of the value as specified in proto.
   */
  readonly name: string;

  // We do not surface options at this time
  // readonly options: OptionsMap;
}
