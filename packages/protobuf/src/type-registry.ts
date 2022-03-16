// Copyright 2021-2022 Buf Technologies, Inc.
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

import type { MessageType } from "./message-type.js";
import type { EnumType } from "./enum.js";
import type { ServiceType } from "./service-type.js";

/**
 * IMessageTypeRegistry provides look-up for message types.
 */
export interface IMessageTypeRegistry {
  findMessage(typeName: string): MessageType | undefined;
}

/**
 * IEnumTypeRegistry provides look-up for enum types.
 */
export interface IEnumTypeRegistry {
  findEnum(typeName: string): EnumType | undefined;
}

/**
 * IServiceTypeRegistry provides look-up for service types.
 */
export interface IServiceTypeRegistry {
  findService(typeName: string): ServiceType | undefined;
}

/**
 * TypeRegistry is a basic type registry
 */
export class TypeRegistry
  implements IMessageTypeRegistry, IEnumTypeRegistry, IServiceTypeRegistry
{
  private readonly messages: Record<string, MessageType> = {};
  private readonly enums: Record<string, EnumType> = {};
  private readonly services: Record<string, ServiceType> = {};

  findMessage(typeName: string): MessageType | undefined {
    return this.messages[typeName];
  }

  findEnum(typeName: string): EnumType | undefined {
    return this.enums[typeName];
  }

  findService(typeName: string): ServiceType | undefined {
    return this.services[typeName];
  }

  private add(type: MessageType | EnumType | ServiceType): void {
    if ("fields" in type) {
      this.messages[type.typeName] = type;
    } else if ("methods" in type) {
      this.services[type.typeName] = type;
    } else {
      this.enums[type.typeName] = type;
    }
  }

  static fromIterable(types: Iterable<MessageType>): TypeRegistry {
    const r = new TypeRegistry();
    for (const t of types) {
      r.add(t);
    }
    return r;
  }

  static fromTypes(...types: MessageType[]): TypeRegistry {
    return TypeRegistry.fromIterable(types);
  }
}
