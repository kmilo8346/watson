import { Entity } from '../base/Entity';

export class User extends Entity {
  username!: string;
  password!: string;
  research_ids!: string[];
}
