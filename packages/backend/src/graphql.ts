/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CreateItemInput {
  name: string;
  description: string;
  price: number;
  image: string;
  largeImage?: string;
}

export class CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export class Item {
  id: string;
  name: string;
  description: string;
  image: string;
  largeImage?: string;
  price: number;
}

export abstract class IMutation {
  abstract createUser(args: CreateUserInput): User | Promise<User>;

  abstract createItem(args: CreateItemInput): Item | Promise<Item>;
}

export abstract class IQuery {
  abstract items(): Item[] | Promise<Item[]>;

  abstract user(id: string): User | Promise<User>;
}

export class User {
  id: string;
  name: string;
  email: string;
}
