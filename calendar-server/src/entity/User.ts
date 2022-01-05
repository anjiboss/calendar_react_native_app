import {
  Entity,
  ObjectIdColumn,
  ObjectID,
  Column,
  BeforeInsert,
} from "typeorm";
import { v4 } from "uuid";

@Entity()
export class User {
  @BeforeInsert()
  add() {
    this.id = v4();
  }

  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  id: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;
}
